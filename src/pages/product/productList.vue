<template>
  <!-- 📊 상단: 등급 카드 + 차트 + 평균 카드 가로 정렬 -->
  <div class="px-6 grid grid-cols-1 md:grid-cols-1 gap-8 max-w-6xl mx-auto py-8">
    <div class="flex flex-col md:flex-row gap-6 justify-center items-center">

      <!-- ⬅️ 환경 등급 카드
      <div class="bg-green-100 rounded-2xl shadow-md p-8 text-center w-60">
        <p class="text-3xl font-bold text-green-800 mb-2">{{ eScore }} 등급</p>
        <p class="text-sm text-slate-700">환경 Environmental</p>
      </div> -->

      <!-- 🎯 친환경 점수 차트 (가운데) -->
      <div class="bg-white rounded-2xl shadow-md p-6 flex items-center justify-center w-full max-w-2xl">
        <canvas ref="chartRef" class="w-full h-80"></canvas>
      </div>

      <!-- ➡️ 평균 친환경 점수 카드 -->
      <div class="bg-blue-100 rounded-2xl shadow-md p-8 text-center w-60 cursor-pointer hover:bg-blue-200 transition"
        @click="showDonutModal = true">
        <p class="text-3xl font-bold text-blue-800 mb-2">{{ avgScore }} 점</p>
        <p class="text-sm text-slate-700">평균 친환경 점수</p>
      </div>
    </div>
  </div>

  <!-- 📊 도넛 차트 모달 -->
<div v-if="showDonutModal" class="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
  <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
    <button @click="showDonutModal = false" class="absolute top-3 right-3 text-slate-500 hover:text-slate-700">✖</button>
    <h3 class="text-lg font-semibold mb-4 text-center">제품별 친환경 점수 (도넛 차트)</h3>
    <canvas ref="donutRef" class="w-full h-96"></canvas>
  </div>
</div>


  <!-- 📋 제품 리스트 테이블 -->
  <div class="min-h-screen bg-gray-50 px-6 py-10">
    <h1 class="text-2xl font-bold text-center text-slate-800 mb-10">친환경 제품 리스트</h1>

    <!-- 🔍 검색창 -->
    <div class="max-w-2xl mx-auto bg-white p-4 rounded-md shadow-md flex items-center gap-3 mb-8">
      <Search color="black" :size="30" />
      <input v-model="search" type="text" placeholder="검색어를 입력하세요"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" />
      <button @click="onSearch" class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition">
        검색
      </button>
    </div>

    <!-- 📑 제품 테이블 -->
    <div class="overflow-x-auto bg-white rounded-lg shadow max-w-5xl mx-auto">
      <table class="w-full border-collapse text-sm text-center text-slate-800">
        <thead class="bg-slate-100 border-b text-slate-700">
          <tr>
            <th class="p-3">제품 번호</th>
            <th class="p-3">제품명</th>
            <th class="p-3">시리얼 넘버</th>
            <th class="p-3">친환경 점수</th>
          </tr>
        </thead>
        <tbody>
          <!-- ❌ 검색 결과 없을 때 -->
          <tr v-if="paginatedProducts.length === 0">
            <td colspan="3" class="py-4 text-slate-400">검색 결과가 없습니다.</td>
          </tr>
          <!-- ✅ 제품 리스트 출력 -->
          <tr v-for="product in paginatedProducts" :key="product.idx"
            class="border-b hover:bg-slate-50 transition cursor-pointer" @click="goToDetail(product.idx)">
            <td class="p-3">{{ product.idx }}</td>
            <td class="p-3">{{ product.productName }}</td>
            <td class="p-3">{{ product.serialNumber }}</td>
            <td class="px-4 py-2 border font-semibold text-green-700">{{ calculateScore(product) }} 점</td>
            <!-- ✅ 점수 표시 -->
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ◀️▶️ 이전/다음 버튼 -->
    <div class="flex justify-center gap-4 mt-6">
      <button :disabled="currentPage === 1" @click="currentPage--"
        class="px-4 py-2 bg-slate-800 text-white rounded disabled:opacity-50">← 이전</button>
      <button :disabled="currentPage === totalPages" @click="currentPage++"
        class="px-4 py-2 bg-slate-800 text-white rounded disabled:opacity-50">다음 →</button>
    </div>

    <!-- ➕ 제품 등록 버튼 -->
    <div class="max-w-5xl mx-auto flex justify-end mt-6">
      <router-link v-if="userRole === 'manager'"
        :to="{ path: '/productRegist', query: { mode: 'create', companyIdx: companyIdx } }">
        <button class="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-900 transition">
          등록
        </button>
      </router-link>
    </div>
  </div>

  <!-- 🔽 친환경 점수 기준표 (토글 버튼) -->
  <div class="max-w-4xl mx-auto text-center mb-8">
    <button @click="showScoreTable = !showScoreTable"
      class="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition">
      {{ showScoreTable ? '기준표 닫기' : '📊 친환경 점수 기준 보기' }}
    </button>

    <div v-if="showScoreTable" class="mt-4 bg-white border rounded-xl shadow-md p-6 overflow-x-auto">
      <table class="w-full table-auto text-left text-sm border-collapse">
        <thead class="bg-slate-100 text-slate-700 font-semibold">
          <tr>
            <th class="px-4 py-2 border">항목</th>
            <th class="px-4 py-2 border">점수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="px-4 py-2 border">재활용 가능 여부</td>
            <td class="px-4 py-2 border">+30</td>
          </tr>
          <tr>
            <td class="px-4 py-2 border">생분해/친환경 원료</td>
            <td class="px-4 py-2 border">+20</td>
          </tr>
          <tr>
            <td class="px-4 py-2 border">탄소 저감형 공정</td>
            <td class="px-4 py-2 border">+25</td>
          </tr>
          <tr>
            <td class="px-4 py-2 border">에너지 효율 등급</td>
            <td class="px-4 py-2 border">1등급 +20 / 2등급 +10 / 3등급 +5</td>
          </tr>
          <tr>
            <td class="px-4 py-2 border">단가(가격)</td>
            <td class="px-4 py-2 border">최대 +100 (낮을수록 가산점)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Search } from 'lucide-vue-next'
