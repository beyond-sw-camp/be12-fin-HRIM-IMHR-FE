<script setup>
const props = defineProps({
  isOpen: Boolean,
});

const menuSections = [
  {
    title: "",
    items: [
      { path: "/partner/1", label: "기업 ESG 현황" },
      // { path: '/dashboard', label: '부서서 ESG 현황' }, ???
      { path: "/education/1", label: "ESG 교육 관리" },
      { path: "/activity/1", label: "ESG 활동 관리" },
      { path: "/admin/campaign-list/1", label: "ESG 사내 캠페인 관리" },
      { path: "/productList/1", label: "친환경 제품 관리" },
      { path: "/partnerList/1", label: "협력사 관리" },
      // { path: "/reports", label: "인사 리포트 관리" },
      { path: "/admin/user-search/1", label: "사원 관리" },
      { path: "/calendar/1", label: "캘린더"},
      { path: "/setting/1", label: "부서 설정" },
      { path: "/feedbackForm/1", label: "피드백 설정"},
    ],
  },
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
      <ul class="p-4 space-y-6">
        <li v-for="section in menuSections" :key="section.title">
          <div class="text-xs text-slate-400 uppercase tracking-wide px-2 mb-2">
            {{ section.title }}
          </div>
          <ul class="space-y-1">
            <li v-for="item in section.items" :key="item.path">
              <router-link
                :to="item.path"
                class="block px-4 py-2 rounded-md transition duration-200 hover:bg-slate-700 hover:shadow-md hover:scale-[1.01] border-l-4"
                :class="{
                  'border-emerald-400 bg-slate-700 font-semibold':
                    $route.path === item.path,
                  'border-transparent': $route.path !== item.path,
                }"
              >
                {{ item.label }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>