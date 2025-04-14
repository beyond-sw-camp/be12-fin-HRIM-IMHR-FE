<script setup>
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'

const emit = defineEmits(['close', 'save'])

const props = defineProps({
  visible: Boolean,
  date: String,
})

const initialForm = {
  title: '',
  time: '',
  contetnt: '',
  startDate: '',
  endDate: '',
  color: '#f87171',
}

const form = ref({ ...initialForm })

function resetForm() {
  form.value = {
    ...initialForm,
    startDate: props.date || '',
    endDate: props.date || ''
  }
}

watch(() => props.visible, (newVal) => {
  if (newVal) {
    resetForm()
  }
})

const colorOptions = [
  '#f87171', '#fb923c', '#facc15', '#4ade80', '#60a5fa', '#a78bfa', '#a3a3a3', '#64748b', '#000000',
]

function submitEvent() {
  if (!form.value.title || !form.value.startDate || !form.value.endDate) return
  emit('save', { ...form.value })
  emit('close')
}
</script>

<template>
  <div 
  v-if="visible"
  class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl w-[400px] p-4 relative">
      <button class="absolute top-3 right-3 text-gray-500" @click="$emit('close')">
        <X class="w-5 h-5" />
      </button>

      <h2 class="text-lg font-bold mb-3">일정 추가</h2>

      <div class="space-y-3">
        <input v-model="form.title" placeholder="제목" class="w-full border px-2 py-1 rounded" />
        <input v-model="form.contetnt" placeholder="메모" class="w-full border px-2 py-1 rounded" />
        <input v-model="form.time" placeholder="시간 (예: 14:00)" class="w-full border px-2 py-1 rounded" />
        <input type="date" v-model="form.startDate" class="w-full border px-2 py-1 rounded" />
        <input type="date" v-model="form.endDate" class="w-full border px-2 py-1 rounded" />
        
        <!-- 색상 선택 -->
        <div class="flex flex-wrap gap-2">
          <div
            v-for="color in colorOptions"
            :key="color"
            :style="{ backgroundColor: color }"
            class="w-6 h-6 rounded-full cursor-pointer border-2"
            :class="{ 'border-black': form.color === color }"
            @click="form.color = color"
          ></div>
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <button @click="$emit('close')" class="px-3 py-1 rounded bg-gray-300">취소</button>
        <button @click="submitEvent" class="px-3 py-1 rounded bg-slate-500 text-white">저장</button>
      </div>
    </div>
  </div>
</template>