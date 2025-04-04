<script setup>
</script>

<template>
  <div
    class="bg-white min-h-[calc(93vh-4rem)] overflow-y-auto transition-all p-6 rounded-lg"
  >

    <h2 class="text-2xl font-bold text-blue-600 mb-4">ESG 교육 상세</h2>

    <div class="border p-4 rounded-md shadow-md bg-gray-50">
      <div class="mb-2"><span class="font-semibold">게시자:</span> 홍길동</div>
      <div class="mb-4">
        <span class="font-semibold">제목:</span> ESG 교육 과정 안내
      </div>

      <div class="mb-4">
        <span class="font-semibold">첨부파일:</span>
        <div class="flex gap-2 mt-2">
          <a href="#" class="text-blue-500 hover:underline">파일1.pdf</a>
          <a href="#" class="text-blue-500 hover:underline">파일2.pdf</a>
        </div>
      </div>

      <div class="mb-4">
        <span class="font-semibold">내용:</span>
        <div class="p-3 bg-white border rounded-md mt-2">
          ESG 교육 과정의 세부 내용이 여기에 표시됩니다.
        </div>
      </div>

      <div class="flex justify-end">

        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          목록
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>