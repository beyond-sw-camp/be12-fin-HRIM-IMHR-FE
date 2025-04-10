<template>
  <div class="bg-gray-50 p-10 min-h-screen">
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 class="text-blue-600 font-semibold mb-6">
        <a href="#" class="hover:underline">ESG 제품 등록</a>
      </h2>

      <form class="space-y-5" @submit.prevent="handleSubmit">
        <div>
          <label class="block font-medium">제품 이름</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label class="block font-medium">시리얼 넘버</label>
          <input
            v-model="form.serial"
            type="text"
            class="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div class="flex items-center gap-2">
          <label class="font-medium">환경인증 여부</label>
          <input v-model="form.isCertified" type="checkbox" />
        </div>

        <div>
          <label class="block font-medium">환경인증 타입</label>
          <input
            v-model="form.certType"
            type="text"
            class="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label class="block font-medium">에너지 효율 등급</label>
          <select
            v-model="form.energyGrade"
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
          <label class="block font-medium">단가</label>
          <input
            v-model.number="form.price"
            type="number"
            class="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label class="block font-medium">판매 수량</label>
          <input
            v-model.number="form.salesCount"
            type="number"
            class="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label class="block font-medium">전 월/ 전 분기 대비 증가율</label>
          <input
            v-model="form.growthRate"
            type="text"
            class="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div class="flex justify-end gap-3 pt-4">
          <button
            v-if="mode === 'create'"
            class="px-4 py-1 border-2 border-green-500 text-green-500 rounded hover:bg-green-50"
            @click="handleSubmit"
          >
            등록
          </button>

          <button
            v-if="mode === 'edit'"
            class="px-4 py-1 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50"
            @click="handleSubmit"
          >
            저장
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
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const mode = route.query.mode || "create";// 기본값은 'create'

console.log("mode.value:", mode);

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
});

const handleSubmit = () => {
  if (mode === "edit") {
    console.log("수정 모드:", form);
    // 수정 API 호출
  } else {
    console.log("등록 모드:", form);
    // 등록 API 호출
  }
};

const resetForm = () => {
  Object.assign(form, {
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
  });
};
</script>