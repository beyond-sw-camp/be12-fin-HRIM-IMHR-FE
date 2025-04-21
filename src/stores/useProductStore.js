// src/stores/useProductStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    productList: [],
  }),

  actions: {
    // ✅ 제품 등록
    async regist(formData) {
      try {
        const res = await axios.post("/api/product/regist", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        return res.data;
      } catch (err) {
        console.error("제품 등록 실패", err);
        throw err;
      }
    },

    // ✅ 제품 수정
    async update(idx, formData) {
      try {
        const res = await axios.put(`/api/product/update/${idx}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        return res.data;
      } catch (err) {
        console.error("제품 수정 실패", err);
        throw err;
      }
    },

    // ✅ 제품 삭제
    async delete(idx) {
      try {
        const res = await axios.delete(`/api/product/delete/${idx}`, {
          withCredentials: true,
        });
        return res.data;
      } catch (err) {
        console.error("제품 삭제 실패", err);
        throw err;
      }
    },

    // ✅ 제품 상세 조회
    async detail(idx) {
      try {
        const res = await axios.get(`/api/product/detail/${idx}`, {
          withCredentials: true,
        });
        return res.data.data;
      } catch (err) {
        console.error("제품 상세 조회 실패", err);
        throw err;
      }
    },

    // ✅ 회사별 리스트
    async listByCompany(companyIdx) {
      try {
        const res = await axios.get(`/api/product/company/${companyIdx}`);
        this.productList = res.data.data;
      } catch (err) {
        console.error("제품 리스트 조회 실패", err);
      }
    },
  },
});
