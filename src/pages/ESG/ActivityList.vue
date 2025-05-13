<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search } from "lucide-vue-next";
import { useActivityStore } from '../../stores/useActivityStore';
import { useStompStore } from '../../stores/useStompStore';
import { useMemberStore } from '../../stores/useMemberStore';
import { useRouter } from 'vue-router'

const activityStore = useActivityStore()
const stomp = useStompStore();
const memberStore = useMemberStore();
const router = useRouter()

const search = ref('')
const currentPage = ref(1)
const totalPages = ref(0);
const userRole = ref(true);

// Subject metadata and form data
const subjects = ref([]);
const selectedSubject = ref(null);
const formData = ref({
  subject: '',
  activityDate: new Date().toISOString().split('T')[0],
  description: '',
  inputs: {}
});

// File handling
const previewImage = ref(null);
const file = ref(null);
const fileInput = ref(null);
const formRef = ref(null);

// **여기에 추가**: 5개씩 묶어서 보여줄 페이지 번호 범위 계산
const pageRange = computed(() => {
  const total = totalPages.value;
  const page = currentPage.value;
  const groupSize = 5;
  const groupIndex = Math.floor((page - 1) / groupSize);
  const start = groupIndex * groupSize + 1;
  const end = Math.min(start + groupSize - 1, total);
  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const goToPage = async (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    router.push({ path: '/activityList', query: { page } });
    totalPages.value = await activityStore.list(page - 1);
  }
};

const newActivity = ref({ topic: '', file: null })

// 리스트 관련
onMounted(async () => {
  totalPages.value = await activityStore.list((currentPage.value - 1));
  userRole.value = await memberStore.isAdmin();
  subjects.value = await activityStore.subjectListSearch();
  console.log(subjects)
});

const handleSubjectChange = (subject) => {
  selectedSubject.value = subject;
  formData.value.subject = subject.subject;
  formData.value.inputs = {};
};

const handleFileUpload = (event, fieldName) => {
  file.value = event.target.files[0];
  if (file.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file.value);
    formData.value.inputs[fieldName] = file.value;
  }
};

const previewImageClose = () => {
  previewImage.value = null;
  file.value = null;
  if (fileInput.value) {
    fileInput.value.value = null;
  }
};

const submit = async () => {
  if (!formData.value.subject) {
    alert("주제를 선택하여 주십시오.");
    return;
  }

  if (!formData.value.description) {
    alert("내용을 입력하여 주십시오.");
    return;
  }

  // Validate required inputs
  const selectedSubjectMeta = subjects.value.find(s => s.subject === formData.value.subject);
  if (selectedSubjectMeta) {
    for (const input of selectedSubjectMeta.inputs) {
      if (!formData.value.inputs[input.text]) {
        alert(`${input.text}을(를) 입력하여 주십시오.`);
        return;
      }
    }
  }

  try {
    // Create FormData instance
    const submitFormData = new FormData();

    // Create DTO object without file data
    const dto = {
      subjectId: selectedSubjectMeta.id,
      subject: formData.value.subject,
      activityDate: formData.value.activityDate,
      description: formData.value.description,
      inputs: {}
    };

    // Add non-file inputs to DTO
    for (const input of selectedSubjectMeta.inputs) {
      if (input.type !== 'file') {
        dto.inputs[input.text] = formData.value.inputs[input.text];
      }
    }

    // Add DTO to FormData
    submitFormData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

    // Add file inputs to FormData separately
    for (const input of selectedSubjectMeta.inputs) {
      if (input.type === 'file' && formData.value.inputs[input.text]) {
        submitFormData.append(input.text, formData.value.inputs[input.text]);
      }
    }

    const response = await activityStore.activitySubmit(submitFormData);

    stomp.activityApproveReq(
      "활동 승인 요청", 
      `[${response.title}] 승인 요청이 왔습니다.`, 
      memberStore.myCompanyIdx, 
      response.idx
    );
    window.location.reload();
  } catch (error) {
    console.log(error);
    alert("활동 추가 실패 \n 관리자에게 문의 하시오.");
  }
};

const activityDelete = async (activicyIdx) => {
  const isSuccess = await activityStore.delete(activicyIdx);
  if (isSuccess === true) {
    window.location.reload();
  } else {
    alert("삭제 실패");
  }
};

const loadActivities = async (e) => {
  // search API가 totalPages를 반환한다고 가정
  totalPages.value = await activityStore.search(e, currentPage.value - 1);
};

const onSearchInput = (e) => {
  loadActivities(e.target.value)
}

