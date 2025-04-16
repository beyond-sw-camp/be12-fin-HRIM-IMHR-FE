<script setup>
import { ref, computed, onMounted } from "vue";
import { useMemberStore } from "../../stores/useMemberStore";

const memberStore = useMemberStore();
const searchText = ref("");

const myinfo = ref([]);
const users = ref([]);

const filteredUsers = computed(() => {
  return users.value.filter((u) => u.memberId.includes(searchText.value));
});

const searchUser = () => {
  console.log(`검색: ${searchText.value}`);
};

onMounted(async () => {
  myinfo.value = (await memberStore.myPageInfo()).data.data;
  console.log(myinfo.value)
  if(myinfo.value.isAdmin) {
    const response = await memberStore.adminMemberList();
    console.log(response);
    users.value = response.data.data;
  }
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen p-10">
    <h1 class="text-4xl font-bold text-center text-slate-800 mb-10">사원 관리</h1>

    <!-- 🔍 검색 바 -->
    <div class="max-w-2xl mx-auto mb-8 flex items-center gap-4 bg-white p-4 rounded shadow">
      <input
        type="text"
        v-model="searchText"
        placeholder="아이디로 검색"
        class="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
      />
      <button
        class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition"
        @click="searchUser"
      >
        검색
      </button>
    </div>

    <!-- 📋 테이블 -->
    <div class="bg-white rounded-lg shadow overflow-x-auto max-w-5xl mx-auto">
      <table class="w-full table-auto text-sm text-center text-slate-800 border-collapse">
        <thead class="bg-slate-100 text-slate-700">
          <tr>
            <th class="py-3 border">순번</th>
            <th class="py-3 border" v-if="myinfo.isAdmin">상태</th>
            <th class="py-3 border">아이디</th>
            <th class="py-3 border">이름</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="user.memberId" class="border-b hover:bg-slate-50 transition">
            <td class="py-2 border">{{ index }}</td>

            <td class="border" v-if="myinfo.isAdmin">
              <span
                class="px-2 py-1 text-white text-xs font-semibold rounded"
                :class="{
                  'bg-gray-500': user.status === 'PENDING',
                  'bg-green-500': user.status === 'APPROVED',
                  'bg-red-500': user.status === '승인 반려',
                }"
              >
                {{ (user.status === "APPROVED" ? "승인" : "대기 중") }}
              </span>
            </td>

            <td class="border" v-if="myinfo.isAdmin">
              <router-link
                :to="{
                  path: user.status === 'APPROVED' ? `/permissionSetting/${user.idx}` : `/staffDetail/${user.idx}`,
                }"
              >
                {{ user.memberId }}
              </router-link>
            </td>

            <!-- ✅ 수정된 부분 -->
            <td class="border" v-if="!myinfo.isAdmin">
              <router-link :to="`/feedback/${user.id}`">
                {{ user.id }}
              </router-link>
            </td>

            <td class="border">{{ user.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>