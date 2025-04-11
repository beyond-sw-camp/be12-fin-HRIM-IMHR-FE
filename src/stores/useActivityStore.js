import { defineStore } from 'pinia';
import axios from 'axios';

export const useActivityStore = defineStore('activity', {
    state: () => (
        {
            activityList:[],
        }),

    actions: {
        async regist(formData){
            const response = await axios.post("/api/activity/regist", formData, {
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            });
            return response;
        },

        async list(){
            const response = await axios("/api/activity/myactivity?page="+page+"&size="+size);
            this.activityList=response.data.data;
        },
    },
});