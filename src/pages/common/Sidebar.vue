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
        <li><router-link to="/profile" class="block py-2 px-4 hover:bg-slate-700 px-4 py-2 rounded-md">ESG 현황</router-link></li>
        <li><router-link to="/dashboard" class="block py-2 px-4 hover:bg-slate-700 px-4 py-2 rounded-md">사원 관리</router-link></li>
        <li><router-link to="/profile" class="block py-2 px-4 hover:bg-slate-700 px-4 py-2 rounded-md">친환경 제품 관리</router-link></li>
        <li><router-link to="/settings" class="block py-2 px-4 hover:bg-slate-700 px-4 py-2 rounded-md">캘린더</router-link></li>
        <li><router-link to="/profile" class="block py-2 px-4 hover:bg-slate-700 px-4 py-2 rounded-md">ESG 활동 관리</router-link></li>
        <li><router-link to="/profile" class="block py-2 px-4 hover:bg-slate-700 px-4 py-2 rounded-md">교육 관리</router-link></li>
        <li><router-link to="/profile" class="block py-2 px-4 hover:bg-slate-700 px-4 py-2 rounded-md">사내 캠페인 관리</router-link></li>
        <li><router-link to="/profile" class="block py-2 px-4 hover:bg-slate-700 px-4 py-2 rounded-md">협력사 관리</router-link></li>
        <li><router-link to="/profile" class="block py-2 px-4 hover:bg-slate-700 px-4 py-2 rounded-md">설정</router-link></li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
</style>