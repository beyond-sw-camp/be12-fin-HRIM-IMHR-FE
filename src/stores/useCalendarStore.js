import { defineStore } from "pinia";
import axios from "axios";

export const useCalendarStore = defineStore('calendar', {
  state: () => (
    {
      monthevent: [],
      dayevent: [],
      pageEventList: [],
      detailevent: {},
    }
  ),

  actions: {
    async regist(formData) {
      const response = await axios.post("/api/event/register", formData);

      return response.data;
    },

    // 이벤트 수정
    async update(idx, formData) {
      const response = await axios.put(`/api/event/update/${idx}`, formData);

      return response.data;
    },

    // 캘린더 한달치 이벤트 끌고오기
    async monthevents(year, month) {
      const response = await axios.get(`/api/event/month/list?year=${year}&month=${month}`);

      this.monthevent = response.data.data;
      return response.data.data;
    },

    async dayevents(date) {
      const response = await axios.get(`/api/event/date/list?date=${date}`);
      this.dayevent = response.data.data;
      return response.data.data;
    },

    async eventdelete(idx) {
      const response = await axios.delete(`/api/event/delete/${idx}`);

      return response;
    },

    // 회사 특정 이벤트 끌고 오기
    async eventdetial(idx) {
      const response = await axios.get(`/api/event/eventDetail/${idx}`);

      this.detailevent = response.data.data;
      return response.data.data;
    },

    // 회사 이벤트 페이지만큼 
    async companyeventList(page, size, keyword) {
      const response = await axios.get(`/api/event/pageList?page=${page}&size=${size}&keyword=${keyword}`);

      this.pageEventList = response.data.data.content;
      return response.data.data.totalPages;
    },
  },
});