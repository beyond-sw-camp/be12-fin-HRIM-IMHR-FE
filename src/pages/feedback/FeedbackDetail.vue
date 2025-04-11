<template>
  <div class="bg-white p-8 rounded shadow-md max-w-3xl mx-auto">
    <!-- 상단: 사원 정보 표시 -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-slate-800 mb-1">사원 피드백 상세 보기</h2>
      <p class="text-slate-600 text-sm">👤 대상 사원 ID: <span class="font-semibold">{{ userId }}</span></p>
    </div>

    <!-- 피드백 항목 목록 -->
    <div v-for="(item, index) in feedbackItems" :key="index" class="mb-6">
      <label class="block font-semibold text-gray-800 mb-2">
        항목 {{ index + 1 }}: {{ item.title }}
      </label>

      <div>
        <label class="text-gray-600 block mb-1">내용</label>
        <textarea
          class="w-full p-3 border border-gray-300 rounded"
          v-model="item.content"
          rows="3"
          readonly
        ></textarea>
      </div>
    </div>

    <div class="text-right mt-8">
      <button class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600" @click="goBack">
        돌아가기
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
    content: '진심으로 경청하고 협력하는 태도가 인상 깊었어요.'
  },
  {
    title: '이 동료는 ESG(환경, 사회, 윤리)에 관심을 가지고 실천하려 노력한다.',
    content: '분리수거나 캠페인 참여를 적극적으로 했습니다.'
  }
])

const goBack = () => {
  router.back()
}
</script>

<style scoped></style>
