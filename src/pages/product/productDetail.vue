<template>
  <div class="min-h-screen bg-gray-50 px-6 md:px-24 py-16 flex flex-col text-slate-800">
    <!-- 제목 -->
    <h1 class="text-2xl font-bold text-center mb-10">친환경 제품 상세 보기</h1>

    <!-- 상세 영역 -->
    <div class="flex flex-col md:flex-row gap-10 items-start justify-center">
      <!-- 이미지 + 매출 -->
      <div class="flex flex-col items-center bg-white p-6 rounded shadow-md w-full md:w-1/3">
        <img :src="product.imagePath" alt="제품 이미지" class="w-full h-auto max-w-xs mb-4 rounded-md" />
        <p class="text-lg font-semibold">
          친환경 제품 매출 :
          <span class="text-slate-400">{{ totalRevenue }} 만원</span>
        </p>
      </div>

      <!-- 상세 정보 -->
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

        <!-- 환경 정보 -->
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

    <!-- 버튼 영역 -->
    <div class="flex justify-end gap-3 pt-4" v-if="userRole === 'manager'">
      <router-link
        :to="{ path: '/productRegist', query: { mode: 'update', companyIdx: companyIdx, idx: product.idx } }"
      >
        <button class="px-4 py-1 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50">
          수정
        </button>
      </router-link>
      <button class="px-4 py-1 border-2 border-red-500 text-red-500 rounded hover:bg-red-50" @click="handleDelete">
        삭제
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

// 라우터 객체들
const route = useRoute();
const router = useRouter();

// 파라미터/쿼리
const idx = ref(route.params.idx);
const companyIdx = ref(route.query.companyIdx || route.params.companyIdx);

// 상태
const product = ref({});
const totalRevenue = ref(0);
const userRole = ref(JSON.parse(localStorage.getItem('userInfo'))?.role || 'manager');

// 제품 상세 데이터 가져오기
const fetchProduct = async () => {
  try {
    const res = await axios.get(`/api/product/detail/${idx.value}`);
    product.value = res.data.data;

    // 매출 계산 (만원 단위 반올림)
    totalRevenue.value = Math.floor((product.value.unitPrice || 0) * (product.value.salesQty || 0) / 10000);
  } catch (err) {
    alert('❗ 제품 데이터를 불러오는 데 실패했습니다.');
    console.error(err);
  }
};

// 삭제 기능
const handleDelete = async () => {
  if (confirm("정말 삭제하시겠습니까?")) {
    try {
      await axios.delete(`/api/product/delete/${idx.value}`);
      alert("삭제되었습니다.");

      const fallbackCompanyIdx = companyIdx.value || product.value.companyIdx;
      if (!fallbackCompanyIdx) {
        alert("이동할 회사 ID를 찾을 수 없습니다.");
        return;
      }

      router.push(`/productList/${fallbackCompanyIdx}`);
    } catch (err) {
      alert("❗ 삭제 실패");
      console.error(err);
    }
  }
};


onMounted(fetchProduct);
</script>
