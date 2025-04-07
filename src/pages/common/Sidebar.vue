<script setup>
import { defineProps } from "vue";

const props = defineProps({
  isOpen: Boolean
});
</script>

<template>
  <aside
    class="fixed top-16 left-0 w-64 h-full bg-slate-800 text-white z-50 transition-transform duration-300"
    :class="{ '-translate-x-full': !isOpen, 'translate-x-0': isOpen }"
  >
    <nav class="mt-5">
      <ul class="p-4 space-y-4">
        <li>
          <router-link to="/dashboard" class="block hover:bg-slate-700 px-4 py-2 rounded-md">ESG 현황</router-link>
        </li>
        <li>
          <router-link to="/admin/user-search" class="block hover:bg-slate-700 px-4 py-2 rounded-md">사원 관리</router-link>
        </li>
        <li>
          <router-link to="/products/1" class="block hover:bg-slate-700 px-4 py-2 rounded-md">친환경 제품 관리</router-link>
        </li>
        <li>
          <!-- 캘린더: 추후 구현 예정 -->
          <span class="block px-4 py-2 text-slate-400 cursor-not-allowed">캘린더</span>
        </li>
        <li>
          <router-link to="/activity" class="block hover:bg-slate-700 px-4 py-2 rounded-md">ESG 활동 관리</router-link>
        </li>
        <li>
          <router-link to="/education" class="block hover:bg-slate-700 px-4 py-2 rounded-md">교육 관리</router-link>
        </li>
        <li>
          <router-link to="/admin/campaign-list" class="block hover:bg-slate-700 px-4 py-2 rounded-md">사내 캠페인 관리</router-link>
        </li>
        <li>
          <router-link to="/partnerList" class="block hover:bg-slate-700 px-4 py-2 rounded-md">협력사 관리</router-link>
        </li>
        <li>
          <!-- 설정: 추후 구현 예정 -->
          <span class="block px-4 py-2 text-slate-400 cursor-not-allowed">설정</span>
        </li>
      </ul>
    </nav>
  </aside>
</template>


<style scoped>
</style>