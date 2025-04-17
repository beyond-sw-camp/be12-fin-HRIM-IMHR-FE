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
      console.log("Backend : ", response.data.message);
      return response.data;
    },

    async campaignfetchMemberList(idx) {
      try {
        const response = await axios.get(`/api/campaign/memberList/${idx}`)
        console.log("Backend : ", response.data.message);
        this.campaigns = response.data.data;
        return response.data.data;
      } catch (error) {
        console.error("조회회 실패:", error.response || error.message);
        throw error;
      }
    },
  }
});