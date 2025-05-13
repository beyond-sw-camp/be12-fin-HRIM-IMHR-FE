import { defineStore } from 'pinia'
import axios from 'axios'

/**
 * 제품명이 너무 길 경우 자르고 '…' 붙이기
 */
export function shortenProductName(name, maxLength = 5) {
  if (!name) return ''
  return name.length > maxLength ? name.substring(0, maxLength) + '..' : name
}

/**
 * 친환경 제품 점수 계산 함수
 */
export function calculateScore(product) {
  let score = 0

  if (product.recyclable == 1) score += 30
  if (product.bioMaterial == 1) score += 20
  if (product.lowCarbonProcess == 1) score += 25

  const gradeMap = {
    '1등급': 20,
    '2등급': 10,
    '3등급': 5
  }
  score += gradeMap[product.energyGrade] || 0

  if (product.unitPrice > 0) {
    const priceScore = Math.max(0, (100000 - product.unitPrice) / 1000)
    score += priceScore
  }

  return Math.max(0, Math.round(score))
}

/**
 * 제품 목록/등록/수정/삭제/조회 API 핸들링용 스토어
 */
export const useProductStore = defineStore('product', {
  state: () => ({
    productList: [] // 전체 제품 리스트
  }),
  actions: {
    // ✅ 제품 등록
    async regist(formData) {
      try {
        const res = await axios.post('/api/product/regist', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        })
        return res.data
      } catch (err) {
        console.error('제품 등록 실패', err)
        throw err
      }
    },

    // ✅ 제품 수정
    async update(idx, formData) {
      try {
        const res = await axios.put(`/api/product/update/${idx}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        })
        return res.data
      } catch (err) {
        console.error('제품 수정 실패', err)
        throw err
      }
    },

    // ✅ 제품 삭제
    async delete(idx) {
      try {
        const res = await axios.delete(`/api/product/delete/${idx}`, {
          withCredentials: true
        })
        return res.data
      } catch (err) {
        console.error('제품 삭제 실패', err)
        throw err
      }
    },

    // ✅ 제품 상세 조회
    async detail(idx) {
      try {
        const res = await axios.get(`/api/product/detail/${idx}`, {
          withCredentials: true
        })
        return res.data.data
      } catch (err) {
        console.error('제품 상세 조회 실패', err)
        throw err
      }
    },

    // ✅ 회사별 제품 리스트 조회
    async listByCompany(companyIdx) {
      try {
        this.productList = []
        const res = await axios.get(`/api/product/company/${companyIdx}`, {
          withCredentials: true
        })
        this.productList = res.data?.data || res.data
      } catch (err) {
        console.error('제품 리스트 조회 실패', err)
        this.productList = []
      }
    }
  }
})
