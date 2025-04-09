<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold text-slate-800 mb-8 text-center">협력사 리스트</h1>

    <!-- 검색창 -->
    <div
      class="max-w-2xl mx-auto bg-white p-4 rounded-md shadow-md flex items-center gap-3 mb-8"
    >
      <Search color="black" :size="30" />

      <input
        type="text"
        placeholder="검색어를 입력하세요"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
      />

      <button
        class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition"
      >
        검색
      </button>
    </div>

    <!-- 테이블 -->
    <div class="overflow-x-auto bg-white rounded shadow">
      <table class="w-full table-auto text-center">
        <thead class="bg-slate-100 text-slate-700">
        <tr>
          <th class="p-3 border">회사명</th>
          <th class="p-3 border" colspan="4">KCGS</th>
          <th class="p-3 border">IMHR</th>
          <th class="p-3 border"></th>
        </tr>
        <tr>
          <th></th>
          <th class="p-2 border">종합등급</th>
          <th class="p-2 border">환경</th>
          <th class="p-2 border">사회</th>
          <th class="p-2 border">지배구조</th>
          <th class="p-2 border">총점</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(company, index) in pagedData"
            :key="index"
            class="hover:bg-slate-50 border-b"
        >

          <router-link to="/partner/1">
            <td class="p-2">{{ company.name }}</td>
          </router-link>

          <td class="p-2">{{ company.totalGrade }}</td>
          <td class="p-2">{{ company.environment }}</td>
          <td class="p-2">{{ company.social }}</td>
          <td class="p-2">{{ company.governance }}</td>
          <td class="p-2">{{ company.score }}</td>

          <td class="p-2">
            <button
                class="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 transition"
            >
              삭제
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- 페이지네이션 -->
    <div class="flex justify-center items-center mt-6 space-x-2 text-sm">
      <button
          class="px-3 py-1 bg-slate-700 text-white rounded disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="page === 1"
          @click="page--"
      >
        ← 이전
      </button>
      <button
          v-for="p in totalPages"
          :key="p"
          class="px-3 py-1 border rounded"
          :class="{ 'font-bold bg-slate-800 text-white': p === page }"
          @click="page = p"
      >
        {{ p }}
      </button>
      <button
          class="px-3 py-1 bg-slate-700 text-white rounded disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="page === totalPages"
          @click="page++"
      >
        다음 →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search } from "lucide-vue-next";

const search = ref('')
const page = ref(1)
const perPage = 6

const companies = ref([
  { name: 'AJ네트웍스', totalGrade: 'B+', environment: 'C', social: 'A', governance: 'B+', score: 70 },
  { name: 'AK홀딩스', totalGrade: 'A', environment: 'A', social: 'A+', governance: 'B+', score: 72 },
  { name: 'BGF', totalGrade: 'A', environment: 'A', social: 'A+', governance: 'B+', score: 75 },
  { name: 'BGF리테일', totalGrade: 'A', environment: 'A', social: 'A+', governance: 'A', score: 80 },
  { name: 'BNK금융지주', totalGrade: 'A', environment: 'A+', social: 'A+', governance: 'A', score: 80 },
  { name: 'BYC', totalGrade: 'D', environment: 'D', social: 'D', governance: 'C', score: 60 },
])

const filteredData = computed(() => {
  return companies.value.filter(company =>
      company.name.includes(search.value.trim())
  )
})

const pagedData = computed(() => {
  const start = (page.value - 1) * perPage
  return filteredData.value.slice(start, start + perPage)
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / perPage)
})

const onSearch = () => {
  console.log(`검색어: ${search.value}`)
  page.value = 1
}
</script>
