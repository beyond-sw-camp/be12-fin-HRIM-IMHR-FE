<template>
  <div class="flex min-h-screen">
    <!-- 본문 -->
    <main class="flex-1 bg-gray-50">
      <!-- 내용 -->
      <section
        class="flex flex-col items-center justify-center p-6 min-h-[calc(100vh-72px)]"
      >
        <div
          class="w-full max-w-md border border-blue-200 rounded-xl bg-white p-8 shadow-md"
        >
          <h2 class="text-xl font-semibold mb-6 text-center text-gray-700">
            회원 상세 정보
          </h2>
          <div class="space-y-4 text-gray-700 text-base">
            <div><strong>이름 :</strong> {{ user.name }}</div>
            <div><strong>아이디 :</strong> {{ user.id }}</div>
            <div><strong>이메일 :</strong> {{ user.email }}</div>
            <div><strong>회사 코드 :</strong> {{ user.companyCode }}</div>
          </div>
        </div>

        <div class="mt-6 flex flex-col sm:flex-row gap-4" v-if="user.status !== '승인 반려'">
          <button
            v-if="user.status === '대기 중'"
            class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            @click="approveUser"
          >
            승인
          </button>

          <button
            class="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            @click="rejectUser"
          >
            {{ user.status === "승인" ? "탈퇴" : "거절" }}
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const route = useRoute();

const menus = [
  "회사 정보",
  "ESG 지표 관리",
  "ESG 성과 등록",
  "ESG 성과 분석",
  "공급망진단",
  "리포트 관리",
  "처교실",
  "시스템러",
];

const user = ref({
  name: route.query.name,
  id: route.query.id,
  email: route.query.email,
  companyCode: route.query.companyCode,
  status: route.query.status,
}
);

console.log(user.status);

const approveUser = () => {
  alert("✅ 회원 승인 처리 완료!");
  user.value.status = "승인";
};

const rejectUser = () => {
  const confirmDelete = confirm("정말 이 사용자를 삭제하시겠습니까?");
  if (confirmDelete) {
    alert("❌ 회원 삭제 처리 완료!");
    // 여기에서 실제 삭제 API 호출 또는 로직 구현
    router.push("/admin/user-search"); // 목록 페이지로 이동
  }
};
</script>
