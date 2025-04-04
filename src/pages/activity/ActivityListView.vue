<template>
    <div class="p-6">
      <!-- 검색창 -->
      <div class="flex items-center space-x-2 mb-4">
        <input type="text" v-model="search" placeholder="검색어를 입력하세요" class="border px-4 py-2 rounded w-full" />
        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">검색</button>
      </div>
  
      <!-- 활동 리스트 -->
      <table class="w-full text-center border-t border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="py-2">상태</th>
            <th>주제</th>
            <th>내용</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(activity, index) in pagedActivities" :key="index" class="border-b">
            <td>
              <span
                :class="{
                  'bg-green-500': activity.status === '승인',
                  'bg-red-500': activity.status === '대기 중',
                  'bg-yellow-500': activity.status === '승인 반려'
                }"
                class="text-white px-2 py-1 rounded text-sm"
              >
                {{ activity.status }}
              </span>
            </td>
            <td>{{ activity.topic }}</td>
            <td>{{ activity.content }}</td>
            <td>
              <button class="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- 페이지네이션 -->
      <div class="flex justify-center mt-4 space-x-2 text-sm">
        <span @click="goToPage(currentPage - 1)" class="cursor-pointer">이전</span>
        <span v-for="page in totalPages" :key="page" class="cursor-pointer" @click="goToPage(page)">
          {{ page }}
        </span>
        <span @click="goToPage(currentPage + 1)" class="cursor-pointer">다음</span>
      </div>
  
      <!-- 활동 추가 -->
      <div class="mt-8 space-y-2">
        <h2 class="font-bold mb-2">활동 추가</h2>
        <div class="flex space-x-2">
          <input v-model="newActivity.content" placeholder="내용" class="border px-4 py-2 rounded w-1/3" />
          <select v-model="newActivity.topic" class="border px-4 py-2 rounded w-1/3">
            <option disabled value="">주제 선택</option>
            <option>봉사</option>
            <option>기부</option>
          </select>
          <input type="file" @change="handleFileUpload" class="border px-4 py-2 rounded w-1/3" />
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">승인 요청</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const search = ref('')
  const currentPage = ref(1)
  const perPage = 5
  
  const activities = ref([
    { status: '대기 중', topic: '봉사', content: '지역 봉사 활동' },
    { status: '대기 중', topic: '기부', content: '재난기부' },
    { status: '승인 반려', topic: '봉사', content: '캄보디아 봉사' },
    { status: '승인', topic: '봉사', content: '민관 협력 국가재난 지원 봉사' },
    { status: '승인', topic: '기부', content: '정기 기부' },
    { status: '승인', topic: '기부', content: '일시 기부' }
  ])
  
  const totalPages = computed(() => Math.ceil(activities.value.length / perPage))
  
  const pagedActivities = computed(() =>
    activities.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
  )
  
  const goToPage = (page) => {
    if (page > 0 && page <= totalPages.value) currentPage.value = page
  }
  
  const newActivity = ref({ content: '', topic: '', file: null })
  
  const handleFileUpload = (e) => {
    newActivity.value.file = e.target.files[0]
  }
  </script>
  
  <style scoped>
  th, td {
    padding: 0.5rem;
  }
  </style>
  