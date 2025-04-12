<template>
  <div class="bg-gray-50 p-10 min-h-screen">
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 class="text-blue-600 font-semibold mb-6">
        <a href="#" class="hover:underline">ESG 제품 등록</a>
      </h2>

      <form class="space-y-5" @submit.prevent="handleSubmit">
        <div>
          <label class="block font-medium" for="name">제품 이름</label>
          <input id="name" v-model="form.name" type="text" class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <div>
          <label class="block font-medium" for="serial">시리얼 넘버</label>
          <input id="serial" v-model="form.serial" type="text" class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <div class="flex items-center gap-2">
          <label class="font-medium">환경인증 여부</label>
          <input v-model="form.isCertified" type="checkbox" />
        </div>

        <div>
          <label class="block font-medium" for="cert">환경인증 타입</label>
          <input id="cert" v-model="form.certType" type="text" class="w-full border rounded px-3 py-2 mt-1" />
        </div>

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

        <div class="flex items-center gap-2">
          <label class="font-medium">재활용 가능 여부</label>
          <input v-model="form.isRecyclable" type="checkbox" />
        </div>

        <div class="flex items-center gap-2">
          <label class="font-medium">생분해/친환경 원료</label>
          <input v-model="form.isEcoMaterial" type="checkbox" />
        </div>

        <div class="flex items-center gap-2">
          <label class="font-medium">탄소 저감형 공정 여부</label>
          <input v-model="form.hasLowCarbonProcess" type="checkbox" />
        </div>

        <div>
          <label class="block font-medium" for="price">단가</label>
          <input id="price" v-model.number="form.price" type="number" class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <div>
          <label class="block font-medium" for="sales">판매 수량</label>
          <input id="sales" v-model.number="form.salesCount" type="number" class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <div>
          <label class="block font-medium" for="growth">전 월/전 분기 대비 증가율</label>
          <input id="growth" v-model="form.growthRate" type="text" class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <div>
          <label class="block font-medium">제품 이미지</label>
          <input type="file" @change="handleFileChange" class="mt-1" />
        </div>

        <div class="flex justify-end gap-3 pt-4">
          <button
            class="px-4 py-1 border-2 border-green-500 text-green-500 rounded hover:bg-green-50"
            type="submit"
          >
            등록
          </button>

          <button
            @click="$router.back()"
            class="px-4 py-1 border-2 border-red-500 text-red-500 rounded hover:bg-red-50"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const route = useRoute();
const mode = route.query.mode || "create";

const imageFile = ref(null);

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
  growthRate: ""
});

const handleFileChange = (e) => {
  imageFile.value = e.target.files[0];
};

const handleSubmit = async () => {
  if (!imageFile.value) {
    alert("이미지를 선택해주세요.");
    return;
  }

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
    companyIdx: 1 // 🔑 실제 DB에 존재하는 company idx
  };

  const formData = new FormData();
  formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));
  formData.append("image", imageFile.value);

  try {
    const res = await axios.post("/api/product/regist", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true // 백엔드가 ATOKEN 쿠키 기반이면 꼭 필요
    });
    alert("등록 성공! ID: " + res.data.data);
    router.push("/product/list");
  } catch (err) {
    console.error("등록 실패:", err);
    if (err.response) {
      console.error("응답 상태코드:", err.response.status);
      console.error("응답 메시지:", err.response.data);
    }
    alert("등록 실패. 콘솔을 확인해주세요.");
  }
};
</script>
