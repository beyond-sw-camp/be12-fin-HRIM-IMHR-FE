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
        console.log("Backend : ", response.data.message);
        return response.data;
      } catch (error) { 
        throw error;
      }
    },


    async campaignlist() {
      try {
        const response = await axios.get('')
        console.log("Backend : ", response.data.message);
      } catch (error) {
        throw error;
      }
    },
  }
});