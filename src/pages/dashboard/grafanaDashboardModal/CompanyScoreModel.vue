<script setup>
import { X } from "lucide-vue-next";
import { ref, watch } from "vue";

const props = defineProps({
  visible: Boolean,
  year: Number,
  companyName: String,
  companyIdx: Number,
  title: String,
  grafanaUrl: String,
});

watch(
  () => ({ ...props }),
  (newVal) => {
    console.log("props 변경됨:", newVal);
  },
  { deep: true, immediate: true }
);

defineEmits(["close"]);
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-40"
  >
    <div class="relative bg-white rounded shadow-lg p-8 min-w-[700px] max-w-[1100px] w-full">
      <button
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        @click="$emit('close')"
        aria-label="닫기"
      >
        <X class="w-7 h-7" />
      </button>
      <h2 class="text-2xl font-bold text-slate-700 mb-6">
        {{ props.companyName }}기업 {{ props.title }} 점수 상세 대시보드
      </h2>

      <!-- 맨 위: 게이지 2개 나란히 (공백 최소화) -->
      <div class="flex gap-4 mb-6">
        <iframe
          :src="`https://www.imhr.p-e.kr/grafana/d-solo/${props.grafanaUrl}&from=1747258982598&to=1747280582598&timezone=browser&var-year=${props.year}&var-company_idx=${props.companyIdx}&panelId=1&__feature.dashboardSceneSolo`"
          frameborder="0"
          class="flex-1 h-[160px] rounded border bg-white"
          allowfullscreen
        ></iframe>
        <iframe
          :src="`https://www.imhr.p-e.kr/grafana/d-solo/${props.grafanaUrl}&from=1747258982598&to=1747280582598&timezone=browser&var-year=${props.year}&var-company_idx=${props.companyIdx}&panelId=2&__feature.dashboardSceneSolo`"
          frameborder="0"
          class="flex-1 h-[160px] rounded border bg-white"
          allowfullscreen
        ></iframe>
      </div>

      <!-- 가운데: 선그래프 -->
      <div class="mb-6">
        <iframe
          :src="`https://www.imhr.p-e.kr/grafana/d-solo/${props.grafanaUrl}&from=1747270938306&to=1747292538306&timezone=browser&var-year=${props.year}&var-company_idx=${props.companyIdx}&panelId=3&__feature.dashboardSceneSolo`"
          frameborder="0"
          class="w-full h-[220px] rounded border bg-white"
          allowfullscreen
        ></iframe>
      </div>

      <!-- 맨 아래: 도표(테이블) -->
      <div>
        <iframe
          :src="`https://www.imhr.p-e.kr/grafana/d-solo/${props.grafanaUrl}&from=1747270938306&to=1747292538306&timezone=browser&var-year=${props.year}&var-company_idx=${props.companyIdx}&panelId=4&__feature.dashboardSceneSolo`"
          frameborder="0"
          class="w-full h-[260px] rounded border bg-white"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>



<style scopde></style>
