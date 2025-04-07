<template>
  <div class="min-h-screen bg-gray-50 p-10">
    <!-- 제목 -->
    <h1 class="text-2xl font-bold text-slate-800 mb-6 text-center">활동 인증 관리</h1>

    <!-- 🔍 검색 -->
    <div class="flex items-center gap-4 bg-white p-5 rounded-md shadow mb-6 max-w-4xl mx-auto">
      <input
          v-model="search"
          type="text"
          placeholder="검색어를 입력하세요"
          class="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-slate-500 focus:outline-none"
      />
      <button class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 shadow">
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
          <th>내용</th>
          <th>삭제</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(activity, index) in pagedActivities"
            :key="index"
            class="border-b hover:bg-slate-50 transition"
        >
          <td class="py-2">
              <span
                  class="text-white text-xs px-3 py-1 rounded-md inline-block"
                  :class="{
                  'bg-yellow-500': activity.status === '대기 중',
                  'bg-green-500': activity.status === '승인',
                  'bg-red-500': activity.status === '승인 반려'
                }"
              >
                {{ activity.status }}
              </span>
          </td>
          <td>{{ activity.topic }}</td>
          <td>{{ activity.content }}</td>
          <td>
            <button
                class="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition"
            >
              삭제
            </button>
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

      <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="[
          'px-4 py-1 rounded-md border',
          page === currentPage
            ? 'bg-slate-800 text-white font-bold'
            : 'hover:bg-slate-100'
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
    <div class="mt-10 bg-white p-6 rounded-md shadow max-w-4xl mx-auto">
      <h2 class="text-lg font-semibold text-slate-800 mb-4">활동 추가</h2>
      <div class="flex flex-col md:flex-row gap-4">
        <input
            v-model="newActivity.content"
            placeholder="내용 입력"
            class="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-slate-500"
        />
        <select
            v-model="newActivity.topic"
            class="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-slate-500"
        >
          <option disabled value="">주제 선택</option>
          <option>봉사</option>
          <option>기부</option>
        </select>
        <input
            type="file"
            @change="handleFileUpload"
            class="border border-gray-300 rounded-md px-4 py-2"
        />
        <button
            class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition"
        >
          승인 요청
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue'

const search = ref('')
const currentPage = ref(1)
const perPage = 5

const activities = ref([
  {status: '대기 중', topic: '봉사', content: '지역 봉사 활동'},
  {status: '대기 중', topic: '기부', content: '재난기부'},
  {status: '승인 반려', topic: '봉사', content: '캄보디아 봉사'},
  {status: '승인', topic: '봉사', content: '민관 협력 국가재난 지원 봉사'},
  {status: '승인', topic: '기부', content: '정기 기부'},
  {status: '승인', topic: '기부', content: '일시 기부'}
])

const totalPages = computed(() =>
    Math.ceil(filteredActivities.value.length / perPage)
)

const filteredActivities = computed(() => {
  return activities.value.filter(
      a =>
          a.content.includes(search.value) ||
          a.topic.includes(search.value) ||
          a.status.includes(search.value)
  )
})

const pagedActivities = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredActivities.value.slice(start, start + perPage)
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page
}

const newActivity = ref({content: '', topic: '', file: null})

const handleFileUpload = (e) => {
  newActivity.value.file = e.target.files[0]
}
</script>
