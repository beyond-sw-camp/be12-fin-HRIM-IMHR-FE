<script setup>
import { useRoute } from "vue-router";
import Header from "./pages/common/Header.vue";
import Sidebar from "./pages/common/Sidebar.vue";
import { ref } from "vue";

const route = useRoute();
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen;
};
</script>

<template>
  <div>
    <Header @toggle-sidebar="toggleSidebar"></Header>
    <Sidebar v-if="isSidebarOpen" />
    
    <main class="mt-16">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
</style>