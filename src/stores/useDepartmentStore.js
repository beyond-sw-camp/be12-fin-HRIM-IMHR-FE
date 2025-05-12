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

        async createDepartments(CDRequest) {
            const response = await axios.post("/api/department/create", CDRequest);
            return response;
        },

        async updateDepartment(formData) {
            const response = await axios.post("/api/department/update", formData);
            return response;
        }, 

        async deleteDepartment(idx) {
            const response = await axios.delete(`/api/department/delete/${idx}`);

            return response;
        },

        async departmentmonth(params) {
            const response = await axios.get("/api/department/month", { params });

            this.departmentmonths = response.data.data;
            return response.data.data;
        }
    }
})