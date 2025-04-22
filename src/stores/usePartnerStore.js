import axios from "axios"
import { defineStore } from "pinia"

export const usePartnerStore = defineStore('partner', {
  state: () => (
    {
      partners: [],
    }
  ),

  actions: {
    async pagelist(page, size) {
      const response = await axios.get(`/api/partner/pageList?page=${page}&size=${size}`);
      console.log("store ", response.data.data);

      this.partners = response.data.data.content;
      return response.data.data.totalPages;
    },

    async add(companyIdx, formData) {
      const response = await axios.get(`/api/partner/add/${companyIdx}`, formData);

      return response.data;
    }
  }
})