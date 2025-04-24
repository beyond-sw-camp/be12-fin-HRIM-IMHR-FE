import { defineStore } from 'pinia';
import axios from 'axios';

export const useScoreStore = defineStore('score', {
    state: () => (
        {
            partnerDashboard:[],
        }),

        actions: {
            async dashboard(idx) {
                const response = await axios.post(`/api/score/dashboard/${idx}`);
                
                return response.data.data;
            },    
        },
})