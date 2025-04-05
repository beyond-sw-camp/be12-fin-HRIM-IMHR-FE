<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToFindId = () => {
  router.push('/find-id')
}

const goToResetPassword = () => {
  router.push('/reset-password')
}

const goToCompanyRegister = () => {
  router.push('/register/company')
}

const goToEmployeeRegister = () => {
  router.push('/register/employee')
}
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen w-full">
    <!-- 왼쪽 브랜드 영역 -->
    <div class="hidden md:flex w-full md:w-1/2 bg-gradient-to-r from-blue-500 to-blue-700 text-white items-center justify-center flex-col px-10">
      <h1 class="text-4xl font-bold mb-4">IM HR</h1>
      <p class="text-lg text-center leading-relaxed">
        기업의 모든 이해 관계자 가치를 높이고<br />
        지속가능한 미래를 실현합니다.
      </p>
    </div>

    <!-- 로그인 폼 -->
    <div class="w-full md:w-1/2 flex items-center justify-center bg-white p-6">
      <div class="w-full max-w-sm p-6 border border-gray-200 rounded shadow-md">
        <h2 class="text-center mb-6 text-xl text-gray-800 font-semibold">IMHR에 오신 걸 환영합니다.</h2>
        
        <form>
          <label class="block mb-2 text-sm text-gray-700">이메일</label>
          <input type="email" class="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300" />

          <label class="block mb-2 text-sm text-gray-700">비밀번호</label>
          <input type="password" class="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300" />

          <!-- 권한 선택 -->
          <div class="flex items-center space-x-4 mb-4 text-sm text-gray-700">
            <label class="flex items-center">
              <input type="radio" name="role" value="admin" checked class="mr-1" />
              관리자
            </label>
            <label class="flex items-center">
              <input type="radio" name="role" value="employee" class="mr-1" />
              임직원
            </label>
          </div>

          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            로그인
          </button>
        </form>

        <!-- 링크 버튼 영역 -->
        <div class="flex justify-between text-sm mt-4 text-gray-600">
          <button @click="goToFindId" class="hover:underline">아이디 찾기</button>
          <span>|</span>
          <button @click="goToResetPassword" class="hover:underline">비밀번호 재설정</button>
        </div>

        <!-- 회원가입 버튼 영역 -->
        <div class="flex flex-col gap-2 mt-6">
          <button @click="goToCompanyRegister"
                  class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            기업 회원가입
          </button>
          <button @click="goToEmployeeRegister"
                  class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            임직원 회원가입
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
