<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
</script>

<template>
  <div class="bg-gray-50 min-h-screen p-10">
    <!-- 🏷️ 페이지 상단 제목 -->
    <h1 class="text-3xl font-bold text-center text-slate-800 mb-10">교육 관리</h1>

    <!-- 🔍 검색 바 -->
    <div class="relative max-w-xl mx-auto mb-8">
      <input
          v-model="searchQuery"
          placeholder="내용을 입력해주세요"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
      />
      <button
          class="absolute right-1.5 top-1/2 -translate-y-1/2 bg-slate-800 text-white px-4 py-1 rounded hover:bg-slate-900"
      >
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
          <th class="p-3 border">삭제</th>
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
          <td class="p-3">
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
          <td class="p-3">
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
          <td class="p-3">
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
    <div class="mt-12 bg-white p-6 rounded-md shadow-md space-y-4 max-w-5xl mx-auto">
      <h2 class="text-lg font-semibold text-slate-800">활동 추가</h2>
      <div class="flex flex-col md:flex-row gap-4">
        <input
            placeholder="내용 입력"
            class="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-slate-500"
        />
        <select
            class="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-slate-500"
        >
          <option disabled selected>주제 선택</option>
          <option>봉사</option>
          <option>기부</option>
        </select>
        <input
            type="file"
            class="border border-gray-300 rounded-md px-4 py-2"
        />
        <button
            class="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-slate-900 transition"
        >
          승인 요청
        </button>
      </div>
    </div>
  </div>
</template>
