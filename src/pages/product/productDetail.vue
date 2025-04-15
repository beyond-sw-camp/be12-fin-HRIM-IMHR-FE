<template>
  <div class="min-h-screen bg-gray-50 px-6 md:px-24 py-16 flex flex-col text-slate-800">
    <!-- 📌 제목 -->
    <h1 class="text-2xl font-bold text-center text-slate-800 mb-10">
      친환경 제품 상세 보기
    </h1>

    <!-- 📦 상세 내용 영역 -->
    <div class="flex flex-col md:flex-row gap-10 items-start justify-center">
      <!-- 📸 제품 이미지 + 매출 -->
      <div class="flex flex-col items-center bg-white p-6 rounded shadow-md w-full md:w-1/3">
        <img
          :src="product.imagePath || 'https://via.placeholder.com/300x300?text=No+Image'"
          alt="제품 이미지"
          class="w-full h-auto max-w-xs mb-4 rounded-md"
        />
        <p class="text-lg font-semibold">
          친환경 제품 매출 :
          <span class="text-slate-400">{{ totalRevenue }} 만원</span>
        </p>
      </div>

      <!-- 📋 제품 상세 정보 -->
      <div class="flex flex-col bg-white p-6 rounded shadow-md space-y-6 w-full md:w-2/3">
        <div class="border-b pb-2 text-lg">
          <span class="font-bold">제품명</span> :
          <span class="text-slate-500">{{ product.productName }}</span>
        </div>
        <div class="flex flex-col sm:flex-row justify-between text-lg gap-4">
          <div>
            <span class="font-bold">단가</span> :
            <span class="text-slate-500">{{ product.unitPrice?.toLocaleString() }} 원</span>
          </div>
          <div>
            <span class="font-bold">판매수량</span> :
            <span class="text-slate-500">{{ product.salesQty?.toLocaleString() }} 개</span>
          </div>
        </div>

        <!-- 📈 추가 통계 -->
        <div class="border border-slate-200 rounded-lg p-4 space-y-3 bg-slate-50 text-sm">
          <p><span class="font-semibold">환경 인증</span> : {{ product.ecoCertified ? '인증됨' : '미인증' }}</p>
          <hr />
          <p><span class="font-semibold">재활용 여부</span> : {{ product.recyclable ? '가능' : '불가' }}</p>
          <hr />
          <p><span class="font-semibold">생분해 소재</span> : {{ product.bioMaterial ? '사용' : '미사용' }}</p>
          <hr />
          <p><span class="font-semibold">에너지 등급</span> : {{ product.energyGrade }}</p>
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-3 pt-4" v-if="userRole === 'manager'">
      <router-link
        :to="{ path: '/productRegist', query: { mode: 'edit' }, params: { idx: product.idx } }"
        class="px-4 py-1 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50"
      >
        수정
      </router-link>

      <button
        class="px-4 py-1 border-2 border-red-500 text-red-500 rounded hover:bg-red-50"
        @click="handleDelete"
      >
        삭제
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const product = ref({});
const userRole = ref(JSON.parse(localStorage.getItem('userInfo'))?.role || 'manager');
const totalRevenue = ref(0);

const fetchProduct = async () => {
  try {
    const res = await axios.get(`/api/product/detail/${route.params.idx}`);
    product.value = res.data.data;
    totalRevenue.value = Math.floor((product.value.unitPrice || 0) * (product.value.salesQty || 0) / 10000);
  } catch (err) {
    alert('제품 데이터를 불러오는 데 실패했습니다.');
  }
};

const handleDelete = async () => {
  if (confirm("정말 삭제하시겠습니까?")) {
    try {
      await axios.delete(`/api/product/${route.params.idx}`);
      alert("삭제되었습니다.");
      router.push(`/productList/1`); // TODO: 실제 companyIdx로 동적 처리 시 수정
    } catch (err) {
      alert("삭제 실패");
    }
  }
};

onMounted(fetchProduct);
</script>

<style scoped>
</style>