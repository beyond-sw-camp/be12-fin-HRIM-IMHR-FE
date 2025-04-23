import axios from "axios";
import { defineStore } from "pinia";

export const useCompanyStore = defineStore('company', {
  state: () => ({
    companys: []
  }),
  actions: {
    async list(page, size, keyword = "") {
      const response = await axios.get(`/api/company/list?page=${page}&size=${size}&keyword=${keyword}`,
      );
      this.companys = response.data.data.content;
      
      return response.data.data.totalPages;
    }
  }
});