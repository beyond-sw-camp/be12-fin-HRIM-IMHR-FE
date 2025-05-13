<script setup>
import { onMounted, ref } from "vue";
import { useActivityStore } from "../../stores/useActivityStore.js";
import { useMemberStore } from "../../stores/useMemberStore.js";

const activityStore = useActivityStore();
const memberStore = useMemberStore();
const subjectlength = ref(0);

const subjects = ref([
  {
    id: null,
    companyIdx: null,
    subject: "",
    isEditing: true,
    choices: [{ text: "", type: "" }],
    esgValue: "",
    esgScore: null,
    esgActivityItem: "",
    evaluationCriteria: "",
  },
]);

const addQuestion = () => {
  subjects.value.push({
    subject: "",
    isEditing: true,
    choices: [{ text: "", type: "" }],
    esgValue: "",
    esgScore: null,
    esgActivityItem: "",
    evaluationCriteria: "",
  });
};

const addOption = (qIndex) => {
  subjects.value[qIndex].choices.push({ text: "", type: "" });
};

const removeOption = (qIndex, oIndex) => {
  subjects.value[qIndex].choices.splice(oIndex, 1);
};

const saveForm = async () => {
  // 새로 추가된(아직 id가 없는) 주제만 저장
  if (!memberStore.userInfo.isAdmin) {
    alert("접근 불가능한 권한입니다.");
    return;
  }

  const newSubjects = subjects.value.filter(
    (subject) =>
      (!subject.id || subject.id === null) &&
      (subject.subject.trim() !== "" ||
        subject.choices.some(
          (choice) => choice.text.trim() !== "" && choice.type !== ""
        ))
  );

  const subjectsList = newSubjects.map((subject) => ({
    id: null,
    companyIdx: null,
    subject: subject.subject,
    esgValue: subject.esgValue,
    esgScore: subject.esgScore,
    esgActivityItem: subject.esgActivityItem,
    evaluationCriteria: subject.evaluationCriteria,
    inputs: subject.choices.map((choice) => ({
      text: choice.text,
      type: choice.type,
    })),
  }));

  await activityStore.subjectCreate(subjectsList);
  await search();
  alert("등록이 완료되었습니다.");
};

const search = async () => {
  const response = await activityStore.subjectListSearch();

  if (
    response &&
    Array.isArray(response) &&
    response.length > 0 &&
    response.some(
      (item) =>
        item && typeof item.subject === "string" && item.subject.trim() !== ""
    )
  ) {
    subjects.value = response.map((item) => ({
      id: item.id,
      companyIdx: item.companyIdx,
      subject: item.subject,
      esgValue: item.esgValue,
      esgScore: item.esgScore,
      esgActivityItem: item.esgActivityItem,
      evaluationCriteria: item.evaluationCriteria,
      isEditing: false,
      choices: (item.inputs || []).map((choice) => ({
        text: choice.text,
        type: choice.type,
      })),
    }));

    subjectlength.value = subjects.value.length;
  } else {
    subjects.value = [];
    subjectlength.value = 0;
  }

  // 마지막에 빈 입력칸 추가
  subjects.value.push({
    id: null,
    companyIdx: null,
    subject: "",
    isEditing: true,
    choices: [{ text: "", type: "" }],
    esgValue: "",
    esgScore: null,
    esgActivityItem: "",
    evaluationCriteria: "",
  });
};

const cancelEdit = async (qIndex) => {
  subjects.value[qIndex].isEditing = false;
  await search();
};

const updateSubject = async (qIndex) => {
  const subject = subjects.value[qIndex];
  // id가 있어야 수정 가능
  if (!subject.id) {
    alert("DB에 저장된 주제만 수정할 수 있습니다.");
    return;
  }
  if (!memberStore.userInfo.isAdmin) {
    alert("접근 불가능한 권한입니다.");
    return;
  }

  const updateDto = {
    id: subject.id,
    companyIdx: subject.companyIdx || null,
    subject: subject.subject,
    esgValue: subject.esgValue,
    esgScore: subject.esgScore,
    esgActivityItem: subject.esgActivityItem,
    evaluationCriteria: subject.evaluationCriteria,
    inputs: subject.choices.map((choice) => ({
      text: choice.text,
      type: choice.type,
    })),
  };
  await activityStore.subjectUpdate(updateDto);
  await search(); // 수정 후 최신 리스트로 갱신
  subject.isEditing = false;
  alert("수정을 성공하였습니다.");
};

const deleteSubject = async (qIndex) => {
  if (!memberStore.userInfo.isAdmin) {
    alert("접근 불가능한 권한입니다.");
    return;
  }

  const subject = subjects.value[qIndex];

  await activityStore.subjectDelete(subject.id);

  await search();

  alert("삭제를 성공했습니다.");
};

