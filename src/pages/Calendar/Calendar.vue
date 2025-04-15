<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import CalendarHeader from "./CalendarHeader.vue";
import CalendarMonth from "./CalendarMonth.vue";
import AddEvent from "./Event/AddEvent.vue";
import EventByDateDetail from "./Event/EventByDateDetail.vue";
import EventDetail from "./Event/EventDetail.vue";
import { useCalendarStore } from "../../stores/useCalendarStore";

const route = useRoute();
const calendarStore = useCalendarStore();

const today = new Date();
const year = ref(today.getFullYear());
const month = ref(today.getMonth() + 1);
const events = ref([]);

const showAddModal = ref(false);
const showDetailModal = ref(false);
const selectedDate = ref(null);
const selectedEvent = ref(null);
const showEventInfoModal = ref(false);

const normalizedEvents = computed(() => {
  const result = [];

  if (!Array.isArray(events.value)) return result;

  for (const e of events.value) {
    // startDate, endDate가 없는 경우 방지
    if (!e.startDate || !e.endDate) continue;
    const start = new Date(e.startDate);
    const end = new Date(e.endDate);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      result.push({
        ...e,
        date: d.toISOString().split("T")[0], // YYYY-MM-DD
      });
    }
  }
  return result;
});

function handleEventClick(event) {
  selectedEvent.value = event;
  selectedDate.value = event.date || new Date().toISOString().split("T")[0];
  showEventInfoModal.value = true;
  showAddModal.value = false;
}

async function handleDateClick(date) {
  selectedDate.value = date;
  await calendarStore.dayevents(date);
  showDetailModal.value = true;
}

const dayEvents = computed(() => calendarStore.dayevent);

function handleEditEvent(event) {
  selectedEvent.value = event;
  showAddModal.value = true;
  showEventInfoModal.value = false;
}

async function handleAddEvent(event) {
  const isEdit = !!event.id;

  if (isEdit) {
    events.value = events.value.filter((e) => e.idx !== event.id);
  }

  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  const newEvents = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    newEvents.push({
      ...event,
      date: dateStr,
    });
  }


  events.value.push(...newEvents);
  showAddModal.value = false;
  selectedEvent.value = null;

  await calendarStore.monthevents(year.value, month.value);
  
  events.value = calendarStore.monthevent;
}

function openAddEvent(date = null) {
  // date가 없으면 오늘 날짜로
  selectedDate.value = date || new Date().toISOString().split("T")[0];
  showAddModal.value = true;
}

async function deleteEvent(event) {
  events.value = events.value.filter((e) => {
    return !(
      e.startDate === event.startDate &&
      e.endDate === event.endDate &&
      e.title === event.title
    );
  });

  showEventInfoModal.value = false;

  await calendarStore.monthevents(year.value, month.value);
  events.value = calendarStore.monthevent;
}

async function prevMonth() {
  if (month.value === 1) {
    month.value = 12;
    year.value--;
  } else {
    month.value--;
  }
  await calendarStore.monthevents(year.value, month.value);
  events.value = calendarStore.monthevent;
}

async function nextMonth() {
  if (month.value === 12) {
    month.value = 1;
    year.value++;
  } else {
    month.value++;
  }
  await calendarStore.monthevents(year.value, month.value);
  events.value = calendarStore.monthevent;
}

onMounted(async () => {
  const companyIdx = route.params.companyIdx ?? 1;
  try {
    await calendarStore.monthevents(year.value, month.value);
    events.value = calendarStore.monthevent; // 직접 할당
  } catch (error) {
    console.error("초기 월별 일정 로딩 실패:", error);
  }
});
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
        :events="normalizedEvents"
        @date-click="handleDateClick"
      />
    </div>

    <AddEvent
      :visible="showAddModal"
      :date="selectedDate"
      :event="selectedEvent"
      @close="
        () => {
          showAddModal = false;
          selectedEvent = null;
        }
      "
      @save="handleAddEvent"
    />

    <EventByDateDetail
      :visible="showDetailModal"
      :date="selectedDate"
      :events="dayEvents"
      @close="showDetailModal = false"
      @add-event="openAddEvent"
      @event-click="handleEventClick"
    />

    <EventDetail
      :visible="showEventInfoModal"
      :event="selectedEvent"
      @close="showEventInfoModal = false"
      @delete-event="deleteEvent"
      @add-event="handleEditEvent"
    />
  </div>
</template>