<template>
  <div class="px-8 py-10 bg-gray-50 min-h-screen">
    <!-- 페이지 제목 -->
    <h2 class="text-2xl font-bold text-gray-800 mb-6">사내 캠페인 리스트</h2>

    <!-- 검색창 -->
    <div class="flex items-center justify-between bg-white p-4 rounded-md shadow mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="캠페인명 검색"
        class="border border-gray-300 rounded-md px-4 py-2 w-1/3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 text-sm shadow"
      >
        검색
      </button>
    </div>

    <!-- 리스트 테이블 -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full text-sm text-gray-700 text-center">
        <thead class="bg-gray-100 border-b border-gray-200">
          <tr>
            <th class="py-3 px-6">내용</th>
            <th class="py-3 px-6">날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in filteredCampaigns"
            :key="index"
            @click="goToDetail(item)"
            class="border-b hover:bg-blue-50 cursor-pointer"
          >
            <td class="py-3 px-6 font-medium">{{ item.title }}</td>
            <td class="py-3 px-6 text-gray-500">{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 페이지네이션 -->
    <div class="flex justify-center mt-6 space-x-2">
      <span
        v-for="page in 5"
        :key="page"
        class="px-3 py-1 border rounded text-sm cursor-pointer hover:bg-blue-100"
      >
        {{ page }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const campaigns = ref([
  { title: 'ESG 캠페인 5', date: '2025.02.12' },
  { title: 'ESG 캠페인 4', date: '2025.02.12' },
  { title: 'ESG 캠페인 3', date: '2025.02.12' },
  { title: 'ESG 캠페인 2', date: '2025.02.12' },
  { title: 'ESG 캠페인 1', date: '2025.02.12' }
])

const filteredCampaigns = computed(() =>
  campaigns.value.filter(c => c.title.includes(searchQuery.value))
)

const goToDetail = (item) => {
  router.push({ name: 'ActivityCampaignDetail', query: { title: item.title } })
}
</script>
