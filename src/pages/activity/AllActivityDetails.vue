<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goToList = () => {
  router.push('/education') // 실제 라우터 경로에 맞게 수정
}
</script>

<template>
  <div class="bg-white min-h-[calc(93vh-4rem)] p-8 rounded-lg shadow-sm">
    <!-- 타이틀 -->
    <h2 class="text-2xl font-bold text-slate-800 mb-6 text-center">ESG 교육 상세</h2>

    <!-- 상세 카드 -->
    <div class="border border-slate-200 p-6 rounded-lg bg-gray-50 shadow-md space-y-5 max-w-3xl mx-auto">
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
          <a href="#" class="text-blue-600 hover:underline text-sm">파일1.pdf</a>
          <a href="#" class="text-blue-600 hover:underline text-sm">파일2.pdf</a>
        </div>
      </div>

      <!-- 내용 -->
      <div>
        <span class="font-semibold text-slate-700">내용:</span>
        <div class="mt-2 p-4 bg-white border border-slate-200 rounded-md text-slate-600 text-sm leading-relaxed">
          ESG 교육 과정의 세부 내용이 여기에 표시됩니다.
        </div>
      </div>

      <!-- 버튼 -->
      <div class="text-right pt-2">
        <button
            @click="goToList"
            class="px-5 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-900 transition"
        >
          목록
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
