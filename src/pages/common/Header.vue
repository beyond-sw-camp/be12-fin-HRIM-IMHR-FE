<script setup>
import { useRouter } from 'vue-router';

const route = useRouter();
</script>

<template>
  <nav class="bg-white shadow-md w-full h-16 flex items-center px-6 fixed top-0 left-0 z-50">
    <!-- 왼쪽 로고 -->
    <div class="text-blue-600 font-bold text-xl">IM HR</div>

    <!-- 가운데 제목 -->
    <div class="text-gray-700 text-lg font-semibold">타 기업 ESG 대시보드</div>

    <!-- 오른쪽 사용자 정보 -->
    <div class="flex items-center gap-4">
      <span class="text-gray-900 font-medium">홍길동 님</span>
      <button class="text-yellow-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V9a6 6 0 10-12 0v5c0 .386-.149.735-.405 1.005L4 17h5m6 0a3 3 0 11-6 0"></path>
        </svg>
      </button>
    </div>
  </nav>
</template>

<style scoped>
</style>