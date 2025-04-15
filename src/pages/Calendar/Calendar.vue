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
const events = computed(() => calendarStore.monthevent);

const showAddModal = ref(false);
const showDetailModal = ref(false);
const selectedDate = ref(null);
const selectedEvents = ref([]);
const selectedEvent = ref(null);
const showEventInfoModal = ref(false);

const normalizedEvents = computed(() => {
  const result = [];
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
  await calendarStore.dayevents(route.params.companyIdx ?? 1, date);
  showDetailModal.value = true;
}

const dayEvents = computed(() => calendarStore.dayevent);

function handleEditEvent(event) {
  selectedEvent.value = event;
  showAddModal.value = true;
  showEventInfoModal.value = false;
}

function handleAddEvent(event) {
  events.value = events.value.filter(
    (e) =>
      !(
        e.startDate === selectedEvent.value?.startDate &&
        e.endDate === selectedEvent.value?.endDate &&
        e.title === selectedEvent.value?.title
      )
  );

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

  showAddModal.value = false;
  selectedEvent.value = null;

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

function deleteEvent(event) {
  events.value = events.value.filter((e) => {
    return !(
      e.startDate === event.startDate &&
      e.endDate === event.endDate &&
      e.title === event.title
    );
  });

  showEventInfoModal.value = false;
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

onMounted(async () => {
  const companyIdx = route.params.companyIdx ?? 1; // URL 파라미터에서 회사 idx 가져오기
  console.log("회사 IDx : " + companyIdx);

  try {
    await calendarStore.monthevents(companyIdx); // Pinia Store의 monthevents 호출
    // console.log("이벤트 리스트 : ", events.value);
  } catch (error) {
    console.error("일정 데이터를 가져오는 중 오류 발생:", error);
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
      @close="showAddModal = false"
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