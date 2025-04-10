<!-- NotificationPopup.vue -->
<template>
  <div class="absolute top-16 right-6 z-30 w-96 bg-white rounded-lg shadow-lg border border-gray-200">
    <div class="p-4 max-h-80 overflow-y-auto space-y-2">
      <div
        v-for="(noti, index) in notifications"
        :key="index"
        @click="openDetail(noti)"
        class="p-3 rounded cursor-pointer hover:bg-gray-100 transition flex justify-between items-center"
        :class="noti.read ? 'text-gray-400' : 'text-gray-800 font-semibold'"
      >
        <span>{{ noti.title }}</span>
        <button @click.stop="deleteNoti(index)">
          <Trash class="w-4 h-4 text-gray-400 hover:text-red-500" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Trash } from 'lucide-vue-next'
import { defineEmits } from 'vue'

const emit = defineEmits(['open-detail'])

const props = defineProps({
  notifications: Array
})

const openDetail = (noti) => {
  emit('open-detail', noti)
}

const deleteNoti = (index) => {
  props.notifications.splice(index, 1)
}
</script>