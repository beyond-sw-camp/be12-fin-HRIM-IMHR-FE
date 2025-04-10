<template>
  <div
    class="min-h-screen bg-gray-50 px-6 md:px-24 py-16 flex flex-col text-slate-800"
  >
    <!-- 📌 제목 -->
    <h1 class="text-2xl font-bold text-center text-slate-800 mb-10">
      친환경 제품 상세 보기
    </h1>

    <!-- 📦 상세 내용 영역 -->
    <div class="flex flex-col md:flex-row gap-10 items-start justify-center">
      <!-- 📸 제품 이미지 + 매출 -->
      <div
        class="flex flex-col items-center bg-white p-6 rounded shadow-md w-full md:w-1/3"
      >
        <img
          src="https://sitem.ssgcdn.com/92/72/59/item/1000558597292_i1_1200.jpg"
          alt="제품 이미지"
          class="w-full h-auto max-w-xs mb-4 rounded-md"
        />
        <p class="text-lg font-semibold">
          친환경 제품 매출 :
          <span class="text-slate-400">3,000 만원</span>
        </p>
      </div>

      <!-- 📋 제품 상세 정보 -->
      <div
        class="flex flex-col bg-white p-6 rounded shadow-md space-y-6 w-full md:w-2/3"
      >
        <div class="border-b pb-2 text-lg">
          <span class="font-bold">제품명</span> :
          <span class="text-slate-500">1회용 주방 수세미</span>
        </div>
        <div class="flex flex-col sm:flex-row justify-between text-lg gap-4">
          <div>
            <span class="font-bold">단가</span> :
            <span class="text-slate-500">10,000 원</span>
          </div>
          <div>
            <span class="font-bold">판매수량</span> :
            <span class="text-slate-500">1,000개</span>
          </div>
        </div>

        <!-- 📈 추가 통계 -->
        <div
          class="border border-slate-200 rounded-lg p-4 space-y-3 bg-slate-50 text-sm"
        >
          <p><span class="font-semibold">전월 대기 증가율</span> : 3%</p>
          <hr />
          <p><span class="font-semibold">전분기 대기 증가율</span> : 7%</p>
          <hr />
          <p><span class="font-semibold">총 매출액</span> : 5,000 만원</p>
          <hr />
          <p><span class="font-semibold">제품 등급</span> : 우수</p>
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-3 pt-4" v-if="userRole === 'manager'">
      <router-link to="/productRegist"
        class="px-4 py-1 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50"
      >
        수정
      </router-link>

      <button
        class="px-4 py-1 border-2 border-red-500 text-red-500 rounded hover:bg-red-50"
      >
        삭제
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const userRole = ref(JSON.parse(localStorage.getItem('userInfo'))?.role || 'manager')
// manager executive mosque `'${{변수명}}'` v-if="userRole === 'manager'"
</script>

<style scoped>
</style>
