<script setup>
import { X } from "lucide-vue-next";
import { ref, computed } from "vue";

const props = defineProps(["visible", "campaign"]);
const emit = defineEmits(["close", "confirm"]);

const search = ref("");
const selected = ref([]);

// 예시 데이터
const allPartners = ref([
  { id: 0, name: "test4" },
  { id: 1, name: "test3" },
  { id: 2, name: "test2" },
  { id: 3, name: "test1" },
  { id: 3, name: "test1" },
  { id: 3, name: "test1" },
  { id: 3, name: "test1" },
  { id: 3, name: "test1" },

]);

const filteredPartners = computed(() => {
  return allPartners.value.filter((partner) =>
    partner.name.includes(search.value.trim())
  );
});

const onSearch = () => {
  // 필터링은 computed로 처리했기 때문에 따로 처리 안 해도 돼요.
};
const userRole = ref(
  JSON.parse(localStorage.getItem("userInfo"))?.role || "manager"
);
// manager executive staff `'${{변수명}}'` v-if="userRole === 'manager'"
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div
      class="bg-white rounded-xl p-6 w-[500px] max-h-[120vh] overflow-auto shadow-lg relative"
    >
      <button
        class="absolute top-3 right-3 text-gray-500"
        @click="$emit('close')"
      >
        <X class="w-5 h-5" />
      </button>

      <h2 class="text-2xl font-bold mb-4 text-center">캠페인</h2>

      <!-- 캠페인 정보 -->
      <div class="mb-4 space-y-2 text-l text-gray-700">
        <p><strong>제목 : </strong> {{ campaign?.title || "내용 없음" }}</p>
        <p><strong>내용 : </strong> {{ campaign?.content || "내용 없음" }}</p>
        <p><strong>기간 :  </strong> {{ campaign?.startDate || "-" }} ~ {{ campaign?.endDate || "-" }}</p>
      </div>

      <!-- 테이블 -->
      <!-- style="max-height: 200px;" -->
      <div class="overflow-y-auto border-transparent border mb-4" style="max-height: 240px;">
      <table class="w-full border text-l text-center mb-4">
        <thead>
          <tr class="bg-slate-100">
            <th class="p-2 border">사원 이름</th>
            <th class="p-2 border">사원 ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(partner, idx) in filteredPartners" :key="idx">
            <td class="border p-2">{{ partner.name }}</td>
            <td class="border p-2">{{ partner.id }}</td>
          </tr>
        </tbody>
      </table>
      </div>
      <!-- 버튼 -->
      <div class="flex justify-center gap-4" v-if="userRole === 'manager'">
        <router-link
          @click="$emit('confirm', selected)"
          class="bg-slate-600 text-white px-6 py-2 rounded hover:bg-slate-700"
        >
          수정
        </router-link>

        <button
          @click="$emit('close')"
          class="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          삭제
        </button>
      </div>

      <div class="flex justify-center gap-4" v-if="userRole !== 'manager'">
        <button
          @click="$emit('close')"
          class="bg-slate-500 text-white px-6 py-2 rounded hover:bg-slate-600"
        >
          닫기
        </button>
      </div>
    </div>
  </div>
</template>