<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Header from "./pages/common/Header.vue";
import Sidebar from "./pages/common/Sidebar.vue";
<<<<<<< Updated upstream
import { ref } from "vue";

const route = useRoute();
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen;
=======

const route = useRouter();
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
>>>>>>> Stashed changes
};
</script>

<template>
<<<<<<< Updated upstream
  <div>
    <Header @toggle-sidebar="toggleSidebar"></Header>
    <Sidebar v-if="isSidebarOpen" />
    
    <main class="mt-16">
      <router-view></router-view>
    </main>
  </div>
=======
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
>>>>>>> Stashed changes
</template>

<style scoped>
</style>