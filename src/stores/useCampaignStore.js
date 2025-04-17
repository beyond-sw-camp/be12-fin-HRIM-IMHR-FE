import axios from "axios";
import { defineStore } from "pinia";

export const useCampaignStore = defineStore('campaign', {
  state: () => (
    {

    }
  ),

  actions: {
    async register(formData) {
      try {
        const response = await axios.post("/api/campaign/register", formData);
        console.log("전송데이터 : ", response.data);
        return response.data;
      } catch (error) { 
        throw error;
      }
    },


    async campaignlist() {
      try {
        const response = await axios.get('')
      } catch (error) {
        throw error;
      }
    },
  }
});