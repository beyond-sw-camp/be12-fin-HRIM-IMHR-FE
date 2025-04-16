<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Search } from "lucide-vue-next";
import { useCalendarStore } from "../../stores/useCalendarStore";

const route = useRoute();
const router = useRouter();
const Idx = route.params.idx;
const event = useCalendarStore();

const users = ref([
  { id: "test4", name: "test4" },
  { id: "test3", name: "test3" },
  { id: "test2", name: "test2" },
  { id: "test1", name: "test1" },
  { id: "test", name: "test" },
]);

const handleClose = () => {
  router.back();
};

// 캠페인 상세 정보
const title = ref("");
const content = ref("");
const startDate = ref("");
const endDate = ref("");

// 선택된 유저 ID 목록
const selectedUserIds = ref([]);

// 추가 버튼 눌렀을 때
const handleAddUsers = () => {
  console.log("선택된 유저:", selectedUserIds.value);
  // 👉 여기에 API 호출이나 로직 추가 가능
};

onMounted(async () => {
  const result = await event.eventdetial(Idx);

  if (result) {
    title.value = result.title;
    content.value = result.content;
    startDate.value = result.startDate;
    endDate.value = result.endDate;
  } else {
    console.error("상세 데이터를 불러오지 못했습니다.");
  }
});
</script>

<template>
  <div class="px-8 py-6 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold text-slate-800 text-center mb-8">
      사내 캠페인 상세
    </h1>

    <div class="max-w-2xl mx-auto mb-4">
      <p class="space-y-2 text-xl text-gray-700">
        <strong>제목 : </strong> {{ title }}
      </p>

      <p class="space-y-2 text-l text-gray-500">
        <strong>내용 : </strong> {{ content }}
      </p>

      <p class="space-y-2 text-l text-gray-500">
        <strong>기간 : </strong> {{ endDate }} ~ {{ startDate }}
      </p>
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
    <div class="bg-white rounded-lg shadow overflow-hidden max-w-4xl mx-auto">
      <table class="min-w-full text-sm text-slate-800 text-center">
        <thead class="bg-slate-100 border-b border-gray-200">
          <tr>
            <th class="py-3 px-6">
              <input
                type="checkbox"
                :checked="selectedUserIds.length === users.length"
                @change="
                  (e) => {
                    selectedUserIds = e.target.checked
                      ? users.map((u) => u.id)
                      : [];
                  }
                "
              />
            </th>

            <th class="py-3 px-6">아이디</th>
            <th class="py-3 px-6">이름</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="border-b hover:bg-slate-50 cursor-pointer transition"
          >

            <td class="py-3 px-2">
              <input
                type="checkbox"
                :value="user.id"
                v-model="selectedUserIds"
              />
            </td>

            <td class="py-3 px-2">{{ user.id }}</td>
            <td class="py-3 px-2">{{ user.name }}</td>
          </tr>

        </tbody>

      </table>
    </div>

    <div class="flex justify-end gap-3 pt-4">
      <button
        class="px-4 py-1 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50"
        @click="handleAddUsers"
      >
        추가
      </button>

      <button
        class="px-4 py-1 border-2 border-red-500 text-red-500 rounded hover:bg-red-50"
        @click="handleClose"
      >
        닫기
      </button>
    </div>
  </div>
</template>