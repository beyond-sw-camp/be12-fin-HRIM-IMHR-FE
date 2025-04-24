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
        this.productList = []; // 기존 리스트 초기화
        const res = await axios.get(`/api/product/company/${companyIdx}`, {
          withCredentials: true,
        });
        
        // 응답 구조 확인 후 할당
        this.productList = res.data?.data || res.data;
        
      } catch (err) {
        console.error("제품 리스트 조회 실패", err);
        this.productList = []; // 실패 시도 리스트 초기화 (선택)
      }
    },
  },
});

// ✅ 제품 점수 계산
const calculateScore = (product) => {
  let score = 0;

  // 재활용 가능
  if (product.recyclable == 1) score += 30;

  // 친환경 원료
  if (product.bioMaterial == 1) score += 20;

  // 저탄소 공정
  if (product.lowCarbonProcess == 1) score += 25;

  // 에너지 등급: 1등급 > 3등급 높은 점수
  const gradeMap = {
    "1등급": 20,
    "2등급": 10,
    "3등급": 5,
  };
  score += gradeMap[product.energyGrade] || 0;

  // 단가가 낮을수록 친환경이라 가정
  if (product.unitPrice > 0) {
    const priceScore = Math.max(0, (100000 - product.unitPrice) / 1000); // 단가 1000당 1점
    score += priceScore;
  }

  return Math.max(0, Math.round(score));
};


export { calculateScore }