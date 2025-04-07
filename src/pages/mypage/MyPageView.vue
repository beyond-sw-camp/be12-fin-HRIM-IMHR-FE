<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref({
  name: '홍길동',
  email: 'test_id@gmail.com',
  company: '삼성',
})

const activities = ref([
  { title: '활동내역1', date: '2025.01.12' },
  { title: '활동내역2', date: '2025.01.12' },
  { title: '활동내역3', date: '2025.01.14' },
  { title: '활동 내역 3', date: '2025.01.14' },
  { title: '피드백 2', date: '2025.01.14' },
  { title: '피드백 3', date: '2025.01.14' },
])

const goToChangePassword = () => {
  router.push('/change-password')
}

const logout = () => {
  alert('로그아웃 되었습니다.')
  router.push('/login')
}

const goToActivityDetail = () => {
  router.push('/activity/all')
}
</script>

<template>
  <div class="flex h-screen text-gray-800">
    <!-- ✅ 왼쪽 사용자 영역 -->
    <aside class="w-72 bg-white text-gray-800 flex flex-col items-center p-6 border-r border-gray-200">
      <h2 class="text-xl font-bold mb-6 text-slate-800">마이페이지</h2>

      <!-- 프로필 아이콘 -->
      <div class="w-20 h-20 rounded-full bg-yellow-400 text-white text-xl font-bold flex items-center justify-center mb-4">
        홈
      </div>

      <!-- 사용자 정보 -->
      <div class="text-center mb-6">
        <div class="text-lg font-semibold">{{ user.name }}</div>
        <div class="text-sm text-gray-600">{{ user.email }}</div>
        <div class="text-sm text-gray-400">{{ user.company }}</div>
      </div>

      <!-- 비밀번호 재설정 버튼 -->
      <button
        @click="goToChangePassword"
        class="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-900 text-sm font-semibold mb-3 transition"
      >
        비밀번호 재설정
      </button>

      <!-- 로그아웃 -->
      <button
        @click="logout"
        class="text-sm flex items-center gap-2 text-slate-800 hover:underline transition"
      >
        ⎋ 로그아웃
      </button>
    </aside>

    <!-- ✅ 오른쪽 본문 영역 -->
    <main class="flex-1 p-10 overflow-auto">
      <h3 class="text-2xl font-semibold text-slate-800 mb-6">활동 내역</h3>

      <!-- 활동 내역 테이블 -->
      <div class="border border-slate-200 rounded overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-slate-100 text-slate-700">
            <tr>
              <th class="text-left px-4 py-2">주제</th>
              <th class="text-right px-4 py-2">날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(activity, idx) in activities"
              :key="idx"
              class="border-t hover:bg-slate-50 cursor-pointer"
              @click="goToActivityDetail"
            >
              <td class="px-4 py-2">{{ activity.title }}</td>
              <td class="px-4 py-2 text-right">{{ activity.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 페이지네이션 -->
      <div class="mt-6 flex justify-center text-sm text-slate-600 space-x-2">
        <button class="hover:underline">&larr; 이전</button>
        <span class="font-bold text-black">1</span>
        <span>2</span>
        <span>3</span>
        <span>...</span>
        <span>68</span>
        <button class="hover:underline">다음 &rarr;</button>
      </div>
    </main>
  </div>
</template>
