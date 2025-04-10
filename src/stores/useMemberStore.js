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
        async login(user) {
            // const response = await axios.post("/api/user/login", {userId:user.id, password:user.pw});
            // if(response.status == 200) {
            //     this.isLogin = true;
            // }
            // return response;
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
        async fetchMember() {
            // const response = await axios.post("/api/user/info")
            // this.userInfo = response.data.data;
            // return response;
        },
        async logout() {
            this.isLogin = false;
            // await axios.post("/api/logout");
        },
    }
})