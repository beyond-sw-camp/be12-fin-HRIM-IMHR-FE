<script setup>
import { ref, computed } from 'vue';

const calendar = ref(null);
const isDark = ref(false);
const showDatePicker = ref(false);
const dragValue = ref(null);

function moveToday() {
  calendar.value.move(new Date());
}

const selectDragAttribute = computed(() => ({
  popover: {
    visibility: 'hover',
    isInteractive: false,
  },
}));

const attrs = ref([
  {
    key: 'today',
    highlight: true,
    dates: new Date(),
  },
]);

const range = ref({
  start: new Date(2025, 3, 6),
  end: new Date(2025, 3, 10),
});

function toggleDatePicker() {
  showDatePicker.value = !showDatePicker.value
}
</script>

<!-- 
npm install v-calendar@next @popperjs/core
npm uninstall v-calendar@next @popperjs/core
 -->

<template>
  
  <VCalendar 
  expanded borderless 
  ref="calendar"
  :attributes='attrs'
  class="my-calendar"
  v-model.range="range" mode="dateTime"
  >
  <!-- is-dark="system" -->

    <template #footer>
      <div class="w-full px-4 pb-3">
        <button
          class="bg-slate-700 hover:bg-slate-800 text-white font-bold w-full px-3 py-1 rounded-md"
          @click="moveToday"
        >
          Today
        </button>
        <button
          class="mt-4 bg-slate-700 hover:bg-slate-800 text-white font-bold w-full px-3 py-1 rounded-md"
           @click="toggleDatePicker"
        >
          일정 추가
        </button>
      </div>
    </template>

  </VCalendar>

  <div v-if="showDatePicker" class="p-4">
    <VDatePicker
      v-model.range="range"
      :select-attribute="selectDragAttribute"
      :drag-attribute="selectDragAttribute"
      @drag="dragValue = $event"
    >
      <template #day-popover="{ format }">
        <div class="text-sm">
          {{ format(dragValue ? dragValue.start : range.start, 'MMM D') }}
          -
          {{ format(dragValue ? dragValue.end : range.end, 'MMM D') }}
        </div>
      </template>
    </VDatePicker>
  </div>
</template>

<style scoped>
.my-calendar .vc-container-1 {
  color: #fc0505;
}
</style>