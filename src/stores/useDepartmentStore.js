import { defineStore } from 'pinia';
import axios from 'axios';

export const useDepartmentStore = defineStore('department', {
    state: () => (
        {
            departmentIdx: null,
            departmentlist:[],
            departmentmonths: [],
        }),

    actions: {
        async fetchDepartments() {
            const response = await axios.get("/api/department/list");

            return response;
        },
        async updateDepartments(CDRequest) {
            const response = await axios.post("/api/department/update", CDRequest);
            return response;
        },

        async departmentmonth(params) {
            const response = await axios.get("/api/department/month", { params });

            this.departmentmonths = response.data.data;
            return response.data.data;
        }
    }
})