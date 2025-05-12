<script setup>
import { onMounted, readonly, ref } from "vue";
import { useDepartmentStore } from "../../stores/useDepartmentStore";
import { useCompanyStore } from "../../stores/useCompanyStore";
import { useRouter } from "vue-router";

const router = useRouter();
const departmentStore = useDepartmentStore();
const compnayStore = useCompanyStore();

const departments = ref([{ name: "", targetScore: null }]);
const createDepartments = ref([]);
const deleteDepartments = ref([]);

const mycompany = ref({
  idx: null,
  name: "",
  targetScore: null,
  isEditing: false,
});
const targetScore = ref([""]);

const addDepartment = () => {
  departments.value.push({ idx: "", name: "", targetScore: null });
};

const removeDepartment = (index, idx) => {
  if (idx !== "") {
    deleteDepartments.value.push({ idx: idx });
  }
  departments.value.splice(index, 1);
};

const saveForm = async () => {
  createDepartments.value = departments.value
    .filter((dept) => dept.idx === "")
    .map((dept) => dept.name);
  console.log("부서 저장:", createDepartments.value, deleteDepartments.value);
  const response = await departmentStore.updateDepartments({
    createRequests: createDepartments.value,
    deleteRequests: deleteDepartments.value,
  });
  if (response.data.isSuccess) {
    alert("부서가 저장되었습니다!");
    router.go(0);
  }
};

const update = async () => {
  console.log("vue mycompany", mycompany.value);
  const formData = mycompany.map((i) => ({
    idx: i.idx,
    targetScore: i.targetScore,
  }));

  mycompany.value.isEditing = true;
  search();
  alert("수정을 성공하였습니다.");
};

const search = async () => {
  const c = await compnayStore.fetchCompany();

  mycompany.value = c.map((i) => ({
    idx: i.idx,
    targetScore: i.targetScore,
    name: i.name,
    isEditing: false,
  }));
};

const cancelEdit = async () => {
  mycompany.value.isEditing = false;
  search(); 
};

onMounted(async () => {
  const response = await departmentStore.fetchDepartments();
  search();

  departments.value = response.data.data.departments;
});
</script>

<template>
  <div class="bg-gray-50 p-8">
    <h1 class="text-2xl font-bold mb-6">
      {{ mycompany.name }} 기업 목표 점수 설정
    </h1>

    <div class="mb-3 mb-6 border-b pb-6">
      <div class="flex items-center w-full">
        <label class="block text-gray-700 text-2xl">기업 목표 점수 : </label>

        <input
          v-model="mycompany.targetScore"
          type="number"
          class="border border-gray-300 p-2 rounded w-80 mt-3 ml-2 mr-2"
          placeholder="기업 목표 점수를 입력해주세요."
          :readonly="!mycompany.isEditing"
        />
      </div>

      <div class="flex justify-end">
        <button
          v-if="!mycompany.isEditing"
          class="bg-yellow-500 h-10 text-white px-4 py-1 rounded mr-2"
          @click="mycompany.isEditing = true"
        >
          수정
        </button>

        <button
          v-if="mycompany.isEditing"
          class="bg-blue-500 h-10 text-white px-4 py-1 rounded mr-2"
          @click="update()"
        >
          저장
        </button>

        <button
          v-if="mycompany.isEditing"
          class="bg-black h-10 text-white px-4 py-1 rounded mr-2"
          @click="cancelEdit()"
        >
          취소
        </button>
      </div>
    </div>

    <h2 class="text-2xl font-bold mb-6">부서 설정</h2>

    <div
      v-for="(dept, index) in departments"
      :key="dept.idx"
      class="mb-6 border-b pb-6"
    >
      <label class="block font-bold mb-1">부서 {{ index + 1 }}</label>

      <div class="flex items-center w-full mb-3">
        <label class="block text-gray-700 pl-2">부서 명 : </label>
        <input
          v-model="dept.name"
          type="text"
          :readonly="dept.idx !== ''"
          class="border border-gray-300 p-2 rounded w-80 ml-2 mr-2"
          placeholder="부서명을 입력하세요"
        />

        <label class="block text-gray-700 pl-2">부서 목표 점수 : </label>
        <input
          v-model="dept.targetScore"
          type="text"
          :readonly="dept.idx !== ''"
          class="border border-gray-300 p-2 rounded w-80 ml-2 mr-2"
          placeholder="부서 목표 점수 이력해주세요."
        />
        <input />
      </div>

      <div class="flex justify-end">
        <button
          class="bg-red-500 text-white px-4 py-1 rounded"
          @click="removeDepartment(index, dept.idx)"
        >
          부서 삭제
        </button>
      </div>
    </div>

    <div class="mb-6">
      <button
        class="bg-blue-600 text-white px-6 py-2 rounded"
        @click="addDepartment"
      >
        부서 추가
      </button>
    </div>

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
