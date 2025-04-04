<!-- src/views/activity/ActivityCampaignListView.vue -->
<template>
    <div class="p-8">
      <div class="flex items-center space-x-2 mb-6">
        <input type="text" placeholder="검색" class="border px-4 py-2 rounded w-[300px]" v-model="searchQuery" />
        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">검색</button>
      </div>
  
      <table class="w-full text-center border-separate space-y-2">
        <thead>
          <tr class="font-semibold">
            <th>내용</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredCampaigns" :key="index" @click="goToDetail(item)" class="cursor-pointer hover:bg-blue-50">
            <td>{{ item.title }}</td>
            <td>{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
  
      <div class="mt-4 flex justify-center space-x-2">
        <span v-for="page in 5" :key="page" class="px-2 py-1 border rounded cursor-pointer hover:bg-blue-100">
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
  