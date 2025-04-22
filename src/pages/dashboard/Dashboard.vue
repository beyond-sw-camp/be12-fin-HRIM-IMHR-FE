<script setup>
import { ref, computed, onMounted } from "vue";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-vue-next";
import Chart from "chart.js/auto";

const showKPI = ref(false);
const showEval = ref(false)

const kpiTable = [
  {
    esg: "환경(E)",
    kpi: "온실가스 배출량 (Scope 1&2)",
    desc: "직·간접 온실가스 배출량 (톤 CO2e)",
  },
  { esg: "환경(E)", kpi: "에너지 사용량", desc: "회사 전체 에너지 총 사용량" },
  {
    esg: "환경(E)",
    kpi: "재생에너지 사용 비율 (%)",
    desc: "전체 에너지 대비 재생에너지 사용 비율",
  },
  {
    esg: "환경(E)",
    kpi: "친환경 교육 이수율",
    desc: "직원 대상 환경 관련 교육 참여율",
  },
  {
    esg: "환경(E)",
    kpi: "출장 시 친환경 교통수단 선택 비율",
    desc: "출장 시 친환경 수단(전기차/대중교통 등) 선택률",
  },
  {
    esg: "사회(S)",
    kpi: "여성 임직원 비율 (%)",
    desc: "전체 직원 중 여성 비율",
  },
  {
    esg: "사회(S)",
    kpi: "장애인 고용률",
    desc: "장애인 고용 비율 (법정 기준 대비)",
  },
  {
    esg: "사회(S)",
    kpi: "신규 채용 성과 (채용 인원/목표)",
    desc: "분기별 채용 목표 대비 실제 채용 인원",
  },
  { esg: "사회(S)", kpi: "정규직 전환율", desc: "계약직 → 정규직 전환 비율" },
  {
    esg: "사회(S)",
    kpi: "직원 만족도 점수",
    desc: "사내 만족도 설문 평균 점수",
  },
];

const evalTable = [
  { category: "환경(E)", activity: "친환경 교육 100% 이수", criteria: "연간 1회 이상 이수", score: "가점 +3" },
  { category: "환경(E)", activity: "환경개선 아이디어 제안", criteria: "제안서 1건 이상 제출", score: "가점 +2" },
  { category: "사회(S)", activity: "사회공헌(봉사) 활동 연 1회 이상 참여", criteria: "자원봉사 1회 이상", score: "가점 +3" },
  { category: "사회(S)", activity: "다양성·인권 교육 참여", criteria: "교육 이수 증빙 제출", score: "가점 +2" },
  { category: "사회(S)", activity: "직무 관련 ESG 공모전/캠페인 참여", criteria: "사내외 ESG 행사 참여 확인", score: "가점 +2" },
  { category: "지배구조(G)", activity: "윤리경영 교육 이수", criteria: "정기교육 이수 여부", score: "가점 +2" },
  { category: "지배구조(G)", activity: "내부 제보(비리/인권 침해 등)", criteria: "제보 시스템 이용 및 후속조치", score: "가점 +5" },
]

const esgData = [
  { label: "E", value: 55.2, color: "#D1FAE5" },
  { label: "S", value: 73.9, color: "#DBEAFE" },
  { label: "G", value: 80.6, color: "#EDE9FE" },
];

const employees = [
  { name: "홍길동", comments: 100 },
  { name: "임꺽정", comments: 99 },
  { name: "너구리", comments: 98 },
];

const departments = [
  "경영, 전략 부서",
  "영업, 마케팅 부서",
  "연구, 개발 부서",
  "생산, 품질관리 부서",
  "인사총무, 지원 부서",
  "ESG 부서",
  "재무 부서",
  "기획 부서",
  "IT 부서",
  "고객지원 부서",
];

const itemsPerPage = 10;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(departments.length / itemsPerPage));
const paginatedDepartments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return departments.slice(start, start + itemsPerPage);
});

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

