<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { useScoreStore } from '../../stores/useScoreStore'
import Chart from 'chart.js/auto'
import ScoreModel from "./grafanaDashboardModal/CompanyScoreModel.vue";

const showScoreModel = ref(false);

const donutChart = ref(null)
const scoreChart = ref(null)
const score = useScoreStore();
const company = ref("")
const route = useRoute();
const idx = route.params.idx;

const yearList = ref([])
const scoreList = ref([])
const environmentList = ref([])
const socialList = ref([])
const governanceList = ref([])

const currentYear = ref(0)
const currentScore = ref(0)
const currentEnvironment = ref(0)
const currentSocial = ref(0)
const currentGovernance = ref(0)

const grafanaPathForModal = ref("");
const scoreValue = ref("");

const handleOpenModal = (type) => {
  console.log("1 - handleOpenModal", company.value, "-", idx.value, "-", currentYear.value, "-", scoreValue.value, "-", grafanaPathForModal.value);

  showScoreModel.value = true;
  company.value = company.value;
  currentYear.value = currentYear.value;

  if (type === "환경") {
    scoreValue.value = "환경 Environmental";
    grafanaPathForModal.value = "c1be1bd2-3665-45b3-a148-483cdce8854d/d6d0334?orgId=1";
  } else if (type === "사회") {
    scoreValue.value = "사회 Social";
    grafanaPathForModal.value = "935c48b8-d261-41cf-ba24-f6d7a5ea9dac/d5d5f59?orgId=1";
  } else if (type === "지배구조") {
    scoreValue.value = "지배구조 Governance";
    grafanaPathForModal.value = "1a687124-ae5f-48ab-83ad-eb36b08611a6/8970653?orgId=1";
  };

  console.log("2 - handleOpenModal", company.value, "-", idx, "-", currentYear.value, "-", scoreValue.value, "-", grafanaPathForModal.value);
}


onUnmounted(() => {
  document.body.style.overflow = 'auto';
})

