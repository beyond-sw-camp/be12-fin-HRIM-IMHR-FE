import { defineStore } from 'pinia';
import axios from 'axios';

export const useScoreStore = defineStore('score', {
    state: () => (
        {
            partnerDashboard:[],
        }),

        actions: {
            async dashboard() {
                const response = await axios.post("/api/score/dashboard", {
                });
                
                return response.data.data;
            },    
        },
})