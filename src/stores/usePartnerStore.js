import axios from "axios"
import { defineStore } from "pinia"

export const usePartnerStore = defineStore('partner', {
  state: () => (
    {
      partners: [],
      mycompanyIdx : null,
    }
  ),

  actions: {
    async pagelist(page, size) {
      const response = await axios.get(`/api/partner/pageList?page=${page}&size=${size}`);

      this.partners = response.data.data.partners.content;
      console.log("store", response.data.data.partners.content);
      this.mycompanyIdx = response.data.data.companyIdx;
      return response.data.data.partners.totalPages;
    },

    async add(payload) {
      const response = await axios.post("/api/partner/add", payload);

      return response.data;
    }
  }
})