<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Header from "./pages/common/Header.vue";
import Sidebar from "./pages/common/Sidebar.vue";

const route = useRouter();
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
<Header :toggleSidebar="toggleSidebar"></Header>

<div class="flex min-h-screen">
  <!-- 사이드바 -->
  <Sidebar :isOpen="isSidebarOpen" />

  <!-- 메인 컨텐츠 -->
  <div 
    :class="{ 'ml-64': isSidebarOpen, 'ml-0': !isSidebarOpen }" 
    class="flex-1 transition-all duration-300 mt-16 p-6 bg-gray-100"
  >
    <router-view />
  </div>
</div>
</template>

<style scoped>
</style>