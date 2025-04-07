<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <!-- 전체 배경 -->
  <div
    class="bg-white min-h-[calc(93vh-4rem)] overflow-y-auto transition-all p-6 rounded-lg"
  >
    <div
      class="relative w-full justify-between items-center mb-4 transition-all"
    >
      <input
        v-model="searchQuery"
        placeholder="내용 검색"
        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-blue-600 px-4 py-1 rounded"
      >
        검색
      </button>
    </div>

    <table class="w-full border-collapse bg-white shadow-md">
      <thead>
        <tr class="bg-gray-100 text-black">
          <th class="p-3">상태</th>
          <th class="p-3">내용</th>
          <th class="p-3">날짜</th>
          <th class="p-3">삭제</th>
        </tr>
      </thead>

      <tbody>
        <!-- 수기 작성한 데이터 -->
        <tr class="text-center border-b">
          <td class="p-3">
            <span
              class="px-3 py-1 text-white rounded-md min-w-[95px] inline-block text-center bg-yellow-500"
              >대기 중</span
            >
          </td>
          <td class="p-3">ESG 교육 1</td>
          <td class="p-3">2025.02.12</td>
          <td class="p-3">
            <button class="bg-red-600 text-white px-3 py-1 rounded-md">
              삭제
            </button>
          </td>
        </tr>

        <tr class="text-center border-b">
          <td class="p-3">
            <span
              class="px-3 py-1 text-white rounded-md min-w-[95px] inline-block text-center bg-red-500"
              >승인 반려</span
            >
          </td>
          <td class="p-3">ESG 교육 2</td>
          <td class="p-3">2025.02.15</td>
          <td class="p-3">
            <button class="bg-red-600 text-white px-3 py-1 rounded-md">
              삭제
            </button>
          </td>
        </tr>

        <tr class="text-center border-b">
          <td class="p-3">
            <span
              class="px-3 py-1 text-white rounded-md min-w-[95px] inline-block text-center bg-green-500"
              >승인</span
            >
          </td>
          <td class="p-3">ESG 교육 3</td>
          <td class="p-3">2025.02.18</td>
          <td class="p-3">
            <button class="bg-red-600 text-white px-3 py-1 rounded-md">
              삭제
            </button>
          </td>
        </tr>

        <tr class="text-center border-b">
          <td class="p-3">
            <span
              class="px-3 py-1 text-white rounded-md min-w-[95px] inline-block text-center bg-green-500"
              >승인</span
            >
          </td>
          <td class="p-3">ESG 교육 3</td>
          <td class="p-3">2025.02.18</td>
          <td class="p-3">
            <button class="bg-red-600 text-white px-3 py-1 rounded-md">
              삭제
            </button>
          </td>
        </tr>

        <tr class="text-center border-b">
          <td class="p-3">
            <span
              class="px-3 py-1 text-white rounded-md min-w-[95px] inline-block text-center bg-green-500"
              >승인</span
            >
          </td>
          <td class="p-3">ESG 교육 3</td>
          <td class="p-3">2025.02.18</td>
          <td class="p-3">
            <button class="bg-red-600 text-white px-3 py-1 rounded-md">
              삭제
            </button>
          </td>
        </tr>

        <!-- 데이터 값있을 때 해볼것 -->
        <!-- <tr
          v-for="(item, index) in filterData()"
          :key="index"
          class="text-center border-b"
        >
          <td class="p-3">
            <span
              class="px-3 py-1 text-white rounded-md"
              :class="{
                'bg-yellow-500': item.status === '대기 중',
                'bg-red-500': item.status === '승인 반려',
                'bg-green-500': item.status === '승인',
              }"
            >
              {{ item.status }}
            </span>
          </td>

          <td class="p-3">{{ item.content }}</td>

          <td class="p-3">{{ item.date }}</td>

          <td class="p-3">
            <button
              @click="deleteItem(index)"
              class="bg-red-600 text-white px-3 py-1 rounded-md"
            >
              삭제
            </button>
          </td>

        </tr> -->
      </tbody>
    </table>

    <!-- 페이지네이션 -->
    <div class="mt-6 flex justify-center space-x-2 text-sm text-gray-600">
      <button class="px-2 py-1 mx-1 bg-blue-600 text-white rounded-md">
        이전
      </button>

      <button class="px-3 py-1 mx-1 bg-gray-300 text-black rounded-md">
        1
      </button>

      <button class="px-2 py-1 mx-1 bg-blue-600 text-white rounded-md">
        다음
      </button>
    </div>

    <div class="mt-10 bg-white p-6 rounded-md shadow space-y-4">
      <h2 class="text-lg font-semibold text-gray-700">활동 추가</h2>
      <div class="flex flex-col sm:flex-row gap-4">
        <input
          placeholder="내용 입력"
          class="flex-1 border border-gray-300 rounded px-4 py-2"
        />
        <select
          class="border border-gray-300 rounded px-4 py-2"
        >
          <option disabled value="">주제 선택</option>
          <option>봉사</option>
          <option>기부</option>
        </select>
        <input
          type="file"
          class="border border-gray-300 rounded px-4 py-2"
        />
        <button
          class="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          승인 요청
        </button>
      </div>
    </div>

  </div>
</template>


<style scoped>
</style>