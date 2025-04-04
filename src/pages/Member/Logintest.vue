<script setup>
import { useRouter } from 'vue-router';
import LogoSection from '../common/LogoSection.vue';

const route = useRouter();
</script>

<template>
  <div class="flex min-h-screen">
    <!-- 우측 로그셋션 -->
    <div class="hidden md:flex md:w-1/2 bg-gradient-to-b from-blue-500 to-blue-600 text-white justify-center items-center">
      <LogoSection />
    </div>

    <div class="w-full md:w-1/2 flex justify-center items-center bg-white p-6">
      <div class="w-full max-w-md border-2 border-blue-300 rounded-xl p-8 shadow-md">
        <p class="text-center text-gray-600 mb-4">
          <span class="text-blue-600 font-semibold">IMHR</span>에 오신 걸 환영합니다.
        </p>

        <form @submit.prevent="login" class="space-y-4">
          <input placeholder="이메일" class="input" />
          <input placeholder="비밀번호" class="input" />

          <!-- 역할 선택 -->
          <div class="flex justify-between items-center text-sm text-gray-700">
            <label>
              <input type="radio" name="role" /> 관리자
            </label>
            <label>
              <input type="radio" name="role" /> 임직원
            </label>
          </div>

          <button type="submit"
                  class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            로그인
          </button>

          <button type="button"
                  class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            기업 회원가입
          </button>

          <button type="button"
                  class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            임직원 회원가입
          </button>
        </form>

        <div class="mt-4 text-center text-sm text-gray-500">
          <router-link to="/find-id" class="hover:underline">아이디 찾기</router-link>
          &nbsp;|&nbsp;
          <router-link to="/reset-password" class="hover:underline">비밀번호 재설정</router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.input {
  @apply w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200;
}
</style>