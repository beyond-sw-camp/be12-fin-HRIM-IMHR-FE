<script setup>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
</script>

<!-- 
받아야할 수도?
npm install vue-cal
 -->
<template>
   <VueCal
    style="height: 600px"
    default-view="week"
    :events="[
      { start: '2025-04-01 10:00', end: '2025-04-01 11:00', title: 'ESG 회의' }
    ]"
  />
</template>

<style scoped>
</style>