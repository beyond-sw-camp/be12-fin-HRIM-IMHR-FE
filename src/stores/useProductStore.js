import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', {
    state: () => (
        {
            productList:[],
        }),

    actions: {
        async regist(formData){
            const response = await axios.post("/api/product/regist", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });
            return response;
        },

        async list(page,size){
            let response =null;
            if(page===0 && size===5){
                response=await axios("/api/product/product?page="+1+"&size="+5);
            }
            response = await axios("/api/product/product?page="+page+"&size="+size);
            this. productList=response.data.data;
        },
    },
});