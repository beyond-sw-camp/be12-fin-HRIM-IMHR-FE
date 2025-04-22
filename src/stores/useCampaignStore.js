import axios from "axios";
import { defineStore } from "pinia";

export const useCampaignStore = defineStore('campaign', {
  state: () => (
    {
      campaigns: [],
    }
  ),

  actions: {
    async register(formData) {
      const response = await axios.post("/api/campaign/register", formData);
      return response.data;
    },

    async campaignfetchMemberList(idx) {
      const response = await axios.get(`/api/campaign/memberList/${idx}`)
      this.campaigns = response.data.data;
      return response.data.data;
    },

    async campaignMemberupdate(idx, formData) {
      const response = await axios.put(`/api/campaign/update/${idx}`, formData);
      return response.data.data
    }
  }
});