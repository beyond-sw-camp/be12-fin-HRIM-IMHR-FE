나의 말:
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useCompanyStore } from "../../stores/useCompanyStore";
import { usePartnerStore } from "../../stores/usePartnerStore";

const props = defineProps({
  visible: Boolean,
  mycompanyIdx: Number,
});

const emit = defineEmits(["close", "confirm"]);

const currentPage = ref(1);
const totalPages = ref(0); // 응갑 받은 총 페이지 수
const search = ref("");
const selected = ref([]);
const companyStore = useCompanyStore();
const partnerStore = usePartnerStore();
const pages = []
const groupSize = 5

const filteredCompanys = computed(() =>
  companyStore.companys.filter((c) =>
    (c.name || "").toLowerCase().includes(search.value.toLowerCase())
  )
);

const onSearch = async () => {
  currentPage.value = 1;
  await fetchCompanies();
};

const fetchCompanies = async () => {
  totalPages.value = await companyStore.list(currentPage.value - 1, 5,search.value); 
};

const displayedPages = computed(() => {
  const pages = [];
  const groupStart = Math.floor((currentPage.value - 1) / groupSize) * groupSize + 1;
  const groupEnd = Math.min(groupStart + groupSize - 1, totalPages.value);

  for (let i = groupStart; i <= groupEnd; i++) {
    pages.push(i);
  }
  return pages;
});

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
}

watch(currentPage, fetchCompanies);
watch(() => props.visible, (newVal) => {
  if (!newVal) {
    // 모달 닫힐 때 초기화
    currentPage.value = 1;
    search.value = "";
    selected.value = [];
    // totalPages.value = 0;
  }
});

onMounted(fetchCompanies);

const handleSubmit = async () => {
  const payload = {
    companyIdx: props.mycompanyIdx,
    partnerList: selected.value.map((c) => ({
      idx: c.idx,
      name: c.name,
      has_esg_data: c.has_esg_data,
      member: c.member,
    })),
  };

  if (selected.value.length > 0) {
    await partnerStore.add(payload);
    emit("confirm");
  } else {
    emit("close");
  }
};

</script>

<template>
  <div v-if="visible" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-auto shadow-lg">
      <h2 class="text-xl font-bold mb-4 text-center">협력사 추가</h2>

      <!-- 검색 -->
      <div class="flex gap-2 mb-4">
        <input v-model="search" placeholder="회사명을 입력하세요" class="flex-1 border px-3 py-2 rounded" />

        <button class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition" @click="onSearch">
          검색
        </button>
      </div>

      <!-- 테이블 -->
      <table class="w-full border text-sm text-center mb-4">
        <thead class="bg-slate-100">
          <tr>
            <th class="p-2 border" rowspan="2">선택</th>
            <th class="p-2 border" rowspan="2">회사 명</th>
            <th class="p-2 border" colspan="4">KESG</th>
          </tr>
          <tr>
            <th class="p-2 border">환경</th>
            <th class="p-2 border">사회</th>
            <th class="p-2 border">지배구조</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(company, idx) in filteredCompanys" :key="idx">
            <td class="border p-2">
              <input type="checkbox" v-model="selected" :value="company" />
            </td>
            <td class="border p-2">{{ company.name }}</td>
            <td class="border p-2">{{ company.escore }}</td>
            <td class="border p-2">{{ company.sscore }}</td>
            <td class="border p-2">{{ company.gscore }}</td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-center mt-8 space-x-2 text-sm mb-2">

        <!-- 이전(←) 버튼 -->
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
          class="w-10 h-10 flex items-center justify-center rounded-full border disabled:opacity-40 hover:bg-slate-100">
          ←
        </button>

        <!-- 페이지 번호들 -->
        <button v-for="page in displayedPages" :key="page" @click="goToPage(page)" :class="[
          'w-10 h-10 flex items-center justify-center rounded-full border transition',
          page === currentPage
            ? 'bg-slate-800 text-white font-bold'
            : 'hover:bg-slate-100'
        ]">
          {{ page }}
        </button>

        <!-- 다음(→) 버튼 -->
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
          class="w-10 h-10 flex items-center justify-center rounded-full border disabled:opacity-40 hover:bg-slate-100">
          →
        </button>

      </div>

      <!-- 버튼 -->
      <div class="flex justify-center gap-4">
        <button @click="handleSubmit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          확인
        </button>
        <button @click="$emit('close')" class="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
          취소
        </button>
      </div>
    </div>
  </div>
</template>