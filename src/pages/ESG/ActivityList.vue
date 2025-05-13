<script setup>
import { ref, computed, onMounted } from "vue";
import { Search } from "lucide-vue-next";
import { useActivityStore } from "../../stores/useActivityStore";
import { useStompStore } from "../../stores/useStompStore";
import { useMemberStore } from "../../stores/useMemberStore";
import { useRouter } from "vue-router";

const activityStore = useActivityStore();
const stomp = useStompStore();
const memberStore = useMemberStore();
const router = useRouter();

const search = ref("");
const currentPage = ref(1);
const totalPages = ref(0);
const pageSize = ref(5);
const userRole = ref(true);
const activityList = ref([]);


// Subject metadata and form data
const subjects = ref([]);
const selectedSubject = ref(null);
const formData = ref({
  subject: "",
  esgScore: null,
  esgValue: "",
  activityDate: new Date().toISOString().split("T")[0],
  inputs: {},
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
    router.push({ path: "/activityList", query: { page } });
    totalPages.value = await activityStore.list(page - 1);
  }
};

const newActivity = ref({ topic: "", file: null });

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
  // Validate required inputs
  const selectedSubjectMeta = subjects.value.find(
    (s) => s.subject === formData.value.subject
  );
  if (selectedSubjectMeta) {
    for (const input of selectedSubjectMeta.inputs) {
      if (!formData.value.inputs[input.inputValue]) {
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
      esgValue: formData.value.esgValue,
      esgScore: formData.value.esgScore,
      subjectId: selectedSubjectMeta.id,
      subject: formData.value.subject,
      activityDate: formData.value.activityDate,

      inputs: {},
    };

    // Add non-file inputs to DTO
    for (const input of selectedSubjectMeta.inputs) {
      if (input.type !== "file") {
        dto.inputs[input.inputValue] = formData.value.inputs[input.inputValue];
      }
    }

    // Add DTO to FormData
    submitFormData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );

    // Add file inputs to FormData separately
    for (const input of selectedSubjectMeta.inputs) {
      if (input.type === "file" && formData.value.inputs[input.inputValue]) {
        submitFormData.append(input.inputValue, formData.value.inputs[input.inputValue]);
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
  loadActivities(e.target.value);
};

// 리스트 관련
onMounted(async () => {
  totalPages.value = await activityStore.list(currentPage.value - 1);

  userRole.value = await memberStore.isAdmin();
  const rawSubjects = await activityStore.subjectListSearch();
  const memberIdx = await memberStore.userInfo.idx;
  activityList.value = await activityStore.activityListsearch(memberIdx);
  console.log("vue list", activityList.value);

  // E, S, G 순서로 정렬
  const order = { E: 0, S: 1, G: 2 };
  subjects.value = [...rawSubjects].sort(
    (a, b) => order[a.esgValue] - order[b.esgValue]
  );
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-10">
    <!-- 제목 -->
    <h1 class="text-2xl font-bold text-slate-800 mb-6 text-center">
      활동 인증 관리
    </h1>

    <!-- 🔍 검색 -->
    <div
      class="max-w-2xl mx-auto bg-white p-4 rounded-md shadow-md flex items-center gap-3 mb-8"
    >
      <Search color="black" :size="30" />

      <!-- v-model로 search에 바인딩 -->
      <input
        v-model="search"
        type="text"
        placeholder="주제를 입력하세요"
        @input="onSearchInput"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
      />

      <button
        @click.prevent="currentPage = 1"
        class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition"
      >
        검색
      </button>
    </div>

    <!-- 📋 리스트 -->
    <div class="bg-white rounded-md shadow overflow-x-auto max-w-6xl mx-auto">
      <table class="min-w-full text-sm text-center text-slate-700">
        <thead class="bg-slate-100 border-b">
          <tr>
            <th class="py-3 border">순서</th>
            <th class="py-3 border">상태</th>
            <th class="p-3 border">주제</th>
            <th class="p-3 border">유저</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(activity, index) in activityList"
            :key="activity.activityIdx"
            @click="$router.push(`/activeDetails/${activity.activityIdx}`)"
            class="border-b hover:bg-slate-50 transition cursor-pointer"
          >
            <td class="py-3 border">
              {{
                ((currentPage?.value ?? 1) - 1) * (pageSize?.value ?? 5) +
                index +
                1
              }}
            </td>

            <td class="py-2">
              <span
                class="text-white text-xs px-3 py-1 rounded-md inline-block"
                :class="activity.status ? 'bg-green-500' : 'bg-red-500'"
              >
              {{ activity.status ? '승인' : '반려' }}
              </span>
            </td>

            <td class="p-3 border">{{ activity.subject }}</td>

            <td class="p-3 border">
              {{ activity.userName }} ({{ activity.userID }})
            </td>

          </tr>
        </tbody>
      </table>
    </div>

    <!-- 📌 페이지네이션 -->
    <div class="mt-6 flex justify-center space-x-2 text-sm text-slate-600">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 rounded border disabled:opacity-40 hover:bg-slate-100"
      >
        ← 이전
      </button>

      <!--  전체 totalPages가 아니라 pageRange만 렌더링 -->
      <button
        v-for="page in pageRange"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-4 py-1 rounded-md border',
          page === currentPage
            ? 'bg-slate-800 text-white font-bold'
            : 'hover:bg-slate-100',
        ]"
      >
        {{ page }}
      </button>

      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 rounded border disabled:opacity-40 hover:bg-slate-100"
      >
        다음 →
      </button>
    </div>

    <!-- ➕ 활동 추가 -->
    <form
      @submit.prevent="submit"
      ref="formRef"
      class="mt-10 bg-white p-6 rounded-md shadow max-w-4xl mx-auto"
      v-if="!userRole"
    >
      <div class="flex items-center mb-2">
        <h2 class="text-3xl font-bold text-slate-800 mb-4 mr-4">활동 추가</h2>
        <!-- 주제 선택 -->
        <select
          v-model="formData.subject"
          @change="
            handleSubjectChange(
              subjects.find((s) => s.subject === formData.subject)
            )
          "
          class="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-slate-500 mb-4"
        >
          <option disabled value="">주제 선택</option>
          <option
            v-for="subject in subjects"
            :key="subject._id"
            :value="subject.subject"
          >
            {{ subject.esgValue }} - {{ subject.subject }}
          </option>
        </select>
      </div>

      <!-- 동적 입력 필드 -->
      <template v-if="selectedSubject">
        <div
          v-for="input in selectedSubject.inputs"
          :key="input.text"
          class="flex items-center w-full mt-2"
        >
          <label class="block text-gray-700 font-medium text-xl mr-2"
            >{{ input.text }} :</label
          >

          <!-- 파일 입력 -->
          <template v-if="input.type === 'file'">
            <input
              type="file"
              name="files"
              :ref="
                (el) => {
                  if (input.type === 'file') fileInput = el;
                }
              "
              @change="(e) => handleFileUpload(e, input.inputValue)"
              class="border border-gray-300 p-2 rounded w-80 mt-3 ml-2 mr-2"
            />
          </template>

          <!-- 숫자 입력 -->
          <input
            v-else-if="input.type === 'number'"
            type="number"
            v-model="formData.inputs[input.inputValue]"
            :placeholder="`${input.text} 입력`"
            class="border border-gray-300 p-2 rounded w-80 mt-3 ml-2 mr-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />

          <!-- 텍스트 입력 -->
          <input
            v-else-if="input.type === 'time'"
            type="time"
            v-model="formData.inputs[input.inputValue]"
            class="border border-gray-300 p-2 rounded w-80 mt-3 ml-2 mr-2"
          />

          <!-- 텍스트 입력 -->
          <input
            v-else
            type="text"
            v-model="formData.inputs[input.inputValue]"
            :placeholder="`${input.text} 입력`"
            class="border border-gray-300 p-2 rounded w-80 mt-3 ml-2 mr-2"
          />
        </div>
      </template>

      <button
        type="submit"
        class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition ml-auto w-[123px] mt-4"
      >
        승인 요청
      </button>
    </form>
  </div>
</template>

<style scoped></style>