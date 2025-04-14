<script setup>
import { ref } from "vue";
import CalendarHeader from "./CalendarHeader.vue";
import CalendarMonth from "./CalendarMonth.vue";
import AddEvent from "./Event/AddEvent.vue";
import EventByDateDetail from "./Event/EventByDateDetail.vue";
import EventDetail from "./Event/EventDetail.vue";

const today = new Date();
const year = ref(today.getFullYear());
const month = ref(today.getMonth() + 1);
const events = ref([]);

const showAddModal = ref(false);
const showDetailModal = ref(false);
const selectedDate = ref(null);
const selectedEvents = ref([]);
const selectedEvent = ref(null);
const showEventInfoModal = ref(false);

function handleEventClick(event) {
  selectedEvent.value = event;
  showEventInfoModal.value = true;
}

function handleDateClick(date) {
  const foundEvents = events.value.filter((e) => {
    const dateObj = new Date(date);
    const start = new Date(e.startDate);
    const end = new Date(e.endDate);
    return dateObj >= start && dateObj <= end;
  });

  selectedDate.value = date;
  selectedEvents.value = foundEvents;
  showDetailModal.value = true;
}

function handleAddEvent(event) {
  // 날짜 범위에 맞게 여러 날짜로 분할하여 이벤트 삽입
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  const newEvents = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    newEvents.push({
      date: dateStr,
      title: event.title,
      time: event.time,
      content: event.content,
      color: event.color,
      startDate: event.startDate,
      endDate: event.endDate,
    });
  }

  events.value.push(...newEvents);

  if (selectedDate.value) {
    const dateObj = new Date(selectedDate.value);
    selectedEvents.value = events.value.filter((e) => {
      const start = new Date(e.startDate);
      const end = new Date(e.endDate);
      return dateObj >= start && dateObj <= end;
    });
  }
}

function openAddEvent(date = null) {
  // date가 없으면 오늘 날짜로
  selectedDate.value = date || new Date().toISOString().split("T")[0];
  showAddModal.value = true;
}

function prevMonth() {
  if (month.value === 1) {
    month.value = 12;
    year.value--;
  } else {
    month.value--;
  }
}

function nextMonth() {
  if (month.value === 12) {
    month.value = 1;
    year.value++;
  } else {
    month.value++;
  }
}
</script>

<template>
  <div class="w-full min-h-screen bg-white px-2 sm:px-10 md:px-20 pt-5">
    <div
      class="max-w-screen-xl mx-auto rounded-xl border border-gray-200 p-4 shadow-m"
    >
      <CalendarHeader
        :year="year"
        :month="month"
        @prev="prevMonth"
        @next="nextMonth"
        @open-add="openAddEvent()"
      />

      <CalendarMonth
        :year="year"
        :month="month"
        :events="events"
        @date-click="handleDateClick"
      />
    </div>

    <AddEvent
      :visible="showAddModal"
      :date="selectedDate"
      @close="showAddModal = false"
      @save="handleAddEvent"
    />

    <EventByDateDetail
      :visible="showDetailModal"
      :date="selectedDate"
      :events="events.filter((e) => e.date === selectedDate)"
      @close="showDetailModal = false"
      @add-event="openAddEvent"
      @event-click="handleEventClick"
    />

    <EventDetail
      :visible="showEventInfoModal"
      :event="selectedEvent"
      @close="showEventInfoModal = false"
    />
  </div>
</template>