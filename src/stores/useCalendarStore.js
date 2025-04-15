import { defineStore } from "pinia";
import axios from "axios";

export const useCalendarStore = defineStore('calendar', {
  state: () => (
    {
      monthevent: [],
      dayevent: [],

    }
  ),

  actions: {
    async regist(formData) {
      try {
        const response = await axios.post("/api/event/register", formData);
        console.log("전송데이터 : " + response.data);
        return response.data; 
      } catch (error) {
        console.error("등록 실패:", error.response || error.message);
        throw error; // 에러 발생 시 처리
      }
    },

    async update(idx, formData) {
      try {
        const response = await axios.put(`/api/event/update/${idx}`, formData);
        return response.data;
      } catch (error) {
        console.error("수정 실패:", error.response || error.message);
        throw error;
      }
    },

    async monthevents(year, month) {
      try {
        const response = await axios.get(`/api/event/month/list?year=${year}&month=${month}`);
        this.monthevent = response.data.data;
      } catch (error) {
        console.error("월별 일정 데이터를 가져오는 중 오류 발생:", error.response || error.message);
      }
    },

    async dayevents(date) {
      try {
        const response = await axios.get(`/api/event/date/list?date=${date}`);

        console.log("특정 날짜 이벤트 리스트 : ", response.data.data);
        this.dayevent = response.data.data;
      } catch (error) {
        console.error("일간 일정 데이터를 가져오는 중 오류 발생:", error.response || error.message);
      }
    },
  },
});