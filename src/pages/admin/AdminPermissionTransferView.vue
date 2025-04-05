<template>
  <div class="flex min-h-screen">

    <!-- 🌞 메인 영역 -->
    <main class="flex-1 bg-gray-100 p-6 md:p-10">

      <!-- 프로필 카드 -->
      <div class="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row justify-between gap-8">
        <!-- 왼쪽: 프로필 정보 -->
        <div class="flex-1 space-y-4">
          <div>
            <h3 class="text-xl font-bold text-gray-800">{{ user.name }}</h3>
            <p class="text-gray-500">{{ user.email }}</p>
          </div>
          <div>
            <label class="block text-sm mb-1 text-gray-700">부서 선택</label>
            <select v-model="user.department" class="w-full border px-4 py-2 rounded">
              <option disabled value="">부서를 선택하세요</option>
              <option v-for="dept in departments" :key="dept">{{ dept }}</option>
            </select>
          </div>
          <p class="text-sm text-gray-400 mt-2">등록일: {{ user.registeredAt }}</p>
        </div>

        <!-- 오른쪽: 권한 설정 -->
        <div class="flex-1">
          <h4 class="font-semibold mb-3">접근 권한</h4>
          <div class="grid grid-cols-2 gap-2">
            <label
              v-for="permission in permissions"
              :key="permission"
              class="flex items-center space-x-2 text-sm"
            >
              <input
                type="checkbox"
                v-model="user.permissions"
                :value="permission"
                class="accent-blue-500"
              />
              <span>{{ permission }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- 버튼 -->
      <div class="mt-8 flex flex-col sm:flex-row justify-end gap-4">
        <button
          @click="save"
          class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          저장
        </button>
        <button
          @click="terminate"
          class="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          탈퇴 처리
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menus = ['회원관리', 'ESG 성과 등록', 'E56 성과 분석', '공급망진단', '리포트 관리', '처교실', '시스템러']

const user = ref({
  name: '홍길동',
  email: 'admin@example.com',
  department: '',
  registeredAt: '2024.03.01',
  permissions: [],
})

const departments = ['인사팀', '재무팀', 'ESG팀', '기획팀']

const permissions = ['임원 권한', '사원 권한', '관리자 권한', '슈퍼 관리자 권한']

const save = () => {
  alert('✅ 권한 저장 완료!')
  console.log('✔️ 선택된 권한:', user.value.permissions)
}

const terminate = () => {
  const confirmed = confirm('정말 탈퇴 처리하시겠습니까?')
  if (confirmed) {
    alert('❌ 탈퇴 처리 완료')
  }
}
</script>
