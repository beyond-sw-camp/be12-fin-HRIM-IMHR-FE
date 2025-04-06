<script setup>
import FullCalendar from '@fullcalendar/vue3'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import interactionPlugin from '@fullcalendar/interaction'
</script>

<!-- 
받아야할 수도?
npm install @fullcalendar/vue3 @fullcalendar/core @fullcalendar/daygrid @fullcalendar/timegrid
 -->
<template>
  <FullCalendar :options="calendarOptions" />
</template>

<style scoped>
</style>