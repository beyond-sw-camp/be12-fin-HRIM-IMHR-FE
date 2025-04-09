<script setup>
import { ref } from 'vue'
import LogoSection from '../common/LogoSection.vue'

const form = ref({
  companyName: '',
  businessNumber: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const submit = () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }
  console.log('기업 회원가입:', form.value)
  alert('회원가입이 완료되었습니다!')
}
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen w-full">
    <LogoSection />

    <div class="w-full md:w-1/2 flex justify-center items-center bg-white p-6">
      <div class="w-full max-w-sm p-6 border border-gray-200 rounded shadow-md">
        <h2 class="text-xl font-semibold text-center mb-6">기업 회원가입</h2>

        <form @submit.prevent="submit" class="space-y-3">
          <input v-model="form.companyName" type="text" placeholder="회사명" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-slate-500" />
          <input v-model="form.businessNumber" type="text" placeholder="사업자등록번호" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-slate-500" />
          <input v-model="form.email" type="email" placeholder="이메일" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-slate-500" />
          <input v-model="form.password" type="password" placeholder="비밀번호" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-slate-500" />
          <input v-model="form.confirmPassword" type="password" placeholder="비밀번호 확인" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-slate-500" />

          <button type="submit"
                  class="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-900 transition">
            회원가입
          </button>
        </form>

        <div class="mt-4 text-center text-sm text-slate-400">
          <router-link to="/login" class="hover:underline">로그인</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