const trends = [
  {
    percent: 1.1,
    title: "환경 Environmental",
    score: 55.2,
    diff: 1.1,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    percent: 40,
    title: "사회 Social",
    score: 73.9,
    diff: 1.77,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    percent: 47,
    title: "지배구조 Governance",
    score: 80.6,
    diff: 2.8,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
];

function createGaugeChart(ctx, value, color) {
  return new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["점수", "남은 비율"],
      datasets: [
        {
          data: [value, 100 - value],
          backgroundColor: [color, "#F4F4F4"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      rotation: -90,
      cutout: "70%",
      circumference: 180,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

onMounted(() => {
  esgData.forEach((item) => {
    const ctx = document.getElementById(`chart${item.label}`);
    createGaugeChart(ctx, item.value, item.color);
  });

  new Chart(document.getElementById("gaugeChart"), {
    type: "doughnut",
    data: {
      labels: ["참여율", "남은 비율"],
      datasets: [
        {
          data: [74.6, 100 - 74.6],
          backgroundColor: ["#4ade80", "#e5e7eb"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      rotation: -90,
      circumference: 180,
      cutout: "70%",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
    },
  });

  new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: ["E", "S", "G"],
      datasets: [
        {
          label: "참여율",
          data: [74.6, 74.6, 74.6],
          backgroundColor: ["#D1FAE5", "#DBEAFE", "#EDE9FE"],
          barThickness: 40,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { color: "#6b7280" },
        },
        x: {
          ticks: { color: "#0000" },
        },
      },
      plugins: {
        legend: { display: false },
        customLabelColor: {
          colors: ["#D1FAE5", "#DBEAFE", "#EDE9FE"],
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
    plugins: [
      {
        id: "customLabelColor",
        afterDraw: (chart) => {
          const { ctx, chartArea, scales } = chart;
          const xAxis = scales.x;
          const yBottom = chartArea.bottom + 20;
          const labels = chart.data.labels;
          const colors = chart.options.plugins.customLabelColor.colors;
          labels.forEach((label, i) => {
            const x = xAxis.getPixelForTick(i);
            ctx.fillStyle = colors[i];
            ctx.font = "bold 14px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(label, x, yBottom);
          });
        },
      },
    ],
  });
});
</script>

<template>
  <div class="bg-gray-50 p-6 font-sans max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">
      기업 ESG

      <span class="items-center space-x-4 time-center text-gray-500 font-semibold">
        <button class="hover:text-black transition">
          <ChevronLeft class="w-6 h-6 align-middle"/>
        </button>

        <span class="text-3xl text-gray-500">2025</span>

        <button class=" w-6 h-6 hover:text-black transition">
          <ChevronRight/>
        </button>
      </span>
    </h1>
    
    

    <!-- ESG 요약 -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div
        v-for="(item, index) in esgData"
        :key="index"
        class="bg-white p-4 rounded-xl shadow h-40 flex items-center justify-center relative"
      >
        <canvas :id="`chart${item.label}`" class="w-24 h-24"></canvas>
        <div
          class="flex absolute bottom-2 text-center text-xl font-semibold"
          :style="{ color: item.color }"
        >
          {{ item.label }} :
          <div class="text-gray-300 ml-2">{{ item.value }}</div>
        </div>
      </div>
    </div>

    <!-- 이달의 사원 -->
    <div class="bg-white shadow p-4 rounded mb-6 mt-6">
      <h2 class="text-lg font-semibold mb-4">이달의 사원</h2>
      <div class="flex justify-between text-center">
        <div
          v-for="(employee, index) in employees"
          :key="index"
          style="display: flex; gap: 10px"
        >
          🥇 {{ employee.name }} 코멘트 개수: {{ employee.comments }}
        </div>
      </div>
    </div>

    <div class="flex gap-4 max-w-6xl mx-auto w-full items-stretch">
      <!-- 왼쪽: 부서 리스트 -->
      <div
        class="bg-white rounded-xl shadow p-2 text-sm w-48 shrink-0 flex flex-col justify-between"
      >
        <div>
          <h3 class="font-bold mb-3 text-gray-700">부서별 ESG</h3>
          <ul
            class="divide-y divide-gray-200 border rounded-md overflow-hidden"
          >
            <li
              v-for="(dept, index) in paginatedDepartments"
              :key="index"
              class="px-3 py-2 hover:bg-gray-50 flex items-center gap-2"
            >
              📁 {{ dept }}
            </li>
          </ul>
        </div>
        <div class="flex justify-between mt-2 text-xs text-gray-600">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="hover:underline disabled:opacity-30"
          >
            이전
          </button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="hover:underline disabled:opacity-30"
          >
            다음
          </button>
        </div>
      </div>

      <!-- 가운데: 참여율 + 그래프 -->
      <div
        class="bg-white rounded-xl shadow p-4 relative flex-1 min-w-0 flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-lg">전체 참여율</h3>
            <span
              class="flex items-center justify-center space-x-4 text-gray-500 text-2xl font-semibold"
            >
              <button class="hover:text-black transition">&lsaquo;</button>
              <span>2025.01</span>
              <button class="hover:text-black transition">&rsaquo;</button>
            </span>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-48 h-48 relative mb-4">
              <canvas
                id="gaugeChart"
                class="absolute top-0 left-0 w-full h-full"
              ></canvas>
              <div
                class="absolute inset-0 flex items-end justify-center pb-10 text-lg font-semibold text-green-600"
              >
                74.6
              </div>
            </div>
            <div class="w-full h-40">
              <canvas id="barChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- 오른쪽: ESG 점수 -->
      <div class="flex flex-col space-y-4 w-80 shrink-0">
        <h2><strong>영역별 점수 변동 추이</strong></h2>
        <div
          v-for="(trend, index) in trends"
          :key="index"
          :class="`p-4 rounded-xl shadow ${trend.bg}`"
        >
          <p class="text-xs text-gray-600 mb-1">
            기준대비 {{ trend.percent }}%
          </p>
          <h4 :class="`font-bold ${trend.color}`">{{ trend.title }}</h4>
          <p class="text-2xl font-semibold">{{ trend.score }}</p>
          <p class="text-sm text-gray-500">전년대비 ▲ {{ trend.diff }}</p>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <button
        @click="showKPI = !showKPI"
        class="flex items-center gap-1 text-sm text-slate-600 underline mb-2"
      >
        <span>KPI 정의표 {{ showKPI ? "닫기" : "보기" }}</span>
        <component :is="showKPI ? ChevronUp : ChevronDown" class="w-4 h-4" />
      </button>

      <div
        v-if="showKPI"
        class="bg-white p-4 rounded-xl shadow text-sm overflow-auto"
      >
        <table class="table-auto w-full border border-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-4 py-2 text-left">ESG 영역</th>
              <th class="border px-4 py-2 text-left">KPI 항목</th>
              <th class="border px-4 py-2 text-left">설명</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in kpiTable"
              :key="index"
              class="hover:bg-gray-50"
            >
              <td class="border px-4 py-2">{{ row.esg }}</td>
              <td class="border px-4 py-2">{{ row.kpi }}</td>
              <td class="border px-4 py-2">{{ row.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mt-10">
      <button
        @click="showEval = !showEval"
        class="flex items-center gap-1 text-sm text-slate-600 underline mb-2"
      >
        <span>인사 평가 기준 표 {{ showEval ? "닫기" : "보기" }}</span>
        <component :is="showEval ? ChevronUp : ChevronDown" class="w-4 h-4" />
      </button>

      <div
        v-if="showEval"
        class="bg-white p-4 rounded-xl shadow text-sm overflow-auto"
      >
        <table class="table-auto w-full border border-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-4 py-2">구분</th>
              <th class="border px-4 py-2">ESG 활동 항목</th>
              <th class="border px-4 py-2">평가기준 예시</th>
              <th class="border px-4 py-2">인사평가 반영 방법</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in evalTable"
              :key="index"
              class="hover:bg-gray-50"
            >
              <td class="border px-4 py-2">{{ item.category }}</td>
              <td class="border px-4 py-2">{{ item.activity }}</td>
              <td class="border px-4 py-2">{{ item.criteria }}</td>
              <td class="border px-4 py-2">{{ item.score }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
</style>