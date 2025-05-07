import { defineStore } from 'pinia';
import axios from 'axios';

export const useActivityStore = defineStore('activity', {
    state: () => (
        {
            activityList: [],
        }),

    actions: {
        async regist(formData) {
            const response = await axios.post("/api/activity/regist", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data.data;
        },

        async list(page) {
            const response = await axios("/api/activity/activityList?page=" + page);
            this.activityList = response.data.data.activityList;
            
            return response.data.data.total;
        },

        async search(search,page) {
            const response = await axios.get('/api/activity/activitySearch', {
                params: { page, search }
              });
            
            this.activityList = response.data.data.activityList;
            
            return response.data.data.total;
        },

        async detail(idx) {
            const response = await axios("/api/activity/detail/" + idx);
            return response.data.data;
        },

        async agree(idx) {
            const response = await axios("/api/activity/ativityApproval/agree/" + idx);
        },

        async oppose(idx) {
            const response = await axios("/api/activity/ativityApproval/oppose/" + idx);
        },


        async delete(idx) {
            const response = await axios.delete("/api/activity/delete/" + idx);
            return response.data.isSuccess;
        },

        async subjectCreate(formData) {
            console.log("store에서 받은 formdata ", formData);
            const response = await axios.post("/api/activitySubject/create", formData);
            return response.data.data;
        }
    },
});