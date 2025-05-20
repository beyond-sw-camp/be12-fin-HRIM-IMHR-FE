<script setup>
import { ref, onMounted, nextTick, computed } from "vue";
import { useRoute } from 'vue-router';

const route = useRoute();
const idx = route.params.idx;

// 날짜 범위 상태 추가
const dateRange = ref({
  startDate: route.query.startDate,
  endDate: route.query.endDate
});

// 활동내역과 피드백을 분리
const activities = [
  { topic: "활동내역1", type: "activity", date: "2025.01.12" },
  { topic: "활동내역2", type: "activity", date: "2025.01.12" },
  { topic: "활동내역3", type: "activity", date: "2025.01.14" },
  { topic: "활동 내역 3", type: "activity", date: "2025.01.14" },
];

const feedbacks = [
  { topic: "피드백 2", type: "feedback", date: "2025.01.14" },
  { topic: "피드백 3", type: "feedback", date: "2025.01.14" },
  { topic: "피드백 3", type: "feedback", date: "2025.01.14" },
  { topic: "피드백 3", type: "feedback", date: "2025.01.14" },
  { topic: "피드백 3", type: "feedback", date: "2025.01.14" },
];

const rightSection = ref(null);
const rightSectionHeight = ref(0);
const activeTab = ref('activity'); // 'activity' 또는 'feedback'

// 페이지네이션 관련 상태
const activityCurrentPage = ref(1);
const feedbackCurrentPage = ref(1);
const itemsPerPage = 2; // 페이지당 항목 수

// 날짜 범위에 따른 활동 필터링
const filteredActivities = computed(() => {
  return activities.filter(activity => {
    const activityDate = new Date(activity.date);
    const start = new Date(dateRange.value.startDate);
    const end = new Date(dateRange.value.endDate);
    return activityDate >= start && activityDate <= end;
  });
});

// 날짜 범위에 따른 피드백 필터링
const filteredFeedbacks = computed(() => {
  return feedbacks.filter(feedback => {
    const feedbackDate = new Date(feedback.date);
    const start = new Date(dateRange.value.startDate);
    const end = new Date(dateRange.value.endDate);
    return feedbackDate >= start && feedbackDate <= end;
  });
});

