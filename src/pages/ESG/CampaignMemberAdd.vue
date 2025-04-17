<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Search } from "lucide-vue-next";
import { useCalendarStore } from "../../stores/useCalendarStore";
import { useMemberStore } from "../../stores/useMemberStore";
import { useCampaignStore } from "../../stores/useCampaignStore";
import { data } from "autoprefixer";

const route = useRoute();
const router = useRouter();
const Idx = route.params.idx;
const event = useCalendarStore();
const campaign = useCampaignStore();

// 사원 검색
const memberStore = useMemberStore();
const searchText = ref("");
const myinfo = ref([]);
const users = ref([]);

const filteredUsers = computed(() => {
  return users.value.filter((u) => u.name.includes(searchText.value));
});

const searchUser = () => {
  console.log(`검색: ${searchText.value}`);
};

const handleClose = () => {
  router.back();
};

// 캠페인 상세 정보
const title = ref("");
const content = ref("");
const startDate = ref("");
const endDate = ref("");

// 선택된 유저 ID 목록
const selectedUserIdxs = ref([]);

// 추가 버튼 눌렀을 때
const handleAddUsers = async () => {
  const formData = {
    eventIdx: Idx, // 여기에 이벤트 idx 포함
    memberIdxList: selectedUserIdxs.value,
  };

  try {
    const result = await campaign.register(formData);
    alert("사원이 성공적으로 추가되었습니다.");
    router.back();
  } catch (error) {
    console.error("등록 실패:", error);
    alert("사원 추가 중 오류가 발생했습니다.");
  }
};

// 참여자 분리
const participatedMembers = ref([]);
const nonParticipatedUsers = computed(() => {
  const participatedIds = new Set(participatedMembers.value.map((m) => m.idx));
  return users.value.filter((u) => !participatedIds.has(u.idx));
});

//
onMounted(async () => {
  const result = await event.eventdetial(Idx);

  if (result) {
    title.value = result.title;
    content.value = result.content;
    startDate.value = result.startDate;
    endDate.value = result.endDate;
  }

  myinfo.value = (await memberStore.myPageInfo()).data.data;

  if (myinfo.value.isAdmin) {
    const [userRes, memberRes] = await Promise.all([
      memberStore.adminMemberList(),
      campaign.campaignfetchMemberList(Idx),
    ]);

    // 승인된 사원들만 필터
    users.value = userRes.data.data.filter((u) => u.status == "APPROVED");
    participatedMembers.value = memberRes;
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
        v-model="searchText"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
      />

      <button
        class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition"
        @click="searchUser"
      >
        검색
      </button>
    </div>

    <div class="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto mt-6">
      <!-- ✅ 왼쪽: 참여자 테이블 (항상 표시) -->
      <div
        class="w-full md:w-1/2 bg-white rounded-lg shadow overflow-hidden p-4 mr-4"
      >
        <h2 class="text-lg font-semibold mb-2 text-slate-700">참여자 목록</h2>
        <table class="w-full text-sm text-center">
          <thead class="bg-slate-100">
            <tr>
              <th class="p-2">번호</th>
              <th class="p-2">이름</th>
              <th class="p-2">아이디</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="participatedMembers.length === 0"
              class="text-gray-400 text-center"
            >
              <td colspan="3" class="py-4">참여한 사원이 없습니다.</td>
            </tr>
            <tr
              v-for="(user, index) in participatedMembers"
              :key="index"
              class="hover:bg-slate-50"
            >
              <td class="p-2">{{ index + 1 }}</td>
              <td class="p-2">{{ user.name }}</td>
              <td class="p-2">{{ user.memberId }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ✅ 오른쪽: 참여하지 않은 사원 리스트 (항상 표시) -->
      <div
        class="w-full md:w-1/2 bg-white rounded-lg shadow overflow-hidden p-4"
      >
        <h2 class="text-lg font-semibold mb-2 text-slate-700">
          참여하지 않은 사원
        </h2>

        <table class="w-full text-sm text-center">
          <thead class="bg-slate-100">
            <tr>
              <th class="p-2">
                <input
                  type="checkbox"
                  :checked="
                    selectedUserIdxs.length === nonParticipatedUsers.length
                  "
                  @change="
                    (e) => {
                      selectedUserIdxs = e.target.checked
                        ? nonParticipatedUsers.map((u) => u.idx)
                        : [];
                    }
                  "
                />
              </th>
              <th class="p-2">부서</th>
              <th class="p-2">아이디</th>
              <th class="p-2">이름</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="nonParticipatedUsers.length === 0"
              class="text-gray-400 text-center"
            >
              <td colspan="4" class="py-4">참여 가능한 사원이 없습니다.</td>
            </tr>
            <tr
              v-for="(user, index) in nonParticipatedUsers"
              :key="index"
              class="hover:bg-slate-50"
            >
              <td class="p-2">
                <input
                  type="checkbox"
                  :value="user.idx"
                  v-model="selectedUserIdxs"
                />
              </td>
              <td class="p-2">{{ user.department }}</td>
              <td class="p-2">{{ user.memberId }}</td>
              <td class="p-2">{{ user.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 참여자 테이블 -->
    <!-- <div class="bg-white rounded-lg shadow overflow-hidden max-w-4xl mx-auto">
      <table class="min-w-full text-sm text-slate-800 text-center">
        <thead class="bg-slate-100 border-b border-gray-200">
          <tr>
            <th class="py-3 px-6">
              <input
                type="checkbox"
                :checked="selectedUserIdxs.length === users.length"
                @change="
                  (e) => {
                    selectedUserIdxs = e.target.checked
                      ? users.map((u) => u.idx)
                      : [];
                  }
                "
              />
            </th>

            <th class="py-3 px-6">부서</th>
            <th class="py-3 px-6">아이디</th>
            <th class="py-3 px-6">이름</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(user, index) in filteredUsers"
            :key="index"
            class="border-b hover:bg-slate-50 cursor-pointer transition"
          >
            <td class="py-3 px-2">
              <input
                type="checkbox"
                :value="user.idx"
                v-model="selectedUserIdxs"
              />
            </td>
            <td class="py-3 px-2">{{ user.department }}</td>
            <td class="py-3 px-2">{{ user.memberId }}</td>
            <td class="py-3 px-2">{{ user.name }}</td>
          </tr>
        </tbody>
      </table>
    </div> -->

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