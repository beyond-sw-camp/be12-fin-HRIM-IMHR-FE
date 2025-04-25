<script setup>
import { ref, computed, onMounted, watch } from "vue";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import Chart from "chart.js/auto";
import { useRoute } from "vue-router";
import { useCompanyStore } from "../../stores/useCompanyStore";
import { useDepartmentStore } from "../../stores/useDepartmentStore";

const props = defineProps({
  departmentName: String,
  yearMonth: String,
});

const route = useRoute();
const companyStore = useCompanyStore();
const departmentStore = useDepartmentStore();
const departmentScoreData = ref(null);

// 년도 월 전달 변수
const today = new Date();
const year = ref(today.getFullYear());
const month = ref(today.getMonth() + 1);

const showEval = ref(false);

const companyName = ref("");
const departmentList = ref([]);
const memberscores = ref([]);
const departmentIdx = ref(null);

function changeMonth(diff) {
  // diff: -1(이전 달), +1(다음 달)
  let newMonth = month.value + diff;
  let newYear = year.value;

  if (newMonth < 1) {
    newMonth = 12;
    newYear -= 1;
  } else if (newMonth > 12) {
    newMonth = 1;
    newYear += 1;
  }

  year.value = newYear;
  month.value = newMonth;
  fetchData(); // 월이 바뀔 때마다 데이터 요청
}

async function fetchData() {
  const companyScoreData = await companyStore.companyScore(year.value, month.value);
  memberscores.value = companyScoreData.memberScores;
  departmentList.value = companyScoreData.departments;
  companyName.value = companyScoreData.companyName;

  // 현재 부서명에 해당하는 idx 찾기
  const matchedDept = departmentList.value.find(
    (dept) => dept.name === route.params.departmentName
  );
  if (matchedDept) {
    departmentStore.departmentIdx = matchedDept.idx;
  } else {
    departmentStore.departmentIdx = null;
  }

  // departmentIdx가 있으면 파라미터에 포함
  const params = {
    year: year.value,
    month: month.value,
    ...(departmentStore.departmentIdx != null && {
      departmentIdx: departmentStore.departmentIdx,
    }),
  };
  const departmentMonthData = await departmentStore.departmentmonth(params);
  departmentScoreData.value = departmentMonthData;
  console.log(departmentScoreData.value.departmentTotalScore);
}

const totalData = computed(() => {
  if (!departmentScoreData.value) return "";
  return departmentScoreData.value.departmentTotalScore ?? "";
});

const esgData = computed(() => {
  if (!departmentScoreData.value) return [];

  return [
    {
      label: "E",
      value: departmentScoreData.value.departmentEScore,
      color: "#D1FAE5",
    },
    {
      label: "S",
      value: departmentScoreData.value.departmentSScore,
      color: "#DBEAFE",
    },
    {
      label: "G",
      value: departmentScoreData.value.departmentGScore,
      color: "#EDE9FE",
    },
  ];
});

const trends = computed(() => {
  if (!departmentScoreData.value) return [];

  return [
    {
      percent: 0, // 추후 변동값 계산용
      title: "환경 Environmental",
      score: departmentScoreData.value.departmentEScore,
      diff: 0, // 이전 값 비교해서 계산할 수도 있음
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      percent: 0,
      title: "사회 Social",
      score: departmentScoreData.value.departmentSScore,
      diff: 0,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      percent: 0,
      title: "지배구조 Governance",
      score: departmentScoreData.value.departmentGScore,
      diff: 0,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
  ];
});

const itemsPerPage = 10;
const currentPage = ref(1);

const totalPages = computed(() =>
  Math.ceil(departmentList.length / itemsPerPage)
);

// const paginatedDepartments = computed(() => {
//   const start = (currentPage.value - 1) * itemsPerPage;
//   return departmentList.slice(start, start + itemsPerPage);
// });

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

watch(
  () => [route.params.departmentName, route.params.yearMonth],
  ([newDept, newYearMonth], [oldDept, oldYearMonth]) => {
    // 파라미터가 바뀌면 데이터 다시 불러오기
    if (newDept !== oldDept || newYearMonth !== oldYearMonth) {
      // year, month 값을 파싱해서 세팅
      if (newYearMonth) {
        const [y, m] = newYearMonth.split("-").map(Number);
        year.value = y;
        month.value = m;
      }
      // 부서명도 세팅
      fetchData();
    }
  }
);


onMounted(() => {
  fetchData().then(() => {
    // canvas 렌더링 이후 실행되어야 안전함
    esgData.value.forEach((item) => {
      const ctx = document.getElementById(`chart${item.label}`);
      if (ctx) {
        createGaugeChart(ctx, item.value, item.color);
      }
    });

    const gaugeCtx = document.getElementById("gaugeChart");
    if (gaugeCtx) {
      createGaugeChart(gaugeCtx, 74.6, "#86EFAC"); // 전체 참여율
    }
  });
});

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

const evalTable = [
  {
    category: "환경(E)",
    activity: "친환경 교육 100% 이수",
    criteria: "연간 1회 이상 이수",
    score: "가점 +3",
  },
  {
    category: "환경(E)",
    activity: "환경개선 아이디어 제안",
    criteria: "제안서 1건 이상 제출",
    score: "가점 +2",
  },
  {
    category: "사회(S)",
    activity: "사회공헌(봉사) 활동 연 1회 이상 참여",
    criteria: "자원봉사 1회 이상",
    score: "가점 +3",
  },
  {
    category: "사회(S)",
    activity: "다양성·인권 교육 참여",
    criteria: "교육 이수 증빙 제출",
    score: "가점 +2",
  },
  {
    category: "사회(S)",
    activity: "직무 관련 ESG 공모전/캠페인 참여",
    criteria: "사내외 ESG 행사 참여 확인",
    score: "가점 +2",
  },
  {
    category: "지배구조(G)",
    activity: "윤리경영 교육 이수",
    criteria: "정기교육 이수 여부",
    score: "가점 +2",
  },
  {
    category: "지배구조(G)",
    activity: "내부 제보(비리/인권 침해 등)",
    criteria: "제보 시스템 이용 및 후속조치",
    score: "가점 +5",
  },
];
</script>

<template>
  <div class="bg-gray-50 p-6 font-sans max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">
      {{ companyName }} ESG

      <span class="items-center space-x-4 time-center text-gray-500 font-semibold">
        <button @click="changeMonth(-1)" class="hover:text-black transition">
          <ChevronLeft class="w-6 h-6 align-middle"/>
        </button>

        <span class="text-3xl text-gray-500">
          {{ year }}.{{ month < 10 ? '0' + month : month }}
        </span>

        <button @click="changeMonth(1)" class=" w-6 h-6 hover:text-black transition">
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
          v-for="(member, idx) in memberscores"
          :key="idx"
          style="display: flex; gap: 10px"
        >
          <span class="text-xl"> 
            {{ idx + 1 }}위
          </span>

          <span class="mt-0.5">"{{ member.memberName }}"의 ESG 평균 점수 : {{ member.averageScore }}

          </span>
           
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
              v-for="(dept, idx) in departmentList"
              :key="idx"
              class="px-3 py-2 hover:bg-gray-50 flex items-center gap-2"
            >
              <router-link  :to="{
                name: 'dashboard-with-department',
                params: {
                  departmentName: dept.name,
                  yearMonth: `${year}-${month < 10 ? '0' + month : month}`,
                }}">

              📁 {{ dept.name }}
              </router-link>
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
            <h3 class="font-bold text-lg">부서 ESG 평균 점수</h3>
          
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
              점수 : {{ totalData }}
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