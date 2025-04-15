<template>
  <div class="min-h-screen bg-gray-50 px-6 py-10">
    <h1 class="text-2xl font-bold text-center text-slate-800 mb-10">친환경 제품 리스트</h1>

    <!-- 검색창 -->
    <div class="max-w-2xl mx-auto bg-white p-4 rounded-md shadow-md flex items-center gap-3 mb-8">
      <Search color="black" :size="30" />
      <input
        v-model="search"
        type="text"
        placeholder="검색어를 입력하세요"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
      />
      <button
        @click="onSearch"
        class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition"
      >
        검색
      </button>
    </div>

    <!-- 제품 테이블 -->
    <div class="overflow-x-auto bg-white rounded-lg shadow max-w-5xl mx-auto">
      <table class="w-full border-collapse text-sm text-center text-slate-800">
        <thead class="bg-slate-100 border-b text-slate-700">
          <tr>
            <th class="p-3">순번</th>
            <th class="p-3">제품명</th>
            <th class="p-3">제품번호</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in filteredProducts"
            :key="product.idx"
            class="border-b hover:bg-slate-50 transition cursor-pointer"
            @click="goToDetail(product.idx)"
          >
            <td class="p-3">{{ index + 1 }}</td>
            <td class="p-3">{{ product.productName }}</td>
            <td class="p-3">{{ product.idx }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 페이지네이션 (예시) -->
    <div class="flex justify-center items-center mt-10 space-x-2 text-sm">
      <button disabled class="text-gray-400 px-2 py-1">← 이전</button>
      <button class="bg-slate-800 text-white px-3 py-1 rounded font-bold">1</button>
      <button class="hover:underline">2</button>
      <button class="hover:underline">3</button>
      <span class="text-gray-400">...</span>
      <button class="hover:underline">67</button>
      <button class="hover:underline">68</button>
      <button class="text-blue-600 px-2 py-1 hover:underline">다음 →</button>
    </div>

    <!-- 등록 버튼 -->
    <div class="max-w-5xl mx-auto flex justify-end mt-6">
      <router-link
        v-if="userRole === 'manager'"
        :to="{ path: '/productRegist', query: { mode: 'create' } }"
      >
        <button class="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-900 transition">
          등록
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { Search } from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();
const search = ref('');
const products = ref([]);
const companyIdx = route.params.idx || 1;
const userRole = ref(JSON.parse(localStorage.getItem('userInfo'))?.role || 'manager');

// 🔍 데이터 불러오기
onMounted(async () => {
  try {
    const res = await axios.get(`/api/product/company/${companyIdx}`);
    products.value = res.data.data;
  } catch (err) {
    console.error("제품 목록 조회 실패:", err);
    alert("제품 목록 조회 중 오류가 발생했습니다.");
  }
});

// 🔍 검색 필터
const filteredProducts = computed(() => {
  return products.value.filter(
    (p) =>
      p.productName?.toLowerCase().includes(search.value.toLowerCase()) ||
      String(p.idx).includes(search.value)
  );
});

const onSearch = () => {
  console.log("🔍 검색어:", search.value);
};

// ✅ 상세 보기로 이동
const goToDetail = (productIdx) => {
  router.push({
    name: 'ProductDetail',  // 등록된 라우터 name을 사용하는 게 가장 안전함
    params: { idx: productIdx }
  });
};
</script>

<style scoped>
/* 필요 시 추가 스타일 작성 */
</style>
