<script setup>
import { X } from "lucide-vue-next";
import { ref, watch } from "vue";

const props = defineProps({
  visible: Boolean,
  year: Number,
  month: Number,
  departmentName: String,
  companyIdx: Number,
  departmentIdx: Number,
  title: String,
  grafanaUrl: String,
});

defineEmits(["close"]);
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-40"
  >
    <div
      class="relative bg-white rounded shadow-lg p-8 min-w-[800px] max-w-[1100px]"
    >
      <button
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        @click="$emit('close')"
        aria-label="닫기"
      >
        <X class="w-7 h-7" />
      </button>
      <h2 class="text-2xl font-bold text-slate-700 mb-6">
        {{ props.departmentName }}부서 {{ props.title }} 점수 상세 대시보드
      </h2>
      <div class="grid grid-cols-2 gap-6 mb-6">
        <!-- 상단 두 개 패널 -->
        <iframe
          :src="`https://www.imhr.p-e.kr/grafana/d-solo/${props.grafanaUrl}&from=now-5y&to=now&timezone=browser&var-company_idx=${props.companyIdx}&var-department_idx=${props.departmentIdx}&var-year=${props.year}&var-month=${props.month}&panelId=1&__feature.dashboardSceneSolo`"
          frameborder="0"
          class="w-full h-[250px] rounded border bg-white"
          allowfullscreen
        ></iframe>
        <iframe
          :src="`https://www.imhr.p-e.kr/grafana/d-solo/${props.grafanaUrl}&from=now-5y&to=now&timezone=browser&var-company_idx=${props.companyIdx}&var-department_idx=${props.departmentIdx}&var-year=${props.year}&var-month=${props.month}&panelId=2&__feature.dashboardSceneSolo`"
          frameborder="0"
          class="w-full h-[250px] rounded border bg-white"
          allowfullscreen
        ></iframe>
      </div>
      <!-- 하단 하나 패널 -->
      <iframe
        :src="`https://www.imhr.p-e.kr/grafana/d-solo/${props.grafanaUrl}&from=now-5y&to=now&timezone=browser&var-company_idx=${props.companyIdx}&var-department_idx=${props.departmentIdx}&var-year=${props.year}&var-month=${props.month}&panelId=3&__feature.dashboardSceneSolo`"
        frameborder="0"
        class="w-full h-[320px] rounded border bg-white"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<style scopde></style>
