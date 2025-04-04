<script setup>
import { useRouter } from "vue-router";
<<<<<<< Updated upstream
import { ref, defineEmits } from "vue";
import Sidebar from "./Sidebar.vue";
=======
import { defineProps } from "vue";
>>>>>>> Stashed changes

const route = useRouter();
const emit = defineEmits(["toggle-sidebar"]);

<<<<<<< Updated upstream
// 사이드 바 상태
const toggleSidebar = () => {
  emit("toggle-sidebar");
};
=======
const props = defineProps(["toggleSidebar"]);
>>>>>>> Stashed changes
</script>

<template>
  <header
    class="bg-white shadow-md w-full w-screen h-16 flex items-center px-6 fixed top-0 left-0 z-50"
  >
    <!-- 왼쪽 로고 -->
    <div class="flex items-center gap-2">
      <router-link to="/test">
        <div class="text-blue-600 font-bold text-5xl">IMHR</div>
      </router-link>

<<<<<<< Updated upstream
      <button @click="toggleSidebar" class="p-2 bg-transparent border-none">
        <img 
        style="width: 100%; height: auto"
        src="/src/assets/icon/mynaui_tally-three.png" />
=======
      <button
        @click="props.toggleSidebar"
        class="p-2 bg-transparent border-none"
      >
        <img
          style="width: 100%; height: auto"
          src="/src/assets/icon/mynaui_tally-three.png"
        />
>>>>>>> Stashed changes
      </button>
    </div>

    <!-- 오른쪽 사용자 정보 - 로그인 후 -->
    <div class="flex items-center gap-4 ml-auto">
      <router-link class="text-gray-900 text-4xl" to="/test">
        홍길동
      </router-link>
      <!-- 수정 해야함 -->
      <router-link to="/test">
        <img
          src="/src/assets/icon/mynaui_bell.png"
          style="width: 80%; height: auto"
        />
      </router-link>

      <button
        type="button"
        class="rounded hidden border border-blue-700 py-1.5 px-2 text-center text-sm font-medium text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 md:inline-block rounded-lg"
      >
        로그아웃
      </button>
    </div>

  </header>
</template>

<style scoped>
</style>