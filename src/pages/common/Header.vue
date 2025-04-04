<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import Sidebar from "./Sidebar.vue";

const route = useRouter();

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <header
    class="bg-white shadow-md w-full h-16 flex items-center px-6 fixed top-0 left-0 z-50"
  >
    <!-- 왼쪽 로고 -->
    <div class="flex items-center gap-2">
      <router-link to="/test">
        <div class="text-blue-600 font-bold text-5xl">IMHR</div>
      </router-link>

      <button @click="toggleSidebar" class="p-2 bg-transparent border-none">
        <img
          style="width: 100%; height: auto"
          src="/src/assets/icon/mynaui_tally-three.png"
        />
      </button>
    </div>

    <!-- 오른쪽 사용자 정보 -->
    <div class="flex items-center gap-4 ml-auto">
      <router-link class="text-gray-900 text-4xl" to="/test">
        홍길동 님
      </router-link>
      <!-- 수정 해야함함 -->
      <router-link to="/test">
        <img
          src="/src/assets/icon/mynaui_bell.png"
          style="width: 80%; height: auto"
        />
      </router-link>
    </div>
  </header>

  <div class="flex">
    <!-- ✅ 사이드바 -->
    <Sidebar :isOpen="isSidebarOpen" />

    <!-- ✅ 메인 컨텐츠: 사이드바 열릴 때만 오른쪽 이동 -->
    <main
      class="flex-1 min-h-screen transition-all duration-300 pt-16"
      :class="{ 'ml-64': isSidebarOpen, 'ml-0': !isSidebarOpen }"
    >
      <router-view />
    </main>
  </div>
</template>

<style scoped>
</style>