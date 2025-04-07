<script setup>
import { useRouter } from 'vue-router'
import LogoSection from '../common/LogoSection.vue'

const router = useRouter()
</script>

<template>
  <div class="flex flex-col md:flex-row min-h-screen">

    <!-- 왼쪽 로고고 영역 -->
    <div class="hidden md:flex md:w-1/2 bg-gradient-to-b from-slate-800 to-slate-900 text-white flex-col justify-center items-center p-12">
      <LogoSection/>
    </div>

    <!-- 왼쪽 로고 영역 모바일용 로고 -->
    <div class="md:hidden flex justify-center items-center w-full py-6 bg-gradient-to-b from-slate-800 to-slate-900">
      <LogoSection />
    </div>

    <!-- 오른쪽 비밀번호 찾기 폼 -->
    <div class="w-full md:w-1/2 flex justify-center items-center bg-white p-6">
      <div class="w-full max-w-md border-2 border-slate-800 rounded-xl p-8 shadow-md bg-white">
        <h2 class="text-center text-2xl font-semibold text-gray-800 mb-6">비밀번호 찾기</h2>

        <p class="text-sm text-gray-600 mb-4">이메일로 인증</p>

        <form @submit.prevent class="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="아이디"
            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="email"
            placeholder="이메일"
            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <button
            type="submit"
            class="w-full py-3 border border-slate-800 text-slate-800 font-semibold rounded hover:bg-blue-50"
          >
            임직원 회원가입
          </button>

          <router-link
            type="submit"
            class="w-full py-3 item-center border border-slate-800 text-slate-8000 font-semibold rounded hover:bg-blue-50"
          >
            관리자 회원가입
          </router-link>
        </form>

        <div class="mt-6 text-center text-sm text-gray-500">
          <router-link to="/login" class="hover:underline">로그인</router-link>
          &nbsp;|&nbsp;
          <router-link to="/find-id" class="hover:underline">아이디찾기</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
