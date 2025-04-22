<script setup>
import { reactive, ref, computed, onMounted } from 'vue';
import { useMemberStore } from '../../stores/useMemberStore';

const memberStore = useMemberStore();

const filters = reactive({
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date().toISOString().split('T')[0]
});

const searchField = ref('name');
const searchKeyword = ref('');

const reports = ref([]);

const filteredReports = computed(() => {
  return reports.value.filter(report => {
    const value = report[searchField.value]?.toLowerCase() || '';
    return value.includes(searchKeyword.value.toLowerCase());
  });
});

function search() {
  console.log('검색 조건:', searchField.value, searchKeyword.value, filters);
}

onMounted(async () => {
  const response = await memberStore.authMemberList();
  console.log(response);
  reports.value = response.data.data;
});
</script>

<template>
    <div class="p-6 bg-white min-h-screen">
      <h1 class="text-2xl font-bold mb-4">인사 리포트 리스트</h1>
  
      <div class="flex flex-wrap gap-4 mb-2">
        <div class="flex flex-col w-1/5 min-w-[100px]">
          <label>시작일</label>
          <input v-model="filters.startDate" type="date" class="border rounded p-2 w-full" />
        </div>
        <div class="flex flex-col w-1/5 min-w-[100px]">
          <label>종료일</label>
          <input v-model="filters.endDate" type="date" class="border rounded p-2 w-full" />
        </div>
      </div>
  
      <div class="flex flex-wrap gap-4 mb-4">
        <div class="flex flex-col w-1/5 min-w-[100px]">
          <label>검색 항목</label>
          <select v-model="searchField" class="border rounded p-2 w-full">
            <option value="name">직원 이름</option>
            <option value="id">아이디</option>
            <!-- <option value="code">사원코드</option> -->
          </select>
        </div>
        <div class="flex flex-col flex-1 min-w-[200px]">
          <label>검색어</label>
          <input v-model="searchKeyword" class="border rounded p-2 w-full" placeholder="검색어 입력" />
        </div>
        <div class="flex flex-col justify-end">
          <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="search">검색</button>
        </div>
      </div>
  
      <table class="w-full table-auto border">
        <thead>
          <tr style="background-color: rgb(243, 244, 246);">
            <th class="border px-4 py-2">이름</th>
            <th class="border px-4 py-2">아이디</th>
            <th class="border px-4 py-2">부서</th>
            <!-- <th class="border px-4 py-2">기간</th> -->
            <th class="border px-4 py-2">상세보기</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(report, index) in filteredReports" :key="index">
            <td class="border px-4 py-2">{{ report.name }}</td>
            <td class="border px-4 py-2">{{ report.memberId }}</td>
            <td class="border px-4 py-2">{{ report.department.name }}</td>
            <!-- <td class="border px-4 py-2">{{ report.period }}</td> -->
            <td class="border px-4 py-2">
              <router-link :to="`/reports/${report.idx}`" class="text-blue-500 hover:underline">상세보기</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <style scoped>
  table th,
  table td {
    text-align: center;
  }
  </style>
  