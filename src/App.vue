<script setup>
import { useRoute } from "vue-router";
import Header from "./pages/common/Header.vue";

const route = useRoute();

</script>

<template>
  <Header></Header>
  <div class="mt-16"> </div>
  <router-view></router-view>
</template>

<style scoped>
</style>