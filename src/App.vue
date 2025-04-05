<script setup>
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import Header from './pages/common/Header.vue'
import Sidebar from './pages/common/Sidebar.vue'

const isSidebarOpen = ref(false)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const route = useRoute()
const hideLayout = computed(() => route.meta?.hideLayout === true)
</script>

<template>
  <div>
    <!-- 헤더 -->
    <Header v-if="!hideLayout" :toggleSidebar="toggleSidebar" />

    <!-- 레이아웃 -->
    <div class="flex" :class="{ 'pt-16': !hideLayout }">
      <Sidebar v-if="!hideLayout" :isOpen="isSidebarOpen" />

      <main
        class="flex-1 min-h-screen transition-all duration-300"
        :class="{
          'ml-64': isSidebarOpen && !hideLayout,
          'ml-0': hideLayout
        }"
      >
        <router-view />
      </main>
    </div>
  </div>
</template>
