<template>
  <div class="bg-white p-8 rounded shadow-md max-w-3xl mx-auto">
    <!-- 상단: 사원 정보 표시 -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-slate-800 mb-1">사원 피드백 작성</h2>
      <p class="text-slate-600 text-sm">👤 대상 사원 ID: <span class="font-semibold">{{ userId }}</span></p>
    </div>

    <!-- 피드백 항목 입력 -->
    <div v-for="(item, index) in feedbackItems" :key="index" class="mb-6">
      <label class="block font-semibold text-gray-800 mb-2">
        항목 {{ index + 1 }}: {{ item.title }}
      </label>

      <div>
        <label class="text-gray-600 block mb-1">내용 입력</label>
        <textarea
          class="w-full p-3 border border-gray-300 rounded"
          v-model="item.content"
          rows="3"
          placeholder="이 동료에 대한 피드백을 작성해주세요"
        ></textarea>
      </div>
    </div>

    <div class="text-right mt-8 flex gap-3 justify-end">
      <button class="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500" @click="goBack">
        취소
      </button>
      <button class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600" @click="submitFeedback">
        저장
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const userId = route.params.id

const feedbackItems = ref([
  {
    title: '이 동료는 협업 과정에서 열린 자세를 보인다.',
    content: ''
  },
  {
    title: '이 동료는 ESG(환경, 사회, 윤리)에 관심을 가지고 실천하려 노력한다.',
    content: ''
  }
])

const goBack = () => {
  router.back()
}

const submitFeedback = () => {
  console.log('✅ 저장할 피드백:', {
    userId,
    answers: feedbackItems.value
  })

  // 여기에 axios.post(`/api/feedback/${userId}`, feedbackItems.value) 가능!
  alert('피드백이 저장되었습니다!')
  router.back()
}
</script>

<style scoped></style>
