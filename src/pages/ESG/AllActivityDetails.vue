<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter();
const userRole = ref(JSON.parse(localStorage.getItem('userInfo'))?.role || 'manager')
// manager executive mosque `'${{변수명}}'`
</script>

<template>
  <div class="bg-white min-h-[calc(93vh-4rem)] p-8 rounded-lg shadow-sm">
    <!-- 타이틀 -->
    <h2 class="text-2xl font-bold text-slate-800 mb-6 text-center">
      ESG 교육 상세
    </h2>

    <!-- 상세 카드 -->
    <div
      class="border border-slate-200 p-6 rounded-lg bg-gray-50 shadow-md space-y-5 max-w-3xl mx-auto"
    >
      <!-- 게시자 -->
      <div>
        <span class="font-semibold text-slate-700">게시자:</span>
        <span class="text-slate-600 ml-2">홍길동</span>
      </div>

      <!-- 제목 -->
      <div>
        <span class="font-semibold text-slate-700">제목:</span>
        <span class="text-slate-600 ml-2">ESG 교육 과정 안내</span>
      </div>

      <!-- 첨부파일 -->
      <div>
        <span class="font-semibold text-slate-700">첨부파일:</span>
        <div class="flex gap-4 mt-2">
          <a href="#" class="text-blue-600 hover:underline text-sm"
            >파일1.pdf</a
          >
          <a href="#" class="text-blue-600 hover:underline text-sm"
            >파일2.pdf</a
          >
        </div>
      </div>

      <!-- 내용 -->
      <div>
        <span class="font-semibold text-slate-700">내용:</span>
        <div
          class="mt-2 p-4 bg-white border border-slate-200 rounded-md text-slate-600 text-sm leading-relaxed"
        >
          ESG 교육 과정의 세부 내용이 여기에 표시됩니다.
        </div>
      </div>

      <!-- 버튼 -->
      <div class="flex justify-end gap-3 pt-4" v-if="userRole === 'manager'">
        <button
          class="px-4 py-1 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50"
        >
          승인
        </button>

        <button
          class="px-4 py-1 border-2 border-red-500 text-red-500 rounded hover:bg-red-50"
        >
          반려
        </button>
      </div>

      <div class="flex justify-end gap-3 pt-4" v-if="userRole !== 'manager'">
        <button
          class="px-4 py-1 border-2 border-red-500 text-red-500 rounded hover:bg-red-50"
        >
          삭제
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
</style>
