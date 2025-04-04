<template>
    <div class="flex font-sans">

        <main class="flex-grow p-8 bg-gray-100 min-h-screen">

            <section class="flex items-center gap-2 mb-4 bg-blue-500 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="white" class="w-6 h-6 ml-2">
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
            <table class="w-full border-collapse bg-white shadow rounded">
                <thead>
                    <tr class="bg-gray-200 text-left">
                        <th class="p-3 border-b">순번</th>
                        <th class="p-3 border-b">제품명</th>
                        <th class="p-3 border-b">제품번호</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in filteredProducts" :key="index" class="hover:bg-gray-100">
                        <td class="p-3 border-b">{{ product.index }}</td>
                        <td class="p-3 border-b">{{ product.name }}</td>
                        <td class="p-3 border-b">{{ product.number }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="flex justify-center items-center mt-8 space-x-2 text-lg">
                <button disabled class="text-gray-400">← 이전</button>
                <button class="bg-black text-white px-2 py-1 rounded">1</button>
                <button>2</button>
                <button>3</button>
                <span>...</span>
                <button>67</button>
                <button>68</button>
                <button class="text-blue-600">다음 →</button>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')

const menu = [
    'ESG 현황',
    'ESG 활동',
    '사내 캠페인',
    'ESG 교육',
    '캘린더',
    '피드백 작성',
    '친환경 제품 추적',
    '협력사 관리',
    '사원 리포트'
]

const products = ref([
    { index: 7, name: 'test7', number: 'test7' },
    { index: 6, name: 'test6', number: 'test6' },
    { index: 5, name: 'test5', number: 'test5' },
    { index: 4, name: 'test4', number: 'test4' },
    { index: 3, name: 'test3', number: 'test3' },
    { index: 2, name: 'test2', number: 'test2' },
    { index: 1, name: 'test1', number: 'test1' },
    { index: 0, name: 'test', number: 'test' }
])

const filteredProducts = computed(() => {
    return products.value.filter(p =>
        p.name.includes(search.value) || p.number.includes(search.value)
    )
})

const onSearch = () => {
    // trigger filter if needed
}
</script>

<style scoped>
/* Tailwind CSS handles styling */
</style>