import Chart from 'chart.js/auto'
import { useProductStore, calculateScore, shortenProductName } from '../../stores/useProductStore'
import { useScoreStore } from '../../stores/useScoreStore'

// 📌 상태 정의
const chartRef = ref(null)
const search = ref('')
const store = useProductStore()
const scoreStore = useScoreStore()
const route = useRoute()
const router = useRouter()
const companyIdx = route.params.idx
const userRole = 'manager'
const eScore = ref(null)
const currentPage = ref(1)
const itemsPerPage = 5
const showScoreTable = ref(false) // ✅ 점수 기준표 표시 여부
const showDonutModal = ref(false)  // 도넛 모달 토글 상태
const donutRef = ref(null)         // 도넛 차트 ref


// ✅ 페이지 마운트 시 제품 목록 불러오기 + 차트 렌더링
onMounted(async () => {
  eScore.value = await scoreStore.eScore(companyIdx)
  await store.listByCompany(companyIdx)

  await nextTick() // 🔁 DOM 완성 후 차트 렌더링

  const labels = store.productList.map(p => shortenProductName(p.productName))
  const scores = store.productList.map(p => calculateScore(p))

  if (chartRef.value && scores.length > 0) {
    new Chart(chartRef.value, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: '환경 점수',
          data: scores,
          backgroundColor: ['#4ade80', '#86efac', '#bbf7d0'],
          borderRadius: 8,
          barThickness: 30,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        layout: { padding: 20 },
        scales: {
          x: {
            title: { display: true, text: '점수', font: { size: 16, weight: 'bold' } },
            ticks: { stepSize: 20 },
            grid: { color: '#e2e8f0', borderDash: [5, 5] }
          },
          y: {
            ticks: { font: { size: 14, weight: 'bold' }, color: '#334155' },
            grid: { display: false }
          }
        },
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: '제품별 친환경 점수',
            font: { size: 18, weight: 'bold' },
            color: '#0f172a',
            padding: { bottom: 20 }
          }
        }
      }
    })
  }
})

watchEffect(() => {
  if (showDonutModal.value && donutRef.value) {
    const labels = store.productList.map(p => shortenProductName(p.productName))
    const scores = store.productList.map(p => calculateScore(p))
    const max = Math.max(...scores)
    const min = Math.min(...scores)

    new Chart(donutRef.value, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data: scores,
          backgroundColor: scores.map(score =>
            score === max ? '#22c55e' : score === min ? '#f87171' : '#4ade80'
          ),
          borderWidth: 1
        }]
      },
      options: {
        cutout: '60%',
        plugins: {
          legend: { position: 'bottom' },
          title: {
            display: true,
            text: '친환경 점수 분포',
            font: { size: 16 }
          }
        }
      }
    })
  }
})

// 🔎 필터링된 리스트
const filteredProducts = computed(() =>
  store.productList.filter(p =>
    p.productName?.toLowerCase().includes(search.value.toLowerCase()) ||
    String(p.idx).includes(search.value)
  )
)

// 📄 페이징 처리된 리스트
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
})

// 📈 평균 점수
const avgScore = computed(() => {
  const total = store.productList.reduce((sum, p) => sum + calculateScore(p), 0)
  return store.productList.length ? Math.round(total / store.productList.length) : 0
})

// 🔍 검색 시 페이지 초기화
const onSearch = () => {
  currentPage.value = 1
}

// 👉 상세 페이지 이동
const goToDetail = (idx) => {
  router.push({ name: 'productDetail', params: { company_idx: String(companyIdx), idx: String(idx) } })
}
</script>
