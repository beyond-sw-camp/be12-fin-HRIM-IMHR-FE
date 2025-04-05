<script setup>
import { useRouter } from 'vue-router'
import LogoSection from '../common/LogoSection.vue'

const router = useRouter()
</script>

<template>
  <div class="flex flex-col md:flex-row min-h-screen">

    <!-- 왼쪽 브랜드 영역 -->
    <div class="hidden md:flex md:w-1/2 bg-gradient-to-b from-blue-500 to-blue-600 text-white flex-col justify-center items-center p-12">
      <h1 class="text-4xl font-bold mb-4">IM HR</h1>
      <p class="text-center text-lg leading-relaxed">
        기업의 모든 이해 관계자 가치를 높이고<br />
        지속가능한 미래를 실현합니다.
      </p>
    </div>

    <!-- 모바일용 로고 -->
    <div class="md:hidden flex justify-center items-center w-full py-6 bg-gradient-to-b from-blue-500 to-blue-600">
      <LogoSection />
    </div>

    <!-- 오른쪽 비밀번호 찾기 폼 -->
    <div class="w-full md:w-1/2 flex justify-center items-center bg-white p-6">
      <div class="w-full max-w-md border-2 border-blue-300 rounded-xl p-8 shadow-md bg-white">
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
            class="w-full py-3 border border-blue-500 text-blue-600 font-semibold rounded hover:bg-blue-50"
          >
            이메일 인증 요청
          </button>
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
