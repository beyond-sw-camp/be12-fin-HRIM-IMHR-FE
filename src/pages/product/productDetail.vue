<template>
    <div class="min-h-screen bg-white px-24 py-16 flex flex-col text-gray-800">
      <h1 class="text-xl font-bold text-blue-600 mb-8">친환경 제품 상세 보기</h1>
  
      <div class="flex flex-row w-full gap-12 items-start justify-center">
        <!-- Left: Image -->
        <div class="flex flex-col items-center">
            <img src="https://sitem.ssgcdn.com/92/72/59/item/1000558597292_i1_1200.jpg" class="w-72 mb-4" alt="">
          <p class="text-lg font-semibold">친환경 제품 매출 : <span class="text-gray-400">3,000 만원</span></p>
        </div>
  
        <!-- Right: Product Info -->
        <div class="flex flex-col space-y-6 text-lg w-full max-w-2xl">
          <div class="border-b pb-2">
            <span class="font-bold">제품명</span> : <span class="text-gray-500">1회용 주방 수세미</span>
          </div>
          <div class="flex justify-between">
            <div>
              <span class="font-bold">단가</span> : <span class="text-gray-500">10,000 원</span>
            </div>
            <div>
              <span class="font-bold">판매수량</span> : <span class="text-gray-500">1,000개</span>
            </div>
          </div>
  
          <div class="border border-gray-300 rounded-md p-4 space-y-4">
            <p>전월 대기 증가율 : 3%</p>
            <hr />
            <p>전분기 대기 증가율 : 7%</p>
            <hr />
            <p>총 매출액 : 5,000 만원</p>
            <hr />
            <p>제품 등급 : 우수</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Composition API logic (if needed) goes here
  </script>
  
  <style scoped>
  </style>