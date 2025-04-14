import { defineStore } from "pinia";
import axios from "axios";

export const useCalendarStore = defineStore('calendar', {
  state: () => (
    {
      events: [],

    }
  ),

  actions: {
    async regist(formData) {
      try {
        const response = await axios.post("/api/event/register", formData);
        console.log("등록 성공:", response.data);
        return response.data; // 성공 시 반환 데이터
      } catch (error) {
        console.error("등록 실패:", error.response || error.message);
        throw error; // 에러 발생 시 처리
      }
    },

    async monthevents(companyIdx) {
      try {
        const response = await axios.get(`/api/event/list/${companyIdx}`);
        this.events = response.data.content;
      } catch (eeror) {
        console.error("일정 데이터를 가져오는 중 오류 발생:", error.response || error.message);
      }
    },

    
  },
});