<template>
  <div class="flex">


    <!-- Main Content -->
    <main class="flex-1 p-6">
      <header class="flex justify-between items-center mb-6">
        <div class="text-2xl font-semibold">종합분석 <span class="text-gray-500 text-sm">2022</span></div>
      </header>

      <section class="mt-6">
        <h2 class="text-lg font-semibold mb-2">기본정보</h2>
        <div class="bg-white border border-gray-200 rounded shadow p-4 grid grid-cols-6 gap-4 text-sm text-gray-700">
          <div>
            <div class="text-gray-500">회사</div>
            <div class="text-teal-500 font-medium">한화시스템(주)</div>
          </div>
          <div>
            <div class="text-gray-500">무</div>
            <div class="text-teal-500 font-medium">전사</div>
          </div>
          <div>
            <div class="text-gray-500">매출액</div>
            <div class="text-teal-500 font-medium">2,187.405 백만원</div>
          </div>
          <div>
            <div class="text-gray-500">산업군</div>
            <div class="text-teal-500 font-medium">산업&gt;우주항공과국방</div>
          </div>
          <div>
            <div class="text-gray-500">해신 리포트</div>
            <div class="text-teal-500 font-medium">2022</div>
          </div>
          <div>
            <div class="text-gray-500">해신 리포트 생성일</div>
            <div class="text-teal-500 font-medium">2023-03-28</div>
          </div>
        </div>
      </section>

      <section class="mt-6 grid grid-cols-2 gap-4">
        <!-- ESG 점수 (반도넛 차트) -->
        <div class="bg-white p-4 rounded shadow flex flex-col items-center justify-center">
          <div class="text-sm text-gray-500 mb-2">ESG 진단 점수</div>
          <div id="donutWrapper" class="relative w-full max-w-[200px] aspect-[2/1]">
            <canvas ref="donutChart"></canvas>
            <div id="donutCenter" class="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xl font-bold text-green-400">74.6</div>
          </div>
          <div class="text-center text-pink-600 mt-2">타업체대비 8.5점 높아요!</div>
        </div>

        <!-- 점수 변화 추이 -->
        <div class="bg-white p-4 rounded shadow">
          <div class="text-sm text-gray-500 mb-2">점수 변화 추이</div>
          <canvas ref="scoreChart" height="100"></canvas>
        </div>
      </section>

      <!-- 이달의 사원 -->
      <section class="mt-8">
        <h2 class="text-lg font-semibold mb-4">이달의 사원</h2>
      </section>

      <!-- 영역별 점수 변동 추이 -->
      <section class="mt-8">
        <h2 class="text-lg font-semibold mb-4">영역별 점수 변동 추이</h2>
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-green-100 rounded-lg p-4 shadow">
            <div class="text-sm text-gray-600">기준대비 1.1%</div>
            <div class="text-xl font-bold text-green-800">환경 Environmental</div>
            <div class="text-3xl font-bold text-right">55.2</div>
            <div class="text-right text-sm text-gray-500">전년대비 ▲ 1.1</div>
          </div>

          <div class="bg-blue-100 rounded-lg p-4 shadow">
            <div class="text-sm text-gray-600">기준대비 40%</div>
            <div class="text-xl font-bold text-blue-800">사회 Social</div>
            <div class="text-3xl font-bold text-right">73.9</div>
            <div class="text-right text-sm text-gray-500">전년대비 ▲ 17.7</div>
          </div>

          <div class="bg-purple-100 rounded-lg p-4 shadow">
            <div class="text-sm text-gray-600">기준대비 47%</div>
            <div class="text-xl font-bold text-purple-800">지배구조 Governance</div>
            <div class="text-3xl font-bold text-right">80.6</div>
            <div class="text-right text-sm text-gray-500">전년대비 ▲ 2.8</div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

const donutChart = ref(null)
const scoreChart = ref(null)

onMounted(() => {
  new Chart(scoreChart.value.getContext('2d'), {
    type: 'line',
    data: {
      labels: ['2021', '2022.1분기', '2022.2분기', '2022.3분기', '2022'],
      datasets: [{
        label: 'ESG 점수',
        data: [66.1, 70.2, 70.1, 72.0, 74.6],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 60,
          max: 80
        }
      }
    }
  })

  new Chart(donutChart.value.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['점수', '남은 비율'],
      datasets: [{
        data: [74.6, 100 - 74.6],
        backgroundColor: ['#4ade80', '#e5e7eb'],
        borderWidth: 0
      }]
    },
    options: {
      rotation: -90,
      circumference: 180,
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  })
})
</script>

<style scoped>
#donutWrapper canvas {
  width: 100% !important;
  height: auto !important;
}
</style>