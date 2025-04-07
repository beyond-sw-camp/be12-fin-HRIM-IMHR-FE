<template>
    <div class="bg-gray-50 p-8">
      <!-- 항목1 -->
      <div class="mb-4">
        <label class="block font-bold mb-1">항목1</label>
        <label class="block text-gray-700">질문 내용 :</label>
        <input
          type="text"
          class="border border-gray-300 p-2 rounded w-full mb-2"
          v-model="items[0]"
        />
        <button class="bg-red-500 text-white px-3 py-1 rounded" @click="removeItem(0)">
          항목 삭제
        </button>
      </div>
  
      <!-- 항목2 -->
      <div class="mb-4">
        <label class="block font-bold mb-1">항목2</label>
        <label class="block text-gray-700">질문 내용 :</label>
        <input type="text" class="border border-gray-300 p-2 rounded w-full mb-2" v-model="items[1]" />
        <button class="bg-red-500 text-white px-3 py-1 rounded" @click="removeItem(1)">
          항목 삭제
        </button>
      </div>
  
      <!-- 추가 항목 -->
      <div class="border-t pt-4">
        <div class="flex items-center justify-between mb-2">
          <h2 class="font-bold">추가 항목</h2>
          <button class="bg-green-500 text-white px-3 py-1 rounded" @click="addSubItem">항목 추가</button>
        </div>
  
        <!-- 체크박스 -->
        <div class="flex space-x-8 mb-4">
          <!-- 주관식 -->
          <div class="flex flex-col items-start">
            <label class="inline-flex items-center space-x-2">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" v-model="isSubjective" />
              <span class="text-gray-700 font-medium">주관식</span>
            </label>
            <span class="text-sm text-gray-500 mt-1 pl-7">Description</span>
          </div>
  
          <!-- 객관식 -->
          <div class="flex flex-col items-start">
            <label class="inline-flex items-center space-x-2">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" v-model="isObjective" />
              <span class="text-gray-700 font-medium">객관식</span>
            </label>
            <span class="text-sm text-gray-500 mt-1 pl-7">Description</span>
          </div>
        </div>
  
        <!-- 하부 항목 목록 -->
        <div v-for="(subItem, index) in subItems" :key="index" class="mb-4">
          <label class="block font-bold mb-1">하부 항목{{ index + 1 }}</label>
          <label class="block text-gray-700">질문 내용 :</label>
          <input
            type="text"
            class="border border-gray-300 p-2 rounded w-full mb-2"
            v-model="subItems[index]"
          />
          <div class="flex justify-end space-x-2">
            <button class="bg-green-500 text-white px-3 py-1 rounded" @click="addSubItem">하부 항목 추가</button>
            <button class="bg-red-500 text-white px-3 py-1 rounded" @click="removeSubItem(index)">항목 삭제</button>
          </div>
        </div>
      </div>
  
      <!-- 저장 버튼 -->
      <div class="mt-6 flex justify-end">
        <button class="bg-blue-500 text-white px-6 py-2 rounded" @click="saveForm">저장</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const items = ref([
    '이 동료는 협업 과정에서 열린 자세를 보인다.',
    ''
  ])
  
  const subItems = ref([''])
  const isSubjective = ref(false)
  const isObjective = ref(false)
  
  const addSubItem = () => {
    subItems.value.push('')
  }
  
  const removeSubItem = (index) => {
    subItems.value.splice(index, 1)
  }
  
  const removeItem = (index) => {
    items.value[index] = ''
  }
  
  const saveForm = () => {
    console.log('Form saved:', {
      items: items.value,
      subItems: subItems.value,
      isSubjective: isSubjective.value,
      isObjective: isObjective.value
    })
  }
  </script>
  
  <style scoped>
  </style>