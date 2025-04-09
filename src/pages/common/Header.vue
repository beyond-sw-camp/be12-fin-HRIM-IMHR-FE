<script setup>
import { defineEmits, defineProps } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['toggle-sidebar'])
const props = defineProps(['toggleSidebar'])

const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('userInfo')
  router.push('/login')
}
</script>

<template>
  <header class="bg-white shadow-md w-full h-16 flex items-center px-6 fixed top-0 left-0 z-50">
    <!-- 🔹 로고 & 메뉴 버튼 -->
    <div class="flex items-center gap-3">
      <router-link to="/" class="text-slate-800 font-bold text-2xl md:text-3xl">IMHR</router-link>
      <button @click="props.toggleSidebar" class="p-1 hover:bg-slate-100 rounded">
        <img src="/src/assets/icon/mynaui_tally-three.png" alt="menu" class="w-6 h-6" />
      </button>
    </div>

    <!-- 🔹 오른쪽 사용자 정보 -->
    <div class="flex items-center gap-4 ml-auto">
      <router-link to="/mypage" class="text-slate-700 text-base md:text-lg font-medium hover:underline">
        홍길동
      </router-link>

      <router-link to="/notifications">
        <img src="/src/assets/icon/mynaui_bell.png" alt="알림" class="w-6 h-6 hover:opacity-80 transition" />
      </router-link>

      <!-- 로그아웃 버튼 -->
      <button
          @click="handleLogout"
          type="button"
          class="hidden md:inline-block border border-slate-800 py-1.5 px-4 text-sm text-slate-800 rounded hover:bg-slate-100 transition"
      >
        로그아웃
      </button>
    </div>
  </header>
</template>
