<script setup>
import { ref } from 'vue'
import LogoSection from '../common/LogoSection.vue' // ✅ 경로 확인!

const form = ref({
  username: '',
  email: ''
})

const submit = () => {
  console.log('비밀번호 재설정 요청:', form.value)
  alert('입력된 이메일로 인증 요청이 전송되었습니다.')
}
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen w-full">
    <!-- 좌측 브랜드 영역 -->
    <LogoSection />

    <!-- 우측 폼 영역 -->
    <div class="w-full md:w-1/2 flex justify-center items-center bg-white p-6">
      <div class="w-full max-w-sm p-6 border border-gray-200 rounded shadow-md">
        <h2 class="text-xl font-semibold text-center mb-6">비밀번호 찾기</h2>

        <form @submit.prevent="submit" class="space-y-4">
          <div>
            <label class="text-sm text-gray-700 block mb-1">이메일로 인증</label>
            <input v-model="form.username" type="text" placeholder="아이디" class="input" />
            <input v-model="form.email" type="email" placeholder="이메일" class="input mt-2" />
          </div>

          <button type="submit"
                  class="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-900 transition">
            이메일 인증 요청
          </button>
        </form>

        <div class="mt-4 text-center text-sm text-slate-400">
          <router-link to="/login" class="hover:underline">로그인</router-link>
          &nbsp;|&nbsp;
          <router-link to="/findId" class="hover:underline">아이디 찾기</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  @apply w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-slate-500;
}
</style>
