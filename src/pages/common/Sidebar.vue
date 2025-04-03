<script setup>
</script>

<template>
  <aside
    class="fixed top-16 left-0 w-64 h-full bg-blue-800 text-white transition-transform duration-300"
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