// const userRole = ref(JSON.parse(localStorage.getItem('userInfo'))?.role || 'executive')
// manager executive staff `'${{변수명}}'` v-if="userRole === 'manager'"
</script>
<template>
  <div class="min-h-screen bg-gray-50 p-10">
    <!-- 제목 -->
    <h1 class="text-2xl font-bold text-slate-800 mb-6 text-center">활동 인증 관리</h1>

    <!-- 🔍 검색 -->
    <div class="max-w-2xl mx-auto bg-white p-4 rounded-md shadow-md flex items-center gap-3 mb-8">
      <Search color="black" :size="30" />

      <!-- v-model로 search에 바인딩 -->
      <input v-model="search" type="text" placeholder="주제를 입력하세요"  @input="onSearchInput"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" />

      <button @click.prevent="currentPage = 1"
        class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition">
        검색
      </button>
    </div>

    <!-- 📋 리스트 -->
    <div class="bg-white rounded-md shadow overflow-x-auto max-w-6xl mx-auto">
      <table class="min-w-full text-sm text-center text-slate-700">
        <thead class="bg-slate-100 border-b">
          <tr>
            <th class="py-3">상태</th>
            <th>주제</th>
            <th>유저</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>

          <tr v-for="activity in activityStore.activityList" :key="activity.activityIdx"
            @click="$router.push(`/activeDetails/${activity.activityIdx}`)"
            class="border-b hover:bg-slate-50 transition cursor-pointer">
            <td class="py-2">
              <span class="text-white text-xs px-3 py-1 rounded-md inline-block" :class="{
                'bg-yellow-500': activity.status === '대기 중',
                'bg-green-500': activity.status === '승인',
                'bg-red-500': activity.status === '승인 반려'
              }">
                {{ activity.status }}
              </span>
            </td>

            <td>{{ activity.title }}</td>

            <td>{{ activity.memberName }} ({{ activity.memberId }})</td>

            <td v-if="memberStore.myIdx === activity.memberIdx">
              <button class="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition"
                @click.stop="activityDelete(activity.activityIdx)">
                삭제
              </button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>

    <!-- 📌 페이지네이션 -->
    <div class="mt-6 flex justify-center space-x-2 text-sm text-slate-600">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
        class="px-3 py-1 rounded border disabled:opacity-40 hover:bg-slate-100">
        ← 이전
      </button>

      <!--  전체 totalPages가 아니라 pageRange만 렌더링 -->
      <button v-for="page in pageRange" :key="page" @click="goToPage(page)" :class="[
        'px-4 py-1 rounded-md border',
        page === currentPage
          ? 'bg-slate-800 text-white font-bold'
          : 'hover:bg-slate-100'
      ]">
        {{ page }}
      </button>

      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
        class="px-3 py-1 rounded border disabled:opacity-40 hover:bg-slate-100">
        다음 →
      </button>
    </div>

    <!-- ➕ 활동 추가 -->
    <form @submit.prevent="submit" ref="formRef"
      class="mt-10 bg-white p-6 rounded-md shadow max-w-4xl mx-auto" v-if="!userRole">
      <h2 class="text-lg font-semibold text-slate-800 mb-4">활동 추가</h2>

      <div class="flex flex-col md:flex-row gap-4 mb-2">
        <input placeholder="활동 제목" name="title"
          class="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-slate-500" />
        <!-- 주제 선택 -->
        <select v-model="formData.subject" @change="handleSubjectChange(subjects.find(s => s.subject === formData.subject))"
          class="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-slate-500">
          <option disabled value="">주제 선택</option>
          <option v-for="subject in subjects" :key="subject._id" :value="subject.subject">
            {{ subject.subject }}
          </option>
        </select>
      </div>

        <!-- 활동 날짜 -->
        <input type="date" v-model="formData.activityDate"
          class="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-slate-500" />

        <!-- 동적 입력 필드 -->
        <template v-if="selectedSubject">
          <div v-for="input in selectedSubject.inputs" :key="input.text" class="flex flex-col gap-2">
            <label class="text-sm font-medium text-gray-700">{{ input.text }}</label>
            
            <!-- 파일 입력 -->
            <template v-if="input.type === 'file'">
              
              <input type="file" name="files" :ref="el => { if (input.type === 'file') fileInput = el }"
                @change="(e) => handleFileUpload(e, input.text)"
                class="border border-gray-300 rounded-md px-4 py-2" />
            </template>

            <!-- 숫자 입력 -->
            <input v-else-if="input.type === 'number'" type="number"
              v-model="formData.inputs[input.text]"
              class="border border-gray-300 rounded-md px-4 py-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />

            <!-- 텍스트 입력 -->
            <input v-else type="text"
              v-model="formData.inputs[input.text]"
              class="border border-gray-300 rounded-md px-4 py-2" />
          </div>
        </template>

        <!-- 설명 입력 -->
        <div class="my-2">
          <textarea v-model="formData.description"
            class="w-full h-[150px] flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-slate-500"
            placeholder="활동 내용"></textarea>
        </div>

      <button type="submit"
        class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition ml-auto w-[123px]">
        승인 요청
      </button>
    </form>

  </div>
</template>
