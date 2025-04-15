import { defineStore } from 'pinia';
import axios from 'axios';

export const useMemberStore = defineStore('member', {
    state: () => (
        {
            userInfo: {},
            isLogin: false
    }),
    persist: {
        storage: sessionStorage,
    },
    actions: {
        async login(form) {
            const response = await axios.post("/api/member/login", form);
            if(response.status == 200) {
                this.isLogin = true;
            }
            return response;
        },
        async findId(form) {
            const response = await axios.post("/api/member/find-id", form);
            return response;
        },
        async findPW(form) {
            const response = await axios.post("/api/member/find-pw", form);
            return response;
        },
        async changePW(form) {
            const response = await axios.post("/api/member/reset-pw", form);
            return response;
        },
        async staffDetail(idx) {
            const response = await axios.get("/api/member/detail/info/"+idx);
            return response;
        },
        async companySignup(formData) {
            const response = await axios.post("/api/member/signup/company", formData, {
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            }
                // {
                //     memberId:member.userid, name:member.name, email:member.email, 
                //     password:member.password, companyName: member.companyName,
                //     registrationNumber: member.registrationNumber
                // }
            );
            return response;
        },
        async personalSignup(form) {
            const response = await axios.post("/api/member/signup/personal", form);
            return response;
        },
        async fetchMember() {
            // const response = await axios.post("/api/user/info")
            // this.userInfo = response.data.data;
            // return response;
        },
        async logout() {
            this.isLogin = false;
            await axios.post("/api/member/logout");
        },
    }
})