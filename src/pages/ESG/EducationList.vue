<script setup>
import { ref } from 'vue'
import { Search } from "lucide-vue-next";
import { useEducationStore } from '../../stores/useEducationStore';
import { useStompStore } from '../../stores/useStompStore';

const searchQuery = ref('')
const educationStore= useEducationStore();
const stomp = useStompStore();
const userRole = ref(JSON.parse(localStorage.getItem('userInfo'))?.role || 'manager')
// manager executive staff `'${{변수명}}'`



// 이미지 관련
const previewImage = ref(null);
const file = ref(null);
const fileInput = ref(null);
const formRef = ref(null)
const newEducation = ref({ topic: '', file: null })

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
  if (file.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file.value);
  }
}

// 프리뷰 제거
const previewImageClose = () => {
  console.log(file.value);
  previewImage.value = null;
  file.value = null;
  if (fileInput.value) {
    fileInput.value.value = null;
  }
}

// form 데이터 전송
const submit = async () => {
  let formData = new FormData(formRef.value);

 
  if (!formData.get('title')) {
    alert("제목을 입력하여 주십시오.")
  }
  else if (!newEducation.value.topic) {
    alert("주제를 선택하여 주십시오.")
  }
  else if (!formData.get("performance")) {
    alert("활동 시간이나 금액을 입력하여 주십시오.")
  } else if (file.value === null) {
    alert("파일을 첨부하여 주십시오.")
  } else if (!formData.get('description')) {
    alert("내용을 입력하여 주십시오.")
  } else {
    const dto = {
      type: newEducation.value.topic,
      title: formData.get("title"),
      description: formData.get("description"),
      performance: formData.get('performance')
    };

    formData = new FormData();
    formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));

    formData.append("file", file.value);

    try {
      const response = await educationStore.regist(formData);

      stomp.activityApproveReq("수강 완료 승인 요청", "[" + response.title + "] 수강 완료 승인 요청이 왔습니다.", memberStore.myCompanyIdx, response.idx);
      window.location.reload();
    } catch (error) {
      alert("수강 완료 추가 실패 \n 관리자에게 문의 하시오.");
    }
  }
}


const activityDelete = async (activicyIdx) => {
  const isSuccess = await activitySore.delete(activicyIdx);
  if (isSuccess === true) {
    window.location.reload();
  } else {
    alert("삭제 실패");
  }
};
</script>

<template>
  <div class="bg-gray-50 min-h-screen p-10">
    <!-- 🏷️ 페이지 상단 제목 -->
    <h1 class="text-4xl font-bold text-center text-slate-800 mb-10">교육 관리</h1>

    <!-- 🔍 검색 바 -->
    <div class="max-w-2xl mx-auto bg-white p-4 rounded-md shadow-md flex items-center gap-3 mb-8">
      <Search color="black" :size="30" />

      <input v-model="searchQuery" placeholder="내용을 입력해주세요"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" />

      <button class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition">
        검색
      </button>
    </div>


    <!-- 📋 테이블 -->
    <div class="overflow-x-auto bg-white rounded-lg shadow max-w-5xl mx-auto">
      <table class="w-full table-auto border-collapse text-center text-sm text-slate-800">
        <thead class="bg-slate-100 border-b text-slate-700">
          <tr>
            <th class="p-3 border">상태</th>
            <th class="p-3 border">내용</th>
            <th class="p-3 border">날짜</th>
            <th class="p-3 border" v-if="userRole !== 'manager'">삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b hover:bg-slate-50">
            <td class="p-3">
              <span class="bg-yellow-500 text-white px-3 py-1 rounded-md">대기 중</span>
            </td>

            <router-link to="/activeDetails/1">
              <td class="p-3">ESG 교육 1</td>
            </router-link>

            <td class="p-3">2025.02.12</td>
            <td class="p-3" v-if="userRole !== 'manager'">
              <button class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                삭제
              </button>
            </td>
          </tr>
          <tr class="border-b hover:bg-slate-50">
            <td class="p-3">
              <span class="bg-red-500 text-white px-3 py-1 rounded-md">승인 반려</span>
            </td>

            <router-link to="/activeDetails/1">
              <td class="p-3">ESG 교육 2</td>
            </router-link>

            <td class="p-3">2025.02.15</td>
            <td class="p-3" v-if="userRole !== 'manager'">
              <button class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                삭제
              </button>
            </td>
          </tr>

          <tr class="border-b hover:bg-slate-50" v-for="i in 3" :key="i">
            <td class="p-3">
              <span class="bg-green-500 text-white px-3 py-1 rounded-md">승인</span>
            </td>

            <router-link to="/activeDetails/1">
              <td class="p-3">ESG 교육 3</td>
            </router-link>

            <td class="p-3">2025.02.18</td>
            <td class="p-3" v-if="userRole !== 'manager'">
              <button class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                삭제
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 📄 페이지네이션 -->
    <div class="mt-8 flex justify-center space-x-2 text-sm">
      <button class="bg-slate-700 text-white px-3 py-1 rounded hover:bg-slate-900">← 이전</button>
      <button class="bg-slate-800 text-white px-3 py-1 rounded font-bold">1</button>
      <button class="bg-slate-700 text-white px-3 py-1 rounded hover:bg-slate-900">다음 →</button>
    </div>

    <!-- ➕ 활동 추가 -->
    <!-- ➕ 활동 추가 -->
    <form action="/" method="post" @submit.prevent="handleSubmit" ref="formRef"
      class="mt-10 bg-white p-6 rounded-md shadow max-w-4xl mx-auto" v-if="userRole !== 'manager'">
      <h2 class="text-lg font-semibold text-slate-800 mb-4">활동 추가</h2>

      <div class="flex flex-col md:flex-row gap-4 mb-2">
        <input placeholder="교육 주제" name="title"
          class="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-slate-500" />
        <select v-model="newEducation.topic"
          class="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-slate-500">
          <option disabled value="">주제 선택</option>
          <option>환경</option>
          <option>사회</option>
          <option>지배구조</option>
        </select>

      </div>



      <div v-if="previewImage" class="relative inline-block my-2">
        <!-- 닫기 버튼 -->
        <button @click="previewImageClose" type="button"
          class="absolute top-2 left-2 bg-white text-black rounded-full px-2 py-1 text-xs shadow hover:bg-gray-200">
          ✕
        </button>

        <!-- 이미지 -->
        <img class="h-64 rounded" :src="previewImage" alt="" />
      </div>


      <div class="flex flex-col md:flex-row gap-4 mt-2">
        <input type="number" name="performance" placeholder="교육 시간"
          class="border border-gray-300 rounded-md px-4 py-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none">
        <input type="file" ref="fileInput" accept="image/jpg, image/jpeg, image/png" name="file"
          @change="handleFileUpload" class="border border-gray-300 rounded-md px-4 py-2" />

      </div>

      <div class="my-2">
        <textarea placeholder="교육 내용" name="description"
          class="w-full h-[150px] flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-slate-500"></textarea>
      </div>

      <button type="button" @click="submit"
        class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition ml-auto w-[123px]">
        승인 요청
      </button>
    </form>
  </div>
</template>
