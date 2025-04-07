<script setup>
import { defineEmits, defineProps } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['toggle-sidebar'])
const props = defineProps(['toggleSidebar'])

const router = useRouter()

// 로그아웃 처리 함수
const handleLogout = () => {
  // 예시: localStorage 초기화 (필요 시)
  localStorage.removeItem('accessToken')
  localStorage.removeItem('userInfo')

  // 로그인 페이지로 이동
  router.push('/login')
}
</script>

<template>
  <header class="bg-white shadow-md w-full h-16 flex items-center px-6 fixed top-0 left-0 z-50">
    <!-- 왼쪽 로고 -->
    <div class="flex items-center gap-2">
      <router-link to="/">
        <div class="text-slate-800 font-bold text-2xl md:text-4xl">IMHR</div>
      </router-link>

      <button @click="props.toggleSidebar" class="p-2">
        <img src="/src/assets/icon/mynaui_tally-three.png" alt="menu" class="w-6 h-6" />
      </button>
    </div>

    <!-- 오른쪽 사용자 정보 -->
    <div class="flex items-center gap-4 ml-auto">
      <router-link class="text-gray-900 text-base md:text-xl font-medium" to="/mypage">
        홍길동
      </router-link>

      <router-link to="/notifications">
        <img src="/src/assets/icon/mynaui_bell.png" alt="bell" class="w-6 h-6" />
      </router-link>

      <!-- 로그아웃 버튼 -->
      <button
        @click="handleLogout"
        type="button"
        class="hidden md:inline-block border border-slate-800 py-1.5 px-3 text-sm text-slate-800 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        로그아웃
      </button>
    </div>
  </header>
</template>