onMounted(() => {
  search();
});
</script>

<template>
  <div class="bg-gray-50 p-8">
    <div
      v-for="(subject, qIndex) in subjects"
      :key="qIndex"
      class="mb-8 border-b pb-6"
    >
      <div class="flex pt-1">
        <div class="w-1/2 border-r pr-4">
          <h1 class="text-2xl font-bold">활동 주제 {{ qIndex + 1 }}</h1>

          <div class="flex items-center w-full mt-4">
            <label class="block text-gray-700 font-medium text-xl"
              >활동 구분 선택 :
            </label>

            <select
              v-model="subject.esgValue"
              class="border border-gray-300 p-2 rounded ml-2"
              :disabled="!subject.isEditing"
              required
            >
              <option disabled value="">구분</option>
              <option value="E">환경(E)</option>
              <option value="S">사회(S)</option>
              <option value="G">지배구조(G)</option>
            </select>
          </div>

          <div class="flex items-center w-full mt-4">
            <label class="block text-gray-700 font-medium text-xl">인사평가 반영 점수 :</label>

            <input
              v-model="subject.esgScore"
              :readonly="!subject.isEditing"
              type="number"
              class="border border-gray-300 p-2 rounded w-80 mt-3 ml-2 mr-2"
              placeholder="가점 점수 입력(0 ~ 10점 사이)"
            />
          </div>

          <div class="flex items-center w-full mt-4">
            <label class="block text-gray-700 font-medium text-xl"
              >ESG 활동 항목 :
            </label>

            <input
              v-model="subject.esgActivityItem"
              :readonly="!subject.isEditing"
              type="text"
              class="border border-gray-300 p-2 rounded w-80 mt-3 ml-2 mr-2"
              placeholder="ESG 활동 해당 항목 입력"
            />
          </div>

          <div class="flex items-center w-full mt-4">
            <label class="block text-gray-700 font-medium text-xl"
              >평가 기준 :
            </label>

            <input
              v-model="subject.evaluationCriteria"
              :readonly="!subject.isEditing"
              type="text"
              class="border border-gray-300 p-2 rounded w-80 mt-3 ml-2 mr-2"
              placeholder="평가 기준 입력"
            />
          </div>
        </div>

        <div class="w-1/2 pl-4">
          <!-- 질문 내용 -->
          <label class="block font-medium text-gray-700 mb-2">주제 :</label>

          <input
            type="text"
            class="border border-gray-300 p-2 rounded w-80 mb-3"
            placeholder="주제 입력"
            v-model="subject.subject"
            :readonly="!subject.isEditing"
          />

          <!-- 질문 유형 -->
          <div class="mb-4">
            <label class="block font-medium mb-2">입력 항목란</label>
            <div
              v-for="(option, oIndex) in subject.choices"
              :key="oIndex"
              class="flex mb-2 space-x-2"
            >
              <input
                type="text"
                class="border border-gray-300 p-2 rounded rounded w-80"
                v-model="option.text"
                :readonly="!subject.isEditing"
                placeholder="입력 받을 내용 입력 ex) 제목"
              />

              <select
                v-model="option.type"
                class="border border-gray-300 p-2 rounded"
                :disabled="!subject.isEditing"
                required
              >
                <option disabled value="">입력 타입</option>
                <option value="text">텍스트</option>
                <option value="number">숫자</option>
                <option value="file">파일</option>
                <option value="time">시간</option>
              </select>

              <button
                v-if="subject.isEditing"
                class="bg-red-500 w-20 text-white px-3 py-1 rounded"
                @click="removeOption(qIndex, oIndex)"
              >
                삭제
              </button>
            </div>
            <button
              class="bg-green-500 h-10 text-white px-3 py-1 rounded"
              @click="addOption(qIndex)"
              v-if="subject.isEditing"
            >
              입력 항목 추가
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          v-if="!subject.isEditing"
          class="bg-yellow-500 h-10 text-white px-4 py-1 rounded mr-2"
          @click="subject.isEditing = true"
        >
          수정
        </button>

        <button
          v-if="subject.isEditing && qIndex < subjectlength"
          class="bg-blue-500 h-10 text-white px-4 py-1 rounded mr-2"
          @click="updateSubject(qIndex)"
        >
          저장
        </button>

        <button
          v-if="subject.isEditing && qIndex < subjectlength"
          class="bg-black h-10 text-white px-4 py-1 rounded mr-2"
          @click="cancelEdit(qIndex)"
        >
          취소
        </button>

        <button
          class="bg-red-500 h-10 text-white px-4 py-1 rounded"
          @click="deleteSubject(qIndex)"
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
