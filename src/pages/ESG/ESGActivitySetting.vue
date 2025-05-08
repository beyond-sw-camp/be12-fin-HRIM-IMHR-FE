<script setup>
import { onMounted, ref } from "vue";
import { useActivityStore } from "../../stores/useActivityStore.js";

const actviityStore = useActivityStore();
const subjects = ref([
  {
    subject: "",
    choices: [{ text: "", type: "" }],
  },
]);

const questions = ref([
  {
    questionIdx: null,
    question: "",
    type: "",
    sortOrder: 0,
    choices: [],
  },
]);

const addQuestion = () => {
  subjects.value.push({
    subject: "",
    choices: [{ text: "", type: "" }], // 최소 1개 입력 항목 생성
  });
};

const removeQuestion = (index) => {
  subjects.value.splice(qIndex, 1);
};

// const setType = (index, type) => {
//   questions.value[index].type = type;
//   if (type === "SUBJECTIVE") {
//     questions.value[index].choices = [];
//   }
// };

const addOption = (qIndex) => {
  subjects.value[qIndex].choices.push({ text: "", type: "" });
};

const removeOption = (qIndex, oIndex) => {
  questions.value[qIndex].choices.splice(oIndex, 1);
};

const saveForm = async () => {
  const dto = {
    id: null,
    companyIdx: null,
    subjects: subjects.value.map(subject => ({
      subject: subject.subject,
      inputs: subject.choices.map(choice => ({
        text: choice.text,
        type: choice.type
      }))
    }))
  };

  console.log("dto? ", dto);
  await actviityStore.subjectCreate(dto);
};

// onMounted(async () => {
//   const response = await feedbackStore.fetchFeedbackTemplate();

//   if (response.data && response.data.data && response.data.data.questions) {
//     questions.value = response.data.data.questions.map((q) => ({
//       questionIdx: q.questionIdx,
//       question: q.question,
//       type: q.type,
//       sortOrder: q.sortOrder,
//       choices: q.choices
//         ? q.choices.map((c) => ({
//             choiceIdx: c.choiceIdx,
//             text: c.text,
//           }))
//         : [],
//     }));
//   }
// });
</script>


<template>
  <div class="bg-gray-50 p-8">
    <div
      v-for="(subject, qIndex) in subjects"
      :key="qIndex"
      class="mb-8 border-b pb-6"
    >
      <label class="block font-bold mb-1">주제 {{ qIndex + 1 }}</label>

      <!-- 질문 내용 -->
      <label class="block text-gray-700">주제 :</label>
      <input
        type="text"
        class="border border-gray-300 p-2 rounded w-80 mb-3"
        placeholder="주제 입력"
        v-model="subject.subject"
      />

      <!-- 질문 유형 -->

      <div class="mb-4">
        <label class="block font-medium mb-2">입력 항목 추가</label>
        <div
          v-for="(option, oIndex) in subject.choices"
          :key="oIndex"
          class="flex mb-2 space-x-2"
        >
          <input
            type="text"
            class="border border-gray-300 p-2 rounded rounded w-80"
            v-model="option.text"
            placeholder="입력 받을 내용 입력 ex) 제목"
          />

          <select
            v-model="option.type"
            class="border border-gray-300 p-2 rounded"
            required
          >
            <option disabled value="">입력 타입</option>
            <option value="text">텍스트</option>
            <option value="number">숫자</option>
            <option value="file">파일</option>
            <option value="time">시간</option>
          </select>

          <button
            class="bg-red-500 w-20 text-white px-3 py-1 rounded"
            @click="removeOption(qIndex, oIndex)"
          >
            삭제
          </button>
        </div>
        <button
          class="bg-green-500 h-10 text-white px-3 py-1 rounded"
          @click="addOption(qIndex)"
        >
          입력 항목 추가
        </button>
      </div>

      <!-- 질문 삭제 -->
      <div class="flex justify-end">
        <button
          class="bg-red-500 h-10 text-white px-4 py-1 rounded"
          @click="removeQuestion(qIndex)"
        >
          주제 삭제
        </button>
      </div>
    </div>

    <!-- 질문 추가 버튼 -->
    <div class="mb-6">
      <button
        class="bg-blue-600 text-white px-6 py-2 rounded"
        @click="addQuestion"
      >
        주제 추가
      </button>
    </div>

    <!-- 저장 버튼 -->
    <div class="flex justify-end">
      <button
        class="bg-green-600 text-white px-6 py-2 rounded"
        @click="saveForm"
      >
        저장
      </button>
    </div>
  </div>
</template>


<style scoped></style>