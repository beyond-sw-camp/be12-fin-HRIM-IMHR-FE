import { defineStore } from 'pinia';
import axios from 'axios';

export const useActivityStore = defineStore('activity', {
    state: () => (
        {
            activityList: [],
            subjectList: [],
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
            const response = await axios.post("/api/activitySubject/create", formData);
            return response.data.data;
        },

        async subjectListSearch() {
            const response = await axios.post("/api/activitySubject/search");
            this.subjectList = response.data.data;
            return response.data.data;
        },

        async subjectUpdate(formData) {
            const response = await axios.put("/api/activitySubject/update", formData);
            return response.data.data;
        },

        async subjectDelete(id) {
            console.log("store",id);
            // await axios.delete(`/api/activitySubject/delete/${id}`);
        },
    },
});