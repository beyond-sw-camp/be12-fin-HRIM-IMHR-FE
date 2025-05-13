<template>
  <!-- 📊 상단: 등급 카드 + 차트 + 평균 카드 가로 정렬 -->
  <div class="px-6 grid grid-cols-1 md:grid-cols-1 gap-8 max-w-6xl mx-auto py-8">
    <div class="flex flex-col md:flex-row gap-6 justify-center items-center">
      
      <!-- ⬅️ 환경 등급 카드 -->
      <div class="bg-green-100 rounded-2xl shadow-md p-8 text-center w-60">
        <p class="text-3xl font-bold text-green-800 mb-2">{{ eScore }} 등급</p>
        <p class="text-sm text-slate-700">환경 Environmental</p>
      </div>

      <!-- 🎯 친환경 점수 차트 (가운데) -->
      <div class="bg-white rounded-2xl shadow-md p-6 flex items-center justify-center w-full max-w-2xl">
        <canvas ref="chartRef" class="w-full h-80"></canvas>
      </div>

      <!-- ➡️ 평균 친환경 점수 카드 -->
      <div class="bg-blue-100 rounded-2xl shadow-md p-8 text-center w-60">
        <p class="text-3xl font-bold text-blue-800 mb-2">{{ avgScore }} 점</p>
        <p class="text-sm text-slate-700">평균 친환경 점수</p>
      </div>
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
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

// ✅ 페이지 마운트 시 제품 목록 불러오기 + 차트 렌더링
onMounted(async () => {
  eScore.value = await scoreStore.eScore(companyIdx)
  await store.listByCompany(companyIdx)

  const labels = store.productList.map(p => shortenProductName(p.productName))
  const scores = store.productList.map(p => calculateScore(p))

  // 📊 차트 그리기
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
        indexAxis: 'y', // 가로 막대 차트
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

// 검색시 페이지 초기화
const onSearch = () => {
  currentPage.value = 1
}

// 👉 상세 페이지 이동
const goToDetail = (idx) => {
  router.push({ name: 'productDetail', params: { company_idx: String(companyIdx), idx: String(idx) } })
}
</script>
