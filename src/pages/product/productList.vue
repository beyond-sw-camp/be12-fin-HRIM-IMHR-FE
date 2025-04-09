<template>
  <div class="min-h-screen bg-gray-50 px-6 py-10">
    <!-- 제목 -->
    <h1 class="text-2xl font-bold text-center text-slate-800 mb-10">
      친환경 제품 리스트
    </h1>

    <!-- 🔍 검색창 -->
    <div
      class="max-w-2xl mx-auto bg-white p-4 rounded-md shadow-md flex items-center gap-3 mb-8"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="gray"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
        />
      </svg>
      <input
        type="text"
        v-model="search"
        placeholder="제품명 또는 제품번호로 검색"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
      />
      <button
        @click="onSearch"
        class="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-900 transition"
      >
        검색
      </button>
    </div>

    <!-- 📋 제품 테이블 -->
    <div class="overflow-x-auto bg-white rounded-lg shadow max-w-5xl mx-auto">
      <table class="w-full border-collapse text-sm text-center text-slate-800">
        <thead class="bg-slate-100 border-b text-slate-700">
          <tr>
            <th class="p-3 border">순번</th>
            <th class="p-3 border">제품명</th>
            <th class="p-3 border">제품번호</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(product, index) in filteredProducts"
            :key="index"
            class="border-b hover:bg-slate-50 transition"
          >
            <td class="p-3">{{ product.index }}</td>

            <router-link to="/products/1">
              <td class="p-3">
                {{ product.name }}
              </td>
            </router-link>

            <td class="p-3">{{ product.number }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 📄 페이지네이션 -->
    <div class="flex justify-center items-center mt-10 space-x-2 text-sm">
      <button disabled class="text-gray-400 px-2 py-1">← 이전</button>
      <button class="bg-slate-800 text-white px-3 py-1 rounded font-bold">
        1
      </button>
      <button class="hover:underline">2</button>
      <button class="hover:underline">3</button>
      <span class="text-gray-400">...</span>
      <button class="hover:underline">67</button>
      <button class="hover:underline">68</button>
      <button class="text-blue-600 px-2 py-1 hover:underline">다음 →</button>
    </div>


    <router-link to="/productRegist" class="flex justify-end">
      <button class="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-900 transition">등록</button>
    </router-link>
  </div>

</template>

<script setup>
import { ref, computed } from "vue";

const search = ref("");

const products = ref([
  { index: 7, name: "test7", number: "test7" },
  { index: 6, name: "test6", number: "test6" },
  { index: 5, name: "test5", number: "test5" },
  { index: 4, name: "test4", number: "test4" },
  { index: 3, name: "test3", number: "test3" },
  { index: 2, name: "test2", number: "test2" },
  { index: 1, name: "test1", number: "test1" },
  { index: 0, name: "test", number: "test" },
]);

const filteredProducts = computed(() => {
  return products.value.filter(
    (p) => p.name.includes(search.value) || p.number.includes(search.value)
  );
});

const onSearch = () => {
  console.log("검색:", search.value);
};
</script>

<style scoped>
/* Tailwind CSS 사용 중 - 별도 스타일 없음 */
</style>
