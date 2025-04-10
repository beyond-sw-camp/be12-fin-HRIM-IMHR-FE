<script setup>
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import Header from './pages/common/Header.vue'
import Sidebar from './pages/common/ExecutiveSidebar.vue'

// 사이드바 열림 상태
const isSidebarOpen = ref(true)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// 현재 라우터 정보
const route = useRoute()

// 로그인 페이지 등에서는 레이아웃 숨김
const hideLayout = computed(() => route.meta?.hideLayout === true)
</script>

<template>
  <div>
    <!-- 헤더 -->
    <Header v-if="!hideLayout" @toggle-sidebar="toggleSidebar" />

    <!-- 레이아웃 -->
    <div class="flex" :class="{ 'pt-16': !hideLayout }">
      <!-- 사이드바 -->
      <Sidebar v-if="!hideLayout" :isOpen="isSidebarOpen" />

      <!-- 메인 콘텐츠 -->
      <main
        class="flex-1 min-h-screen transition-all duration-300"
        :class="{
          'ml-0': !isSidebarOpen || hideLayout,
          'ml-64': isSidebarOpen && !hideLayout
        }"
      >
        <router-view />
      </main>
    </div>
  </div>
</template>
