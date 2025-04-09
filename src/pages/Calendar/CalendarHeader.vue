<template>
  <div class="flex justify-end">
    <button
      @click="$emit('open-add')"
      class="bg-slate-600 text-white px-2 py-1 rounded-lg hover:bg-slate-800"
    >
      + 일정 추가
    </button>
  </div>

  <div class="flex items-center gap-2 mb-6 justify-center">
    <button
      @click="$emit('prev')"
      class="flex items-center justify-center w-10 h-10 rounded-full bg-slate-300 text-slate-700"
    >
      <ChevronLeft class="w-5 h-5" />
    </button>
    <span class="text-xl font-bold text-black">{{ year }}년 {{ month }}월</span>

    <button
      @click="$emit('next')"
      class="flex items-center justify-center w-10 h-10 rounded-full bg-slate-700 text-white"
    >
      <ChevronRight class="w-5 h-5" />
    </button>
  </div>
</template>
<!-- npm install lucide-vue-next -->
<!-- npm uninstall lucide-vue-next -->
<script setup>
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { ref } from "vue";

defineProps({
  year: Number,
  month: Number,
});

const allCategories = [];

const selectedCategories = ref(allCategories.map((cat) => cat.name));

function toggleCategory(name) {
  const i = selectedCategories.value.indexOf(name);
  if (i === -1) {
    selectedCategories.value.push(name);
  } else {
    selectedCategories.value.splice(i, 1);
  }
}
</script>