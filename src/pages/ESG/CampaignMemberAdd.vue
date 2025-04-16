<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Search } from "lucide-vue-next";

const route = useRoute();
const campaignTitle = ref("");
const startDate = ref("2025-08-17");
const endDate = ref("2025-08-17");

onMounted(() => {
  campaignTitle.value = route.query.title || "ESG 캠페인 1";
});

const users = ref([
  { id: "test4", name: "test4" },
  { id: "test3", name: "test3" },
  { id: "test2", name: "test2" },
  { id: "test1", name: "test1" },
  { id: "test", name: "test" },
]);

const userRole = ref(JSON.parse(localStorage.getItem('userInfo'))?.role || 'manager')
// manager executive staff `'${{변수명}}'` v-if="userRole === 'manager'"
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold text-slate-800 mb-6"> 사내 캠페인 상세 </h1>
      
      <div class="flex mb-3">
        <div class="text-2xl text-slate-700">{{ campaignTitle }} </div>
        <div class="text-2xl text-slate-700 ml-2">
         : {{ endDate }} ~ {{ startDate }}
      
      </div>
      
    </div>

    <div
      class="max-w-2xl mx-auto bg-white p-4 rounded-md shadow-md flex items-center gap-3 mb-8"
    >
      <Search color="black" :size="30" />

      <input
        type="text"
        placeholder="이름을 입력해주세요."
        class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
      />

      <button
        class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition"
      >
        검색
      </button>
    </div>

    <!-- 참여자 테이블 -->
    <div class="bg-white rounded shadow-md overflow-x-auto">
      
      <table class="w-full text-center border-collapse">
        
        <thead class="bg-slate-100 border-b border-gray-200 text-slate-700">
          <tr>
            <th class="py-3 px-2"><input type="checkbox" /></th>
            <th class="py-3 px-2">아이디</th>
            <th class="py-3 px-2">이름</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="border-t border-gray-100 hover:bg-slate-50 transition"
          >
            <td class="py-3 px-2"><input type="checkbox" /></td>
            <td class="py-3 px-2">{{ user.id }}</td>
            <td class="py-3 px-2">{{ user.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-end gap-3 pt-4" v-if="userRole === 'manager'">
      <button 
        class="px-4 py-1 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50"
      >
        저장
      </button>

      <button
        class="px-4 py-1 border-2 border-red-500 text-red-500 rounded hover:bg-red-50"
      >
        삭제
      </button>
    </div>
  </div>
</template>