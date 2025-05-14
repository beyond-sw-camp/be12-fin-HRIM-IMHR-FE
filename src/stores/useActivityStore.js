import { defineStore } from 'pinia';
import axios from 'axios';
import { data } from 'autoprefixer';

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
        async activitySubmit(formData) {
            const response = await axios.post("/api/esg_activity/submit", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }});
            return response;
        },

        async activityListsearch(myIdx, page, pageSize, keyword = "") {
            const response = await axios.get(`/api/esg_activity/pageList?myIdx=${myIdx}&page=${page}&pageSize=${pageSize}&keyword=${keyword}`);
            this.activityList = response.data.data.content;
            return response.data.data.totalPages;
        },

        async detail(id) {
            const response = await axios.get(`/api/esg_activity/detail/${id}`);
            return response.data.data;
        },

        async agree(idx) {
            const response = await axios("/api/activity/ativityApproval/agree/" + idx);
        },

        async oppose(idx) {
            const response = await axios("/api/activity/ativityApproval/oppose/" + idx);
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
            console.log("store update", formData);
            const response = await axios.put("/api/activitySubject/update", formData);
            return response.data.data;
        },

        async subjectDelete(id) {
            await axios.delete(`/api/activitySubject/delete/${id}`);
        },
    },
});