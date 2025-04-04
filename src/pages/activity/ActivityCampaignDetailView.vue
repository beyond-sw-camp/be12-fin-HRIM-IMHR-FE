<!-- src/views/activity/ActivityCampaignDetailView.vue -->
<template>
    <div class="p-8">
      <h2 class="text-xl font-semibold mb-4 text-blue-600">ESG 캠페인</h2>
      <input type="text" v-model="campaignTitle" class="border px-4 py-2 mb-4 w-full rounded" readonly />
  
      <div class="flex items-center space-x-4 mb-6">
        <label>날짜 :</label>
        <input type="date" v-model="startDate" class="border px-3 py-1 rounded" />
        <input type="date" v-model="endDate" class="border px-3 py-1 rounded" />
        <button class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">검색</button>
      </div>
  
      <table class="w-full text-center border-t">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>아이디</th>
            <th>이름</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="border-t hover:bg-blue-50">
            <td><input type="checkbox" /></td>
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
          </tr>
        </tbody>
      </table>
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
  