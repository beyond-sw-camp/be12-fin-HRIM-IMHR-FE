<script setup>
import { computed } from "vue";
import { useMemberStore } from "../../../stores/useMemberStore";

const memberStore = useMemberStore();
const props = defineProps({
  isOpen: Boolean,
});

const menuItems = [
  { path: `/partner/${memberStore.myCompanyIdx}`, label: "기업 ESG 현황" },
  { path: "/departmentdashboard", label:"부서 ESG 현황"},
  { path: "/activityList", label: "ESG 활동 관리" },
  { path: "/campaignlist", label: "ESG 사내 캠페인 관리" },
  { path: "/productList/1", label: "친환경 제품 관리" },
  { path: "/partnerList", label: "협력사 관리" },
  { path: "/staffSearch", label: "사원 관리" },
  { path: "/calendar", label: "캘린더 관리" },
  { path: "/departmentSetting", label: "부서 설정" },
  { path: "/feedbackForm", label: "피드백 설정" },
  { path: "/activeSetting", label: "ESG 활동 주제 설정" },
];
</script>

<template>
  <aside
    class="fixed top-16 left-0 w-64 h-full bg-gradient-to-b from-slate-800 to-slate-900 text-white z-20 shadow-2xl border-r border-slate-700 transform transition-transform duration-300 ease-in-out"
    :class="{
      '-translate-x-full': !isOpen,
      'translate-x-0': isOpen,
    }"
  >
    <nav class="mt-5">
      <ul class="p-4 space-y-1">
        <li v-for="item in menuItems" :key="item.path">
          <router-link
            :to="item.path"
            class="block px-4 py-2 rounded-md transition duration-200 hover:bg-slate-700 hover:shadow-md hover:scale-[1.01] border-l-4"
            :class="{
              'border-emerald-400 bg-slate-700 font-semibold':
                $route.path.startsWith(item.path),
              'border-transparent': !$route.path.startsWith(item.path),
            }"
          >
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
