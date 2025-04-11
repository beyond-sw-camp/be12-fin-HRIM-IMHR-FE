import { defineStore } from 'pinia';
import axios from 'axios';

export const useActivityStore = defineStore('activity', {
    state: () => (
        {
            
        }),

    actions: {
        async regist(formData){
            const response = await axios.post("/api/activity/regist", formData, {
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            });
            return response;
        }
    },
});