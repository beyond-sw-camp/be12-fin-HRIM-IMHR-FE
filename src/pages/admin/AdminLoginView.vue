<script setup>
import { useRouter } from "vue-router";
import LogoSection from "../common/LogoSection.vue";

const router = useRouter();

const goToFindId = () => router.push("/find-id");
const goToResetPassword = () => router.push("/change-password"); // ✅ 수정된 경로
const goToCompanyRegister = () => router.push("/register/company");
const goToEmployeeRegister = () => router.push("/register/employee");
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen w-full">
    <!-- 왼쪽 로고 영역 -->
    <LogoSection />

    <!-- 로그인 영역 -->
    <div class="w-full md:w-1/2 flex items-center justify-center bg-white p-6">
      <div class="w-full max-w-sm p-6 border border-gray-200 rounded shadow-md">
        <h2 class="text-center mb-6 text-xl text-gray-800 font-semibold">
          IMHR에 오신 걸 환영합니다.
        </h2>

        <form>
          <label class="block mb-2 text-sm text-gray-700">이메일</label>
          <input
            type="email"
            class="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
          />

          <label class="block mb-2 text-sm text-gray-700">비밀번호</label>
          <input
            type="password"
            class="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
          />

          <!-- 권한 선택 -->
          <div class="flex items-center space-x-4 mb-4 text-sm text-gray-700">
            <label class="flex items-center">
              <input
                type="radio"
                name="role"
                value="admin"
                checked
                class="mr-1"
              />
              관리자
            </label>
            <label class="flex items-center">
              <input type="radio" name="role" value="employee" class="mr-1" />
              임직원
            </label>
          </div>

          <router-link to="/dashboard">
            <button
              type="submit"
              class="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-900 transition"
            >
              로그인
            </button>
          </router-link>
          
        </form>

        <!-- 회원가입 버튼 영역 -->
        <div class="flex flex-col gap-2 mt-4">
          <button
            @click="goToCompanyRegister"
            class="w-full bg-slate-700 text-white py-2 rounded hover:bg-slate-800 transition"
          >
            기업 회원가입
          </button>
          <button
            @click="goToEmployeeRegister"
            class="w-full bg-slate-700 text-white py-2 rounded hover:bg-slate-800 transition"
          >
            임직원 회원가입
          </button>
        </div>

        <!-- 하단 링크 -->
        <div class="flex justify-between text-sm mt-4 text-slate-400">
          <button @click="goToFindId" class="hover:underline">
            아이디 찾기
          </button>
          <span>|</span>
          <button @click="goToResetPassword" class="hover:underline">
            비밀번호 재설정
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
