<script setup>
import { defineEmits, defineProps } from 'vue';
import { usePartnerStore } from '../../stores/usePartnerStore';

const emit = defineEmits(['close', 'confirm'])
const props = defineProps({
  visible: Boolean,
  partnerIdx: Number,
})

const partnerStore = usePartnerStore();

const handleDelete = async () => {
  await partnerStore.delete(props.partnerIdx);
  emit("confirm");
};
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
      <p class="text-lg font-semibold mb-6">정말 삭제 하시겠습니까??</p>
      <div class="flex justify-around">
        <button
          class="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          @click="$emit('close')"
        >
          취소
        </button>

        <button
          class="px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
          @click="handleDelete"
        >
          삭제
        </button>
      </div>
    </div>
  </div>
</template>