<template>
    <div class="p-6 bg-white min-h-screen">
        <h1 class="text-2xl font-bold text-blue-500 mb-4">협력사 리스트</h1>
        <section class="flex items-center gap-2 my-12 bg-blue-500 p-2 rounded-full w-1/2 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white"
                class="w-6 h-6 ml-2">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" />
            </svg>
            <input type="text" v-model="search" placeholder="검색어 입력"
                class="flex-1 px-4 py-2 rounded-full focus:outline-none text-black" />
            <button @click="onSearch"
                class="bg-white text-blue-500 font-bold px-6 py-2 rounded-full mr-2 hover:bg-gray-100">
                검색
            </button>
        </section>
        <table class="w-full border text-center">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border p-2">회사명</th>
                    <th class="border p-2" colspan="4">KCGS</th>
                    <th class="border p-2">IMHR</th>
                    <th class="border p-2"></th>
                </tr>
                <tr>
                    <th></th>
                    <th class="border p-2">종합등급</th>
                    <th class="border p-2">환경</th>
                    <th class="border p-2">사회</th>
                    <th class="border p-2">지배구조</th>
                    <th class="border p-2">총점</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(company, index) in pagedData" :key="index">
                    <td class="border p-2">{{ company.name }}</td>
                    <td class="border p-2">{{ company.totalGrade }}</td>
                    <td class="border p-2">{{ company.environment }}</td>
                    <td class="border p-2">{{ company.social }}</td>
                    <td class="border p-2">{{ company.governance }}</td>
                    <td class="border p-2">{{ company.score }}</td>
                    <td class="border p-2">
                        <button class="bg-red-500 text-white px-2 py-1 rounded">삭제</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="flex justify-center mt-12 items-center mt-4 space-x-2">
            <button :disabled="page === 1" @click="page--">← 이전</button>
            <button v-for="p in totalPages" :key="p" @click="page = p" :class="{ 'font-bold': p === page }">{{ p
                }}</button>
            <button :disabled="page === totalPages" @click="page++">다음 →</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

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
    return companies.value.filter(company => company.name.includes(search.value))
})

const pagedData = computed(() => {
    const start = (page.value - 1) * perPage
    return filteredData.value.slice(start, start + perPage)
})

const totalPages = computed(() => {
    return Math.ceil(filteredData.value.length / perPage)
})
</script>

<style scoped>
button[disabled] {
    opacity: 0.4;
    cursor: not-allowed;
}
</style>