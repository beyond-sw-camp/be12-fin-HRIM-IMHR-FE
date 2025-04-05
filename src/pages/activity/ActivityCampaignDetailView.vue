<!-- src/views/activity/ActivityCampaignDetailView.vue -->
<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <h2 class="text-2xl font-bold mb-6">사내 캠페인 상세</h2>

    <!-- 캠페인 제목 -->
    <div class="mb-6">
      <input
        type="text"
        v-model="campaignTitle"
        class="w-full border border-gray-300 rounded px-4 py-3 text-lg bg-gray-100"
        readonly
      />
    </div>

    <!-- 날짜 검색 영역 -->
    <div class="flex flex-wrap items-center gap-4 mb-8">
      <label class="text-gray-700 font-semibold">날짜 :</label>
      <input
        type="date"
        v-model="startDate"
        class="border border-gray-300 px-3 py-2 rounded"
      />
      <input
        type="date"
        v-model="endDate"
        class="border border-gray-300 px-3 py-2 rounded"
      />
      <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
        검색
      </button>
    </div>

    <!-- 참여자 테이블 -->
    <div class="bg-white rounded shadow">
      <table class="w-full text-center">
        <thead class="bg-gray-100 border-b">
          <tr>
            <th class="py-3"><input type="checkbox" /></th>
            <th class="py-3">아이디</th>
            <th class="py-3">이름</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="border-t hover:bg-blue-50 transition"
          >
            <td class="py-3"><input type="checkbox" /></td>
            <td class="py-3">{{ user.id }}</td>
            <td class="py-3">{{ user.name }}</td>
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