// 페이지네이션된 데이터 계산 수정
const paginatedActivities = computed(() => {
  const start = (activityCurrentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredActivities.value.slice(start, end);
});

// 페이지네이션된 피드백 데이터 계산 수정
const paginatedFeedbacks = computed(() => {
  const start = (feedbackCurrentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredFeedbacks.value.slice(start, end);
});

// 총 페이지 수 계산 수정
const totalActivityPages = computed(() => Math.ceil(filteredActivities.value.length / itemsPerPage));
const totalFeedbackPages = computed(() => Math.ceil(filteredFeedbacks.value.length / itemsPerPage));

// 날짜 변경 핸들러
const handleDateChange = () => {
  activityCurrentPage.value = 1; // 활동 내역 첫 페이지로 이동
  feedbackCurrentPage.value = 1; // 피드백 첫 페이지로 이동
};

// 페이지 이동 함수
const goToActivityPage = (page) => {
  if (page >= 1 && page <= totalActivityPages.value) {
    activityCurrentPage.value = page;
  }
};

const goToFeedbackPage = (page) => {
  if (page >= 1 && page <= totalFeedbackPages.value) {
    feedbackCurrentPage.value = page;
  }
};

onMounted(async () => {
  if (rightSection.value) {
    rightSectionHeight.value = rightSection.value.offsetHeight;
  }
});
</script>

<template>
  <div class="flex h-screen">
    <!-- Main Content -->
    <main class="flex-1 bg-white p-8">
      <header class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">리포트 상세 보기</h2>
      </header>

      <!-- Split Layout -->
      <div class="flex gap-8">
        <!-- Left: 기본 정보 및 피드백 -->
        <section
          class="w-1/2 flex flex-col justify-between"
          :style="{ minHeight: rightSectionHeight + 'px' }"
        >
          <!-- Report Info -->
          <div class="mb-8">
            <h3 class="text-xl font-semibold mb-2">기본 정보</h3>
            <ul class="list-disc list-inside pl-4">
              <li>성명: 홍길동</li>
              <li>직급: 과장</li>
              <li class="flex items-center gap-2">
                <span>대상 기간:</span>
                <input
                  type="date"
                  v-model="dateRange.startDate"
                  @change="handleDateChange"
                  class="border border-gray-300 rounded-md px-2 py-1"
                />
                <span>~</span>
                <input
                  type="date"
                  v-model="dateRange.endDate"
                  @change="handleDateChange"
                  class="border border-gray-300 rounded-md px-2 py-1"
                />
              </li>
              <li>총 ESG 인사 평가 점수: 87</li>
            </ul>
          </div>

          <!-- Feedback -->
          <!-- <div class="mb-8">
            <h3 class="text-xl font-semibold mb-2">2. 피드백 내용</h3>
            <ul class="list-disc list-inside pl-4">
              <li>성실하고 적극적으로 참여했습니다.</li>
              <li>열심히 하는 모습이 보기 좋네요.</li>
            </ul>
          </div> -->
        </section>

        <!-- Right: 활동 내역 및 피드백 -->
        <section class="w-1/2" ref="rightSection">
          <!-- 탭 버튼 -->
          <div class="flex mb-4 border-b">
            <button 
              @click="activeTab = 'activity'"
              class="px-4 py-2 font-semibold"
              :class="{ 'text-blue-600 border-b-2 border-blue-600': activeTab === 'activity' }"
            >
              활동 내역
            </button>
            <button 
              @click="activeTab = 'feedback'"
              class="px-4 py-2 font-semibold"
              :class="{ 'text-blue-600 border-b-2 border-blue-600': activeTab === 'feedback' }"
            >
              피드백 내역
            </button>
          </div>

          <!-- 활동 내역 탭 -->
          <div v-if="activeTab === 'activity'">
            <h3 class="text-xl font-semibold mb-2">회원 활동 내역</h3>
            <select class="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-slate-500 mb-2">
              <option>주제 선택</option>
              <option>봉사</option>
              <option>기부</option>
              <option>기타</option>
            </select>

            <table class="w-full border">
              <thead>
                <tr class="bg-gray-100">
                  <th class="text-left p-2">주제</th>
                  <th class="text-left p-2">날짜</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(activity, index) in paginatedActivities"
                  :key="index"
                  class="border-t"
                >
                  <td class="p-2">{{ activity.topic }}</td>
                  <td class="p-2">{{ activity.date }}</td>
                </tr>
              </tbody>
            </table>

            <!-- 활동 내역 페이지네이션 -->
            <div class="flex justify-center items-center mt-4 space-x-2">
              <button 
                @click="goToActivityPage(activityCurrentPage - 1)"
                :disabled="activityCurrentPage === 1"
                :class="{ 'text-gray-400 cursor-not-allowed': activityCurrentPage === 1 }"
              >
                ← 이전
              </button>
              <button 
                v-for="page in totalActivityPages" 
                :key="page"
                @click="goToActivityPage(page)"
                class="px-2 py-1 rounded"
                :class="{ 'bg-black text-white': activityCurrentPage === page }"
              >
                {{ page }}
              </button>
              <button 
                @click="goToActivityPage(activityCurrentPage + 1)"
                :disabled="activityCurrentPage === totalActivityPages"
                :class="{ 'text-gray-400 cursor-not-allowed': activityCurrentPage === totalActivityPages }"
              >
                다음 →
              </button>
            </div>
          </div>

          <!-- 피드백 탭 -->
          <div v-if="activeTab === 'feedback'">
            <h3 class="text-xl font-semibold mb-2">피드백 내역</h3>
            <table class="w-full border">
              <thead>
                <tr class="bg-gray-100">
                  <th class="text-left p-2">제목</th>
                  <th class="text-left p-2">날짜</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(feedback, index) in paginatedFeedbacks"
                  :key="index"
                  class="border-t"
                >
                  <td class="p-2">{{ feedback.topic }}</td>
                  <td class="p-2">{{ feedback.date }}</td>
                </tr>
              </tbody>
            </table>

            <!-- 피드백 페이지네이션 -->
            <div class="flex justify-center items-center mt-4 space-x-2">
              <button 
                @click="goToFeedbackPage(feedbackCurrentPage - 1)"
                :disabled="feedbackCurrentPage === 1"
                :class="{ 'text-gray-400 cursor-not-allowed': feedbackCurrentPage === 1 }"
              >
                ← 이전
              </button>
              <button 
                v-for="page in totalFeedbackPages" 
                :key="page"
                @click="goToFeedbackPage(page)"
                class="px-2 py-1 rounded"
                :class="{ 'bg-black text-white': feedbackCurrentPage === page }"
              >
                {{ page }}
              </button>
              <button 
                @click="goToFeedbackPage(feedbackCurrentPage + 1)"
                :disabled="feedbackCurrentPage === totalFeedbackPages"
                :class="{ 'text-gray-400 cursor-not-allowed': feedbackCurrentPage === totalFeedbackPages }"
              >
                다음 →
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
  
<style scoped>
</style>