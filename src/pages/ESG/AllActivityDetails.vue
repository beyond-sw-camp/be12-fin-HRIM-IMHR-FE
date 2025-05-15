<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useActivityStore } from "../../stores/useActivityStore";
import { useMemberStore } from "../../stores/useMemberStore";
import { useStompStore } from "../../stores/useStompStore";

const activityStore = useActivityStore();
const memberStore = useMemberStore();

const route = useRoute();

const activeIdx = route.params.idx;

const detail = ref({});
const member = ref({});
const me = ref(false);

const stomp = useStompStore();

const router = useRouter();

// 승인
const agree = async () => {
  console.log(member.value.name);
  await activityStore.agree(activeIdx);
  stomp.activityApprove(
    "승인 되었습니다.",
    "[" + detail.value.subject + "] 활동이 승인 되었습니다.",
    member.value,
    "/activeDetails/" + activeIdx
  );
  await search();
};

// 반려
const oppose = async () => {
  await activityStore.oppose(activeIdx);
  stomp.activityApprove(
    "반려 되었습니다.",
    "[" + detail.value.subject + "] 활동이 반려 되었습니다.",
    detail.value.memberIdx,
    "/activeDetails/" + activeIdx
  );
  await search();
};

const deleteActivity = async () => {
  try {
    await activityStore.delete(activeIdx);
    alert("삭제 되었습니다.");
    router.push("/activityList");
  } catch {
    alert("삭제 실패");
    await search();
  }
};

const search = async () => {
  detail.value = await activityStore.detail(activeIdx);
};

onMounted(async () => {
  await search();
  me.value = await memberStore.userInfo.isAdmin;
  const response = await memberStore.staffDetail(detail.value.memberIdx);

  member.value = response.data.data.info;
  console.log(member.value);
});
</script>

<template>
  <div class="bg-white min-h-[calc(93vh-4rem)] p-8 rounded-lg shadow-sm">
    <!-- 타이틀 -->
    <h2 class="text-2xl font-bold text-slate-800 mb-6 text-center">
      ESG 교육 상세
    </h2>

    <!-- 상세 카드 -->
    <div
      class="border border-slate-200 p-6 rounded-lg bg-gray-50 shadow-md space-y-5 max-w-3xl mx-auto"
    >
      <!-- 게시자 -->
      <div>
        <span class="font-semibold text-slate-700">게시자 : </span>
        <span class="text-slate-600 ml-2"
          >{{ detail.userName }}({{ detail.userID }})</span
        >
      </div>

      <!-- 제목 -->
      <div>
        <span class="font-semibold text-slate-700">ESG 활동 항목 : </span>
        <span class="text-slate-600 ml-2">
          {{ detail.esgActivityItem }}</span
        >
      </div>

      <!-- 첨부파일 -->
      <div>
        <span class="font-semibold text-slate-700">첨부파일 : </span>
        <div class="flex flex-wrap gap-4 mt-2">
          <template v-for="(value, key) in detail.inputs">
            <a
              v-if="
                typeof value === 'string' &&
                /\.(png|jpe?g|pdf|docx?|xlsx?|pptx?|txt|zip|hwp)$/i.test(value)
              "
              :key="key"
              :href="value"
              :download="key"
              class="text-blue-600 hover:underline text-sm flex flex-col items-center"
              target="_blank"
            >
              <span>{{ key }}</span>
            </a>
          </template>

          <div v-if="detail.inputs">
            <span
              v-if="
                !Object.values(detail.inputs).some(
                  (v) =>
                    typeof v === 'string' &&
                    /\.(png|jpe?g|pdf|docx?|xlsx?|pptx?|txt|zip|hwp)$/i.test(v)
                )
              "
              class="text-gray-400"
            >
              첨부파일 없음
            </span>
          </div>

        </div>
      </div>

      <!-- 내용 -->
      <div>
        <span class="font-semibold text-slate-700">활동 내용 : </span>
        <div
          class="mt-2 p-4 bg-white border border-slate-200 rounded-md text-slate-600 text-sm leading-relaxed"
        >
          {{ detail.subject }}
        </div>
      </div>

      <!-- 버튼 -->
      <div class="flex justify-end gap-3 pt-4" v-if="me && detail.status === null">
        <button
          @click="agree"
          class="px-4 py-1 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50"
        >
          승인
        </button>

        <button
          @click="oppose"
          class="px-4 py-1 border-2 border-red-500 text-red-500 rounded hover:bg-red-50"
        >
          반려
        </button>
      </div>

      <div class="flex justify-end gap-3 pt-4" v-else-if="!me && (!detail.status || detail.status === '')">
        <button
          @click="deleteActivity"
          class="flex justify-end px-4 py-1 border-2 border-red-500 text-red-500 rounded hover:bg-red-50"
        >
          삭제
        </button> 
      </div>

      <div
        class="flex justify-end gap-3 pt-4"
        v-if="detail.status"
      >
        승인 되었습니다.
      </div>

      <div
        class="flex justify-end gap-3 pt-4"
        v-else-if="detail.status === null"
      >
        대기중입니다.
      </div>

      <div
        class="flex justify-end gap-3 pt-4"
        v-else-if="!detail.status"
      >
        반려 되었습니다.
      </div>
    </div>
  </div>
</template>

<style scoped></style>
