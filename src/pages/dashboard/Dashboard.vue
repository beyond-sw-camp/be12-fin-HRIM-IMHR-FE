<!-- src/pages/common/dashboard/Dashboard.vue -->
<template>
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">종합분석 <span class="text-gray-500 text-base">2022</span></h1>
  
      <!-- 기본정보 -->
      <div class="grid grid-cols-5 gap-4 bg-white shadow p-4 mb-6 rounded">
        <div>
          <p class="text-sm text-gray-500">회사</p>
          <p>한화시스템(주)</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">매출액</p>
          <p>2,187,405 백만원</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">산업군</p>
          <p>산업용우주항공과국방</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">해신 리포트</p>
          <p>2022</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">생성일</p>
          <p>2023-03-28</p>
        </div>
      </div>
  
      <!-- 그래프 -->
      <div class="grid grid-cols-2 gap-6 mb-6">
        <div class="bg-white p-6 rounded shadow text-center">
          <p class="mb-2 font-semibold">ESG 진단 점수</p>
          <div class="text-3xl text-green-500 font-bold">74.6</div>
          <p class="text-pink-500 mt-2">타업체대비 8.5점 높아요!</p>
        </div>
        <div class="bg-white p-6 rounded shadow">
          <p class="mb-2 font-semibold">점수 변화 추이</p>
          <!-- 실제 차트 컴포넌트 또는 이미지 삽입 가능 -->
          <div class="bg-blue-100 h-40 flex justify-center items-center">[차트]</div>
        </div>
      </div>
  
      <!-- 이달의 사원 -->
      <div class="bg-white shadow p-4 rounded mb-6">
        <h2 class="text-lg font-semibold mb-4">이달의 사원</h2>
        <div class="flex justify-between text-center">
          <div>
            <p>🥇 홍길동</p>
            <p>코멘트 갯수 : 100</p>
          </div>
          <div>
            <p>🥈 임꺽정</p>
            <p>코멘트 갯수 : 99</p>
          </div>
          <div>
            <p>🥉 너구리</p>
            <p>코멘트 갯수 : 98</p>
          </div>
        </div>
      </div>
  
      <!-- 영역별 점수 -->
      <div class="grid grid-cols-3 gap-4">
        <div class="bg-green-100 p-4 rounded shadow">
          <p class="text-sm text-gray-700">기준대비 1.1%</p>
          <p class="text-lg font-bold">환경 Environmental</p>
          <p class="text-2xl font-bold">55.2</p>
          <p class="text-xs text-gray-500">전년대비 ▲ 1.1</p>
        </div>
        <div class="bg-blue-100 p-4 rounded shadow">
          <p class="text-sm text-gray-700">기준대비 40%</p>
          <p class="text-lg font-bold">사회 Social</p>
          <p class="text-2xl font-bold">73.9</p>
          <p class="text-xs text-gray-500">전년대비 ▲ 17.7</p>
        </div>
        <div class="bg-purple-100 p-4 rounded shadow">
          <p class="text-sm text-gray-700">기준대비 47%</p>
          <p class="text-lg font-bold">지배구조 Governance</p>
          <p class="text-2xl font-bold">80.6</p>
          <p class="text-xs text-gray-500">전년대비 ▲ 2.8</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // 필요 시 로직 추가 가능
  </script>
  
  <style scoped>
  /* 필요 시 커스텀 스타일 */
  </style>
  