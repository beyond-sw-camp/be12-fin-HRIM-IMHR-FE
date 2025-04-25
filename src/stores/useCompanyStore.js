import axios from "axios";
import { defineStore } from "pinia";

export const useCompanyStore = defineStore('company', {
  state: () => ({
    companyName: null,
    departments: [],
    top3: [],
    companys: [],
    companyScores:[]
  }),
  actions: {
    async list(page, size, keyword = "") {
      const response = await axios.get(`/api/company/list?page=${page}&size=${size}&keyword=${keyword}`,
      );
      this.companys = response.data.data.content;
      
      return response.data.data.totalPages;
    },

    async companyScore(year, month) {
      const response = await axios.get(`/api/company/monthDashboard?year=${year}&month=${month}`);
      
      this.companyName = response.data.data.companyName;
      this.top3 = response.data.data.memberScores;
      this.departments = response.data.data.departments;
      return response.data.data;
    }
  }
});