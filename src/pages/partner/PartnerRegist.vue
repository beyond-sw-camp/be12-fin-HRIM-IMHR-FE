<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useCompanyStore } from '../../stores/useCompanyStore'

const props = defineProps(['visible'])
const emit = defineEmits(['close', 'confirm'])

const search = ref('')
const selected = ref([])
const companyStore = useCompanyStore();
const companys = ref([]);

const filteredCompanys = computed(() => {
  return companys.value.filter(company =>
  company.name.includes(search.value.trim())
  ) 
});


onMounted(async () => {
  const companyList = await companyStore.list();
  companys.value = companyList; 
});
</script>

<template>
  <div v-if="visible" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-auto shadow-lg">
      <h2 class="text-xl font-bold mb-4 text-center">협력사 추가</h2>

      <!-- 검색 -->
      <div class="flex gap-2 mb-4">
        <input
          v-model="search"
          placeholder="회사명을 입력하세요"
          class="flex-1 border px-3 py-2 rounded"
        />
      </div>

      <!-- 테이블 -->
      <table class="w-full border text-sm text-center mb-4">
        <thead>
          <tr class="bg-slate-100">
            <th class="p-2 border">선택</th>
            <th class="p-2 border">회사 번호</th>
            <th class="p-2 border">회사 이름</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(company, idx) in filteredCompanys" :key="idx">
            <td class="border p-2">
              <input type="checkbox" v-model="selected" :value="company" />
            </td>
            <td class="border p-2">{{ idx + 1 }}</td>
            <td class="border p-2">{{ company.name }}</td>
          </tr>
        </tbody>
      </table>

      <!-- 버튼 -->
      <div class="flex justify-center gap-4">
        <button
          @click="$emit('confirm', selected)"
          class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          확인
        </button>
        <button
          @click="$emit('close')"
          class="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          취소
        </button>
      </div>
    </div>
  </div>
</template>