onMounted(async () => {
  console.log(idx)
  const response = await score.dashboard(idx);
  console.log(response)
  company.value = response.companyName;
  response.changeScoreRsp.forEach(item => {
    yearList.value.push(item.year);
    scoreList.value.push(item.score);
    environmentList.value.push(item.environmentScore);
    socialList.value.push(item.socialScore);
    governanceList.value.push(item.governanceScore);
  });

  currentYear.value = yearList.value[yearList.value.length - 1];
  currentScore.value = scoreList.value[scoreList.value.length - 1];
  currentEnvironment.value = environmentList.value[environmentList.value.length - 1];
  currentSocial.value = socialList.value[socialList.value.length - 1];
  currentGovernance.value = governanceList.value[governanceList.value.length - 1];

  new Chart(scoreChart.value.getContext('2d'), {
    type: 'line',
    data: {
      labels: yearList.value,
      datasets: [{
        label: 'ESG 점수',
        data: scoreList.value,
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
        data: [currentScore.value, 100 - currentScore.value],
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

const prevYear = () => {
  const idx = yearList.value.indexOf(currentYear.value);
  if (idx > 0) {
    currentYear.value = yearList.value[idx - 1];
    currentScore.value = scoreList.value[idx - 1];
    currentEnvironment.value = environmentList.value[idx - 1];
    currentSocial.value = socialList.value[idx - 1];
    currentGovernance.value = governanceList.value[idx - 1];
  }
};

const nextYear = () => {
  const idx = yearList.value.indexOf(currentYear.value);
  if (idx < yearList.value.length - 1) {
    currentYear.value = yearList.value[idx + 1];
    currentScore.value = scoreList.value[idx + 1];
    currentEnvironment.value = environmentList.value[idx + 1];
    currentSocial.value = socialList.value[idx + 1];
    currentGovernance.value = governanceList.value[idx + 1];
  }
};
</script>

<template>
  <div class="mt-2">

    <!-- Main Content -->
    <template v-if="company === null">
      <div class="flex items-center justify-center min-h-screen">
        <div class="text-center space-y-4 px-6 py-10 rounded-xl bg-gray-50 shadow-md">
          <h2 class="text-xl font-semibold text-gray-700">ESG 데이터가 없습니다.</h2>
          <p class="text-gray-500 text-sm">
            해당 회사의 ESG 평가 정보가 아직 등록되지 않았습니다.
          </p>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="flex">
      <main class="flex-1 p-6">
        <header class=" justify-between items-center mb-6">

          <div class="flex text-slate-700 text-3xl font-semibold flex items-center gap-2">
            {{ company }}
            <button class="w-6 h-6 hover:text-black transition" @click="prevYear">
              <ChevronLeft class="w-6 h-6 align-middle" />
            </button>

            <span class="text-3xl text-gray-500">{{ currentYear }}</span>

            <button class="w-6 h-6 hover:text-black transition" @click="nextYear">
              <ChevronRight class="w-6 h-6 align-middle" />
            </button>
          </div>
        </header>

        <section class="mt-6 grid grid-cols-2 gap-4">
          <!-- ESG 점수 (반도넛 차트) -->
          <div class="bg-white p-4 rounded shadow flex flex-col items-center justify-center">
            <div class="text-sm text-gray-500 mb-2">ESG 진단 점수</div>
            <div id="donutWrapper" class="relative w-full max-w-[200px] aspect-[2/1]">
              <canvas ref="donutChart"></canvas>
              <div id="donutCenter"
                class="flex absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xl font-bold text-green-400">
                <div class="mr-1">{{ currentScore }}</div>
                <div class="text-black">점</div>
              </div>
            </div>
            <!-- <div class="text-center text-pink-600 mt-2">타업체대비 8.5점 높아요!</div> -->
          </div>

          <!-- 점수 변화 추이 -->
          <div class="bg-white p-4 rounded shadow">
            <div class="text-sm text-gray-500 mb-2">점수 변화 추이</div>
            <canvas ref="scoreChart" height="100"></canvas>
          </div>
        </section>

        <!-- 영역별 점수 변동 추이 -->
        <section class="mt-8">
          <h2 class="text-lg font-semibold mb-4">영역별 점수 변동 추이</h2>
          <div class="grid grid-cols-3 gap-4" >
            <div class="bg-green-100 rounded-lg p-4 shadow cursor-pointer hover:shadow-md transition" @click="handleOpenModal('환경')">
              <div class="text-xl font-bold text-green-800">환경 Environmental</div>
              <div class="text-3xl font-bold text-right text-gray-500">{{ currentEnvironment }} 등급</div>
              <div class="text-right mt-2 text-sm text-gray-500">전년대비 ▲ 1.1</div>
            </div>

            <div class="bg-blue-100 rounded-lg p-4 shadow cursor-pointer hover:shadow-md transition" @click="handleOpenModal('사회')">
              <div class="text-xl font-bold text-blue-800">사회 Social</div>
              <div class="text-3xl font-bold text-right text-gray-500">{{ currentSocial }} 등급</div>
              <div class="text-right mt-2 text-sm text-gray-500">전년대비 ▲ 17.7</div>
            </div>

            <div class="bg-purple-100 rounded-lg p-4 shadow cursor-pointer hover:shadow-md transition" @click="handleOpenModal('지배구조')">
              <div class="text-xl font-bold text-purple-800">지배구조 Governance</div>
              <div class="text-3xl font-bold text-right text-gray-500">{{ currentGovernance }} 등급</div>
              <div class="text-right mt-2 text-sm text-gray-500">전년대비 ▲ 2.8</div>
            </div>
          </div>
        </section>
      </main>
      </div>
    </template>

    <ScoreModel
    :visible="showScoreModel"
    :grafanaUrl="grafanaPathForModal"
    :year="currentYear"
    :companyIdx="idx"
    :companyName="company"
    :title="scoreValue"
    @close="() => {showScoreModel = false }"
    />
  </div>

</template>

<style scoped>
#donutWrapper canvas {
  width: 100% !important;
  height: auto !important;
}
</style>