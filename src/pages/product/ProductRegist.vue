<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "../../stores/useProductStore";

const router = useRouter();
const route = useRoute();
const productStore = useProductStore();

const idx = route.params.idx; // 제품 ID
const companyIdx = route.query.companyIdx; // 회사 ID
const mode = ref(route.query.mode || (idx ? "view" : "create"));
const product = ref(route.query.product || {}); // 제품 정보

const form = reactive({
  productName: "",
  ecoCertified: false,
  certificationType: "",
  energyGrade: "1등급",
  recyclable: false,
  bioMaterial: false,
  lowCarbonProcess: false,
  unitPrice: 0,
  salesQty: 0,
  imagePath: "",
  companyIdx: route.query.companyIdx,
  serialNumber: "",
  growthRate: 0,

});
console.log("form", form);
console.log("companyIdx", companyIdx);
console.log("idx", idx);

const imageFile = ref(null);
const handleFileChange = (e) => {
  imageFile.value = e.target.files[0];
};

onMounted(async () => {
  form.companyIdx = route.query.companyIdx;
  console.log("✅ form.companyIdx 확인:", form.companyIdx);
  if (mode.value === "edit" && idx) {
    try {
      const res = await productStore.detail(idx);
      Object.assign(form, res); // form에 데이터 덮어쓰기
    } catch (err) {
      alert("데이터 불러오기 실패");
    }
  }
});

const handleSubmit = async () => {
  if (!imageFile.value) return alert("이미지를 선택해주세요.");

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
  };

  console.log("🚀 최종 DTO:", dto);
  const formData = new FormData();
  formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));
  formData.append("image", imageFile.value);

  try {
    if (mode.value === "edit") {
      await productStore.update(idx, formData);
      alert("수정 완료!");
    } else {
      await productStore.regist(formData);
      alert("등록 완료!");
    }
    router.push(`/productList/${form.companyIdx}`);
  } catch (err) {
    alert("처리 실패. 콘솔 확인!");
    console.error(err);
  }
};

const handleDelete = async () => {
  if (!confirm("정말 삭제하시겠습니까?")) return;
  try {
    await productStore.delete(idx);
    alert("삭제 완료!");
    router.push(`/productList/${form.companyIdx}`);
  } catch (err) {
    alert("삭제 실패");
    console.error(err);
  }
};
</script>

<template>
  <div class="bg-gray-50 p-10 min-h-screen">
    <pre class="bg-gray-100 p-4 rounded mt-10 text-sm">{{ product }}</pre>
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 class="text-blue-600 font-semibold mb-6">
        {{ mode === 'edit' ? '제품 수정' : mode === 'view' ? '제품 상세 보기' : '제품 등록' }}
      </h2>

      <form class="space-y-5" @submit.prevent="mode === 'edit' ? handleUpdate() : handleSubmit()">
        <!-- 제품 이름 -->
        <div>
          <label class="block font-medium" for="productName">제품 이름</label>
          <input id="productName" v-model="form.productName" :disabled="mode === 'view'" type="text"
            class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <!-- 시리얼 넘버 -->
        <div>
          <label class="block font-medium" for="serialNumber">시리얼 넘버</label>
          <input id="serialNumber" v-model="form.serialNumber" :disabled="mode === 'view'" type="text"
            class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <!-- 환경 인증 여부 -->
        <div class="flex items-center gap-2">
          <label class="font-medium">환경 인증 여부</label>
          <input v-model="form.ecoCertified" :disabled="mode === 'view'" type="checkbox" />
        </div>

        <!-- 인증 타입 -->
        <div>
          <label class="block font-medium" for="certificationType">환경 인증 타입</label>
          <input id="certificationType" v-model="form.certificationType" :disabled="mode === 'view'" type="text"
            class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <!-- 에너지 효율 등급 -->
        <div>
          <label class="block font-medium">에너지 효율 등급</label>
          <select v-model="form.energyGrade" :disabled="mode === 'view'" class="w-full border rounded px-3 py-2 mt-1">
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
          <input v-model="form.recyclable" :disabled="mode === 'view'" type="checkbox" />
        </div>

        <!-- 생분해/친환경 원료 -->
        <div class="flex items-center gap-2">
          <label class="font-medium">생분해/친환경 원료</label>
          <input v-model="form.bioMaterial" :disabled="mode === 'view'" type="checkbox" />
        </div>

        <!-- 탄소 저감형 공정 여부 -->
        <div class="flex items-center gap-2">
          <label class="font-medium">탄소 저감형 공정 여부</label>
          <input v-model="form.lowCarbonProcess" :disabled="mode === 'view'" type="checkbox" />
        </div>

        <!-- 단가 -->
        <div>
          <label class="block font-medium" for="unitPrice">단가</label>
          <input id="unitPrice" v-model.number="form.unitPrice" :disabled="mode === 'view'" type="number"
            class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <!-- 판매 수량 -->
        <div>
          <label class="block font-medium" for="salesQty">판매 수량</label>
          <input id="salesQty" v-model.number="form.salesQty" :disabled="mode === 'view'" type="number"
            class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <!-- 증가율 -->
        <div>
          <label class="block font-medium" for="growth">전월/전분기 증가율</label>
          <input id="growth" v-model="form.growthRate" :disabled="mode === 'view'" type="text"
            class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <!-- 이미지 업로드 -->
        <div v-if="mode !== 'view'">
          <label class="block font-medium">제품 이미지</label>
          <input type="file" @change="handleFileChange" class="mt-1" />
        </div>

        <!-- 버튼 -->
        <div class="flex justify-end gap-3 pt-4">
          <button v-if="mode === 'create'" class="bg-green-600 text-white px-4 py-2 rounded" type="submit">
            등록
          </button>

          <button v-if="mode === 'edit'" class="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
            수정
          </button>

          <button v-if="mode !== 'create'" class="bg-red-600 text-white px-4 py-2 rounded" @click="handleDelete">
            삭제
          </button>

          <button @click="$router.push('/productList')"
            class="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100">
            취소
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
