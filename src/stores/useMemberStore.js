import { defineStore } from 'pinia';
import axios from 'axios';

export const useMemberStore = defineStore('member', {
    state: () => (
        {
            userInfo: {},
            isLogin: false,
            myCompanyIdx:null,
            myIdx:null,
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
        async staffShort(idx) {
            const response = await axios.get("/api/member/detail/shortinfo/"+idx);
            return response;
        },
        async staffModify(idx, form) {
            const response = await axios.post("/api/member/detail/modify/"+idx, form);
            return response;
        },
        async myPageInfo() {
            const response = await axios.post("/api/member/myinfo");
            this.myCompanyName = response.company;

            return response;
        },
        async myActivity() {
            const response = await axios.post("/api/member/myactivity/list");
            return response;
        },
        async adminMemberList() {
            const response = await axios.post("/api/member/list");
            return response;
        },
        async authMemberList() {
            const response = await axios.post("/api/member/list/partial");
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
        async approveMember(idx) {
            const response = await axios.post("/api/member/approve/"+idx);
            return response;
        },
        async rejectMember(idx) {
            const response = await axios.post("/api/member/reject/"+idx);
            return response;
        },
        async logout() {
            this.isLogin = false;
            await axios.post("/api/member/logout");
        },

        async isAdmin() {
            const response =await axios.post("/api/member/isAdmin");
            return response.data.data
        },

        async fetchMember() {
            const response = await axios.post("/api/member/info");
            this.userInfo = response.data.data;

            this.myCompanyIdx=response.data.data.companyIdx;
            this.myIdx = response.data.data.idx;
            
            return response.data.data;
        },
    }
})