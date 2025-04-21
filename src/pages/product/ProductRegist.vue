<template>
  <div class="bg-gray-50 p-10 min-h-screen">
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 class="text-blue-600 font-semibold mb-6 text-xl text-center">
        {{ mode === 'update' ? '제품 수정' : '제품 등록' }}
      </h2>

      <form class="space-y-5" @submit.prevent="handleSubmit">
        <!-- 제품 이름 -->
        <div>
          <label class="block font-medium" for="productName">제품 이름</label>
          <input id="productName" v-model="form.productName" type="text" class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <!-- 시리얼 넘버 -->
        <div>
          <label class="block font-medium" for="serialNumber">시리얼 넘버</label>
          <input id="serialNumber" v-model="form.serialNumber" type="text" class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <!-- 환경 인증 여부 -->
        <div class="flex items-center gap-2">
          <label class="font-medium">환경 인증 여부</label>
          <input v-model="form.ecoCertified" type="checkbox" />
        </div>

        <!-- 환경 인증 타입 -->
        <div>
          <label class="block font-medium" for="certificationType">환경 인증 타입</label>
          <input id="certificationType" v-model="form.certificationType" type="text"
            class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <!-- 에너지 효율 등급 -->
        <div>
          <label class="block font-medium">에너지 효율 등급</label>
          <select v-model="form.energyGrade" class="w-full border rounded px-3 py-2 mt-1">
            <option value="1등급">1등급</option>
            <option value="2등급">2등급</option>
            <option value="3등급">3등급</option>
            <option value="4등급">4등급</option>
            <option value="5등급">5등급</option>
          </select>
        </div>

        <!-- 재활용 가능 여부 -->
        <div class="flex items-center gap-2">
          <label class="font-medium">재활용 가능 여부</label>
          <input v-model="form.recyclable" type="checkbox" />
        </div>

        <!-- 생분해/친환경 원료 -->
        <div class="flex items-center gap-2">
          <label class="font-medium">생분해/친환경 원료</label>
          <input v-model="form.bioMaterial" type="checkbox" />
        </div>

        <!-- 탄소 저감형 공정 여부 -->
        <div class="flex items-center gap-2">
          <label class="font-medium">탄소 저감형 공정 여부</label>
          <input v-model="form.lowCarbonProcess" type="checkbox" />
        </div>

        <!-- 단가 -->
        <div>
          <label class="block font-medium" for="unitPrice">단가</label>
          <input id="unitPrice" v-model.number="form.unitPrice" type="number"
            class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <!-- 판매 수량 -->
        <div>
          <label class="block font-medium" for="salesQty">판매 수량</label>
          <input id="salesQty" v-model.number="form.salesQty" type="number"
            class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <!-- 증가율 -->
        <div>
          <label class="block font-medium" for="growthRate">전월/전분기 증가율</label>
          <input id="growthRate" v-model="form.growthRate" type="text"
            class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <!-- 이미지 업로드 -->
        <div>
          <label class="block font-medium">제품 이미지</label>
          <input type="file" @change="handleFileChange" class="mt-1" />
        </div>

        <!-- 버튼 -->
        <div class="flex justify-end gap-3 pt-4">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
            {{ mode === 'update' ? '수정' : '등록' }}
          </button>

          <button type="button" v-if="mode === 'update'" @click="handleDelete"
            class="px-4 py-2 border-2 border-red-500 text-red-500 rounded hover:bg-red-50">
            삭제
          </button>

          <button type="button" @click="$router.push(`/productList/${form.companyIdx}`)"
            class="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100">
            취소
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../../stores/useProductStore';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const mode = ref(route.query.mode || 'create');
const idx = ref(route.query.idx);
const companyIdx = ref(route.query.companyIdx || route.params.company_idx || null);


const form = reactive({
  productName: '',
  ecoCertified: false,
  certificationType: '',
  energyGrade: '1등급',
  recyclable: false,
  bioMaterial: false,
  lowCarbonProcess: false,
  unitPrice: 0,
  salesQty: 0,
  imagePath: '',
  companyIdx: companyIdx.value || '',
  serialNumber: '',
  growthRate: 0,
});

const imageFile = ref(null);
const handleFileChange = (e) => {
  imageFile.value = e.target.files[0];
};

onMounted(async () => {
  if (mode.value === 'update' && idx.value) {
    try {
      const res = await productStore.detail(idx.value);
      Object.assign(form, res);

      // form.companyIdx가 없을 경우 fallback 설정
      form.companyIdx = res.companyIdx || companyIdx.value;

      console.log('📦 수정용 데이터 로딩 완료:', res);
    } catch (err) {
      console.error('❌ 기존 데이터 불러오기 실패', err);
    }
  } else if (mode.value === 'create') {
    form.companyIdx = companyIdx.value; // 등록 모드일 경우에도 값 넣어줘야 router.push에서 오류 안 남
  }
});


const handleSubmit = async () => {
  if (!imageFile.value && mode.value === 'create') {
    alert('이미지를 선택해주세요.');
    return;
  }

  const dto = {
    productName: form.productName,
    ecoCertified: form.ecoCertified,
    certificationType: form.certificationType,
    energyGrade: form.energyGrade,
    recyclable: form.recyclable,
    bioMaterial: form.bioMaterial,
    lowCarbonProcess: form.lowCarbonProcess,
    unitPrice: form.unitPrice,
    salesQty: form.salesQty,
    companyIdx: form.companyIdx,
    serialNumber: form.serialNumber,
    growthRate: form.growthRate,
  };

  const formData = new FormData();
  formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));
  if (imageFile.value) {
    formData.append('image', imageFile.value);
  }

  try {
    if (mode.value === 'update') {
      await productStore.update(idx.value, formData);
      alert('수정 완료!');
    } else {
      await productStore.regist(formData);
      alert('등록 완료!');
    }
    router.push(`/productList/${form.companyIdx}`);
  } catch (err) {
    console.error('❌ 처리 실패', err);
    alert('저장 중 오류 발생');
  }
};

const handleDelete = async () => {
  if (!confirm('정말 삭제하시겠습니까?')) return;
  try {
    await productStore.delete(idx.value);
    alert('삭제 완료!');
    router.push(`/productList/${form.companyIdx}`);
  } catch (err) {
    alert('삭제 실패');
    console.error(err);
  }
};
</script>
