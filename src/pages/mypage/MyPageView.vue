<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMemberStore } from '../../stores/useMemberStore'
import { useActivityStore } from '../../stores/useActivityStore'

const router = useRouter()
const memberStore = useMemberStore()
const activityStore = useActivityStore()

const currentPage = ref(1)
const perPage = 5
const selectedCategory = ref('전체') // ✅ 활동 카테고리 필터
const rawSubjects = ref('')

const user = ref({
  name: '',
  email: '',
  company: '',
  department: '',
  isAdmin: true,
})

// ✅ 활동 내역 데이터 (type 속성 포함)
const activities = ref([
  { title: '', date: '', type: '' },
])

// ✅ 카테고리 필터링된 활동들
const filteredActivities = computed(() => {
  if (selectedCategory.value === '전체') return activities.value
  return activities.value.filter(activity => activity.type === selectedCategory.value)
})

// ✅ 필터링된 활동에 기반한 페이지네이션
const totalPages = computed(() =>
  Math.ceil(filteredActivities.value.length / perPage)
)

const paginatedActivities = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredActivities.value.slice(start, start + perPage)
})

watch(selectedCategory, () => {
  currentPage.value = 1 // 필터 바꾸면 첫 페이지로 초기화
})

const goToChangePassword = () => router.push('/changePassword')

const logout = async () => {
  await memberStore.logout()
  alert('로그아웃 되었습니다.')
  router.push('/login')
}

const goToActivityDetail = (activityId, campaignIdx) => {
  if (campaignIdx === null) {
    router.push('/activeDetails/' + activityId)
  } else if (activityId === null) {
    router.push('/campaigndetail/' + campaignIdx)
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page
}

const userRole = ref(JSON.parse(localStorage.getItem('userInfo'))?.role || 'executive')

onMounted(async () => {
  const infoResponse = await memberStore.myPageInfo()
  rawSubjects.value = await activityStore.subjectListSearch()
  const activityResponse = await memberStore.myActivity()
  user.value = infoResponse.data.data
  activities.value = activityResponse.data.data.activities
  console.log(activities.value)
})
</script>


<template>
  <div class="flex h-screen bg-gray-50 text-slate-800" v-if="!user.isAdmin">
    <!-- 좌측 유저 정보 -->
    <aside class="w-72 bg-white border-r border-gray-200 p-6 flex flex-col items-center">
      <h2 class="text-xl font-bold mb-6">마이페이지</h2>
      <div class="w-20 h-20 rounded-full bg-yellow-400 text-white text-xl font-bold flex items-center justify-center mb-4">
        {{ user.name[0] || '홈' }}
      </div>
      <div class="text-center mb-6 space-y-1">
        <div class="text-lg font-semibold">{{ user.name }}</div>
        <div class="text-sm text-gray-600">{{ user.email }}</div>
        <div class="text-sm text-gray-400">{{ user.company }}</div>
        <div class="text-sm text-gray-400">{{ user.department.name }}</div>
      </div>
      <button @click="goToChangePassword" class="text-sm text-slate-700 hover:underline transition">
        비밀번호 재설정
      </button>
      <button @click="logout"
              class="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-900 text-sm font-semibold mb-3 transition">
        로그아웃
      </button>
    </aside>

    <!-- 우측 본문 -->
    <main class="flex-1 p-10 overflow-auto">
      <h3 class="text-2xl font-bold text-slate-800 mb-6">활동 내역</h3>

      <!-- ✅ 필터 셀렉트 -->
      <div class="mb-4 flex items-center gap-4">
        <label class="text-sm font-medium text-slate-700">활동 유형:</label>
        <select v-model="selectedCategory"
                class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-500">
          <option value="전체">전체</option>
          <option value="캠페인">캠페인</option>
          <option v-for="subject in rawSubjects"
            :key="subject._id"
            :value="subject.subject"
          >{{ subject.subject }}</option>
        </select>
      </div>

      <!-- 테이블 -->
      <div class="border border-slate-200 rounded-lg overflow-hidden shadow bg-white">
        <table class="w-full text-sm">
          <thead class="bg-slate-100 text-slate-700">
            <tr>
              <th class="text-left px-4 py-3">주제</th>
              <th class="text-right px-4 py-3">날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(activity, idx) in paginatedActivities" :key="idx"
                class="border-t hover:bg-slate-50 cursor-pointer transition"
                @click="goToActivityDetail(activity.activityId, activity.campaignIdx)">
              <td class="px-4 py-3">{{ activity.title }}</td>
              <td class="px-4 py-3 text-right">{{ activity.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 페이지네이션 -->
      <div class="mt-6 flex justify-center space-x-2 text-sm text-slate-600">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                class="px-3 py-1 border rounded disabled:opacity-40">이전</button>
        <button v-for="page in totalPages" :key="page"
                @click="goToPage(page)"
                :class="['px-3 py-1 border rounded',
                        page === currentPage ? 'bg-slate-800 text-white' : 'hover:bg-gray-100']">
          {{ page }}
        </button>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
                class="px-3 py-1 border rounded disabled:opacity-40">다음</button>
      </div>
    </main>
  </div>

  <!-- 관리자 뷰 -->
  <div v-if="user.isAdmin">
    <aside class="w-72 bg-white p-6 flex flex-col items-center">
      <h2 class="text-4xl font-bold mb-6">마이페이지</h2>
      <div class="w-20 h-20 rounded-full bg-yellow-400 text-white text-xl font-bold flex items-center justify-center mb-4">
        {{ user.name[0] }}
      </div>
      <div class="text-center mb-6 space-y-1">
        <div class="text-lg font-semibold">{{ user.name }}</div>
        <div class="text-sm text-gray-600">{{ user.email }}</div>
        <div class="text-sm text-gray-400">{{ user.company }}</div>
      </div>
      <button @click="goToChangePassword"
              class="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-900 text-sm font-semibold mb-3 transition">
        비밀번호 재설정
      </button>
      <button @click="logout" class="text-sm text-slate-700 hover:underline transition">
        ⎋ 로그아웃
      </button>
    </aside>
  </div>
</template>
