<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <h2 class="text-2xl font-bold text-slate-800 mb-6">사내 캠페인 상세</h2>

    <!-- 캠페인 제목 -->
    <div class="mb-6">
      <input
          type="text"
          v-model="campaignTitle"
          readonly
          class="w-full border border-gray-300 rounded px-4 py-3 text-lg bg-gray-100 text-slate-700"
      />
    </div>

    <!-- 날짜 검색 영역 -->
    <div class="flex flex-wrap items-center gap-4 mb-8">
      <label class="text-slate-700 font-semibold">날짜 :</label>
      <input
          type="date"
          v-model="startDate"
          class="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
      />
      <input
          type="date"
          v-model="endDate"
          class="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
      />
      <button class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition">
        검색
      </button>
    </div>

    <!-- 참여자 테이블 -->
    <div class="bg-white rounded shadow-md overflow-x-auto">
      <table class="w-full text-center border-collapse">
        <thead class="bg-slate-100 border-b border-gray-200 text-slate-700">
        <tr>
          <th class="py-3 px-2"><input type="checkbox" /></th>
          <th class="py-3 px-2">아이디</th>
          <th class="py-3 px-2">이름</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="user in users"
            :key="user.id"
            class="border-t border-gray-100 hover:bg-slate-50 transition"
        >
          <td class="py-3 px-2"><input type="checkbox" /></td>
          <td class="py-3 px-2">{{ user.id }}</td>
          <td class="py-3 px-2">{{ user.name }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const campaignTitle = ref('')
const startDate = ref('2025-08-17')
const endDate = ref('2025-08-17')

onMounted(() => {
  campaignTitle.value = route.query.title || 'ESG 캠페인 1'
})

const users = ref([
  { id: 'test4', name: 'test4' },
  { id: 'test3', name: 'test3' },
  { id: 'test2', name: 'test2' },
  { id: 'test1', name: 'test1' },
  { id: 'test', name: 'test' }
])
</script>
