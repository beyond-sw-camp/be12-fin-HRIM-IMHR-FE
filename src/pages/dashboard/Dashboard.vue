<!-- src/pages/common/dashboard/Dashboard.vue -->
<script setup>
import { onMounted, ref } from 'vue'

import Chart from 'chart.js/auto'

// 선형 그래프
const lineChartRef = ref(null)
// 도넛 그래프 ref 추가
const semiDoughnutRef = ref(null)

onMounted(() => {

  // 선형 그래프
  new Chart(lineChartRef.value, {
    type: 'line',
    data: {
      labels: ['2021', '2022.1분기', '2022.2분기', '2022.3분기', '2022'],
      datasets: [{
        data: [66, 70, 69.5, 72, 74.6],
        fill: true,
        tension: 0.3,
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(34, 211, 238, 0.2)',
      }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          min: 60,
          max: 80,
          ticks: { stepSize: 2 }
        }
      }
    }
  })


  new Chart(semiDoughnutRef.value, {
    type: 'doughnut',
    data: {
      labels: ['점수', '남은 영역'],
      datasets: [{
        data: [74.6, 100 - 74.6],
        backgroundColor: ['#4ade80', '#e5e7eb'], // 초록, 회색
        borderWidth: 0,
      }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      cutout: '80%',
      rotation: -90,
      circumference: 180,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  })



})
</script>

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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- 도넛 그래프 -->
      <div class="bg-white p-6 rounded-2xl shadow">
        <p class="text-gray-700 text-sm font-semibold mb-2">ESG 진단 점수</p>

        <!-- 반응형 도넛 그래프 (% 기준) -->
        <div class="relative w-full flex justify-center items-center">
          <canvas ref="semiDoughnutRef" style="max-height: 300px;"></canvas>

          <!-- 가운데 점수 텍스트 -->
          <div class="absolute text-green-500 font-bold" style="font-size: clamp(1rem, 2vw, 1.5rem); top: 90%;">
            74.6
          </div>
        </div>

        <h2 class="mt-2 text-pink-500 text-sm">타업체대비 8.5점 높아요!</h2>
      </div>


      <!-- 점수 변화 추이 -->
      <div class="bg-white p-6 rounded-2xl shadow" style="height: 410px;">
        <p class="text-gray-700 font-semibold mb-2">점수 변화 추이</p>
        <canvas ref="lineChartRef"></canvas>
      </div>
    </div>

    <!-- 이달의 사원 -->
    <div class="bg-white shadow p-4 rounded mb-6">
      <h2 class="text-lg font-semibold mb-4">이달의 사원</h2>
      <div class="flex justify-between text-center">
        <div style="display: flex; gap: 10px;">
          <div>🥇</div>
          <div>홍길동</div>
          <div>코멘트 갯수 :</div>
          <div>100</div>
        </div>
        <div class="flex gap-2.5">
          <div>🥈</div>
          <div>임꺽정</div>
          <div>코멘트 갯수 :</div>
          <div>99</div>
        </div>
        <div class="flex gap-2.5">
          <div>🥉</div>
          <div>너구리</div>
          <div>코멘트 갯수 :</div>
          <div>98</div>
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



<style scoped>
/* 필요 시 커스텀 스타일 */
</style>