<template>
    <div class="bg-white text-gray-800 p-8 space-y-10">
      <!-- 우리 회사 갱신 주기 설정 -->
      <div class="max-w-xl mx-auto border rounded-lg p-6 shadow">
        <h2 class="text-lg font-bold mb-4">우리 회사 갱신 주기 설정</h2>
        <label class="block mb-2 font-medium">갱신 주기 선택</label>
        <select v-model="companyCycle" class="w-full border rounded px-3 py-2 mb-4">
          <option value="1년">1년</option>
          <option value="2년">2년</option>
          <option value="3년">3년</option>
        </select>
        <button @click="saveCycle('company')" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          저장
        </button>
      </div>
  
      <!-- 협력사 갱신 주기 설정 -->
      <div class="max-w-xl mx-auto border rounded-lg p-6 shadow">
        <h2 class="text-lg font-bold mb-4">협력사 갱신 주기 설정</h2>
        <label class="block mb-2 font-medium">갱신 주기 선택</label>
        <select v-model="partnerCycle" class="w-full border rounded px-3 py-2 mb-4">
          <option value="1년">1년</option>
          <option value="2년">2년</option>
          <option value="3년">3년</option>
        </select>
        <button @click="saveCycle('partner')" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          저장
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const companyCycle = ref('1년')
  const partnerCycle = ref('1년')
  
  const saveCycle = (type) => {
    if (type === 'company') {
      alert(`우리 회사 주기: ${companyCycle.value} 저장됨`)
    } else if (type === 'partner') {
      alert(`협력사 주기: ${partnerCycle.value} 저장됨`)
    }
  }
  </script>
  
  <style scoped>
  /* 필요 시 사용자 정의 스타일 작성 */
  </style>
  