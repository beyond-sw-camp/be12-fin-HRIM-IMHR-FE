<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto py-8">
    <!-- 환경 점수 카드 -->
    <div class="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center transition hover:scale-105 hover:shadow-lg">
      <p class="text-sm text-gray-500 mb-1">2022</p>
      <p class="text-4xl font-bold text-green-600 mb-2">74.6</p>
      <p class="text-base font-medium text-slate-700">환경 점수 (E)</p>
    </div>

    <!-- 환경 점수 변화 차트 -->
    <div class="bg-white rounded-2xl shadow-md p-6 flex items-center justify-center transition hover:scale-105 hover:shadow-lg">
      <canvas ref="chartRef" class="w-full h-40"></canvas>
    </div>

    <!-- 기준 대비 카드 -->
    <div class="bg-green-100 rounded-2xl shadow-md p-8 text-center transition hover:scale-105 hover:shadow-lg">
      <p class="text-sm text-gray-600 mb-1">기준대비 <span class="text-green-600 font-semibold">+1.1%</span></p>
      <p class="text-3xl font-bold text-green-800 mb-2">55.2</p>
      <p class="text-sm text-slate-700">환경 Environmental</p>
    </div>
  </div>

  <div class="min-h-screen bg-gray-50 px-6 py-10">
    <h1 class="text-2xl font-bold text-center text-slate-800 mb-10">친환경 제품 리스트</h1>

    <!-- 검색창 -->
    <div class="max-w-2xl mx-auto bg-white p-4 rounded-md shadow-md flex items-center gap-3 mb-8">
      <Search color="black" :size="30" />
      <input v-model="search" type="text" placeholder="검색어를 입력하세요"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" />
      <button @click="onSearch" class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition">
        검색
      </button>
    </div>

    <!-- 제품 테이블 -->
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
          <tr v-for="(product, index) in filteredProducts" :key="product.idx"
            class="border-b hover:bg-slate-50 transition cursor-pointer" @click="goToDetail(product.idx)">
            <td class="p-3">{{ product.idx }}</td>
            <td class="p-3">{{ product.productName }}</td>
            <td class="p-3">{{ product.serialNumber }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 등록 버튼 -->
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
import { Search, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import Chart from 'chart.js/auto'
import { useProductStore, calculateScore } from '../../stores/useProductStore'

const chartRef = ref(null)
const search = ref('')
const store = useProductStore()
const route = useRoute()
const router = useRouter()
const companyIdx = route.params.idx
const userRole = 'manager' // 실제 상황에 맞게 변경 필요

onMounted(async () => {
  await store.listByCompany(companyIdx)

  const labels = store.productList.map(p => p.productName)
  const scores = store.productList.map(p => calculateScore(p))

  new Chart(chartRef.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: '환경 점수',
        data: scores,
        backgroundColor: '#16a34a'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '점수'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom'
        }
      }
    }
  })
})

const filteredProducts = computed(() => {
  return store.productList.filter(
    (p) =>
      p.productName?.toLowerCase().includes(search.value.toLowerCase()) ||
      String(p.idx).includes(search.value)
  )
})

const onSearch = () => {
  console.log("🔍 검색어:", search.value)
}

const goToDetail = (idx) => {
  router.push({
    name: 'productDetail',
    params: {
      company_idx: String(companyIdx),
      idx: String(idx)
    }
  })
}
</script>