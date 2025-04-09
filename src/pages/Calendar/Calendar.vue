<template>
  <div class="w-full min-h-screen bg-white px-4 sm:px-10 md:px-20 pt-5 ">
      <div class="max-w-screen-xl mx-auto rounded-xl border border-gray-200 p-4 shadow-m">
          <CalendarHeader :year="year" :month="month" @prev="prevMonth" @next="nextMonth" />
          <CalendarMonth :year="year" :month="month" :events="events" @date-click="handleDateClick" />
      </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import CalendarHeader from './CalendarHeader.vue'
import CalendarMonth from './CalendarMonth.vue'


const today = new Date()
const year = ref(today.getFullYear())
const month = ref(today.getMonth() + 1)

const events = ref([])



function handleDateClick(date) {
  selectedBooking.value = bookingInfo.value.find(item => item.date === date) || null
}

function prevMonth() {
  if (month.value === 1) {
      month.value = 12
      year.value--
  } else {
      month.value--
  }
}

function nextMonth() {
  if (month.value === 12) {
      month.value = 1
      year.value++
  } else {
      month.value++
  }
}
</script>