<script setup>
<<<<<<< Updated upstream
=======
import { defineProps } from "vue";


const props = defineProps({
  isOpen: Boolean
});
>>>>>>> Stashed changes
</script>

<template>
  <aside
<<<<<<< Updated upstream
    class="fixed top-16 left-0 w-64 h-full bg-blue-800 text-white transition-transform duration-300"
=======
    class="fixed top-16 left-0 w-64 h-full bg-blue-800 text-white"
    :class="{ 
      '-translate-x-full': !isOpen, 
      'translate-x-0': isOpen, 
      }"
>>>>>>> Stashed changes
  >
    <nav class="mt-10">
      <ul>
        <li class="p-4 hover:bg-gray-700">
          <router-link to="/">Home</router-link>
        </li>

        <li class="p-4 hover:bg-gray-700">
          <router-link to="/about">About</router-link>
        </li>
      </ul>
    </nav>

  </aside>
</template>

<style scoped>
</style>