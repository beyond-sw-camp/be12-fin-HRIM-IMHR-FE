import { defineStore } from 'pinia';
import axios from 'axios';

export const useEducationStore = defineStore('education', {
    state: () => (
        {
            activityList: [],
        }),

    actions: {
        async regist(formData) {
            const response = await axios.post("/api/education/regist", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data.data;
        },

        async list(page) {
            const response = await axios("/api/education/activityList?page=" + page);
            
            this.activityList = response.data.data.educationList;

            return response.data.data.total;
        },

        async search(search,page) {
            const response = await axios("/api/education/activitySearch",{
                params: { page, search }
            });
            
            this.activityList = response.data.data.educationList;

            return response.data.data.total;
        },
    }

})