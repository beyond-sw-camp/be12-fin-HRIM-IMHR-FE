<template>
  <div class="bg-gray-50 p-10 min-h-screen">
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 class="text-blue-600 font-semibold mb-6">
        {{ mode === 'edit' ? '제품 수정' : mode === 'view' ? '제품 상세 보기' : '제품 등록' }}
      </h2>

      <form class="space-y-5" @submit.prevent="mode === 'edit' ? handleUpdate() : handleSubmit()">
        <div>
          <label class="block font-medium" for="name">제품 이름</label>
          <input
            id="name"
            v-model="form.name"
            :disabled="mode === 'view'"
            type="text"
            class="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label class="block font-medium" for="serial">시리얼 넘버</label>
          <input
            id="serial"
            v-model="form.serial"
            :disabled="mode === 'view'"
            type="text"
            class="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div class="flex items-center gap-2">
          <label class="font-medium">환경인증 여부</label>
          <input v-model="form.isCertified" :disabled="mode === 'view'" type="checkbox" />
        </div>

        <div>
          <label class="block font-medium" for="cert">환경인증 타입</label>
          <input
            id="cert"
            v-model="form.certType"
            :disabled="mode === 'view'"
            type="text"
            class="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label class="block font-medium">에너지 효율 등급</label>
          <select
            v-model="form.energyGrade"
            :disabled="mode === 'view'"
            class="w-full border rounded px-3 py-2 mt-1"
          >
            <option value="1등급">1등급</option>
            <option value="2등급">2등급</option>
            <option value="3등급">3등급</option>
            <option value="4등급">4등급</option>
            <option value="5등급">5등급</option>
          </select>
        </div>

        <div class="flex items-center gap-2">
          <label class="font-medium">재활용 가능 여부</label>
          <input v-model="form.isRecyclable" :disabled="mode === 'view'" type="checkbox" />
        </div>

        <div class="flex items-center gap-2">
          <label class="font-medium">생분해/친환경 원료</label>
          <input v-model="form.isEcoMaterial" :disabled="mode === 'view'" type="checkbox" />
        </div>

        <div class="flex items-center gap-2">
          <label class="font-medium">탄소 저감형 공정 여부</label>
          <input v-model="form.hasLowCarbonProcess" :disabled="mode === 'view'" type="checkbox" />
        </div>

        <div>
          <label class="block font-medium" for="price">단가</label>
          <input
            id="price"
            v-model.number="form.price"
            :disabled="mode === 'view'"
            type="number"
            class="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label class="block font-medium" for="sales">판매 수량</label>
          <input
            id="sales"
            v-model.number="form.salesCount"
            :disabled="mode === 'view'"
            type="number"
            class="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label class="block font-medium" for="growth">전 월/전 분기 대비 증가율</label>
          <input
            id="growth"
            v-model="form.growthRate"
            :disabled="mode === 'view'"
            type="text"
            class="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div v-if="mode !== 'view'">
          <label class="block font-medium">제품 이미지</label>
          <input type="file" @change="handleFileChange" class="mt-1" />
        </div>

        <!-- 버튼 -->
        <div class="flex justify-end gap-3 pt-4">
          <button
            v-if="mode === 'create'"
            class="bg-green-600 text-white px-4 py-2 rounded"
            type="submit"
          >
            등록
          </button>

          <button
            v-if="mode === 'edit'"
            class="bg-blue-600 text-white px-4 py-2 rounded"
            type="submit"
          >
            수정
          </button>

          <button
            v-if="mode !== 'create'"
            class="bg-red-600 text-white px-4 py-2 rounded"
            @click="handleDelete"
          >
            삭제
          </button>

          <button
            @click="$router.back()"
            class="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useProductStore } from '../../stores/useProductStore';

const router = useRouter();
const route = useRoute();
const productStore = useProductStore();

const idx = route.params.idx;
//const mode = ref(route.query.mode || (idx ? "view" : "create"));

const form = reactive({
  name: "",
  serial: "",
  isCertified: false,
  certType: "",
  energyGrade: "1등급",
  isRecyclable: false,
  isEcoMaterial: false,
  hasLowCarbonProcess: false,
  price: 0,
  salesCount: 0,
  growthRate: "",
  companyIdx: idx // 임시 company
});

const imageFile = ref(null);

const handleFileChange = (e) => {
  imageFile.value = e.target.files[0];
};

onMounted(async () => {
  if (mode.value !== "create" && idx) {
    try {
      const res = await axios.get(`/product/detail/${idx}`);
      const data = res.data.data;
      form.name = data.productName;
      form.serial = data.productIdx;
      form.isCertified = data.ecoCertified;
      form.certType = data.certificationType;
      form.energyGrade = data.energyGrade;
      form.isRecyclable = data.recyclable;
      form.isEcoMaterial = data.bioMaterial;
      form.hasLowCarbonProcess = data.lowCarbonProcess;
      form.price = data.unitPrice;
      form.salesCount = data.salesQty;
    } catch (err) {
      alert("데이터 불러오기 실패");
    }
  }
});

const handleSubmit = async () => {
  if (!imageFile.value) return alert("이미지를 선택해주세요.");

  const dto = {
    productName: form.name,
    ecoCertified: form.isCertified,
    certificationType: form.certType,
    energyGrade: form.energyGrade,
    recyclable: form.isRecyclable,
    bioMaterial: form.isEcoMaterial,
    lowCarbonProcess: form.hasLowCarbonProcess,
    unitPrice: form.price,
    salesQty: form.salesCount,
    companyIdx: form.companyIdx
  };

  const formData = new FormData();
  formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));
  formData.append("image", imageFile.value);

  try {
    const response = await productStore.regist(formData);
    
    alert("등록 완료!");
    router.push("/productList");
  } catch (err) {
    alert("등록 실패. 콘솔 확인!");
    console.error(err);
  }
};

const handleUpdate = async () => {
  try {
    await axios.put(`/api/product/${idx}`, form);
    alert("수정 완료!");
    router.push("/productList/"+idx);
  } catch (err) {
    alert("수정 실패");
  }
};

const handleDelete = async () => {
  if (confirm("정말 삭제하시겠습니까?")) {
    try {
      await axios.delete(`/api/product/${idx}`);
      alert("삭제 완료!");
      router.push("/productList");
    } catch (err) {
      alert("삭제 실패");
    }
  }
};
</script>
