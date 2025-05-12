<script setup>
import { onMounted, readonly, ref } from "vue";
import { useDepartmentStore } from "../../stores/useDepartmentStore";
import { useCompanyStore } from "../../stores/useCompanyStore";
import { useRouter } from "vue-router";

const router = useRouter();
const departmentStore = useDepartmentStore();
const companyStore = useCompanyStore();

const departments = ref([{ 
  name: "", 
  targetScore: "", 
  targetSScore: "",
  targetGScore: "",
  isEditing:false }]);
const createDepartments = ref([]);
const updateDepartments = ref([]);
const deleteDepartments = ref([]);
const deptlength = ref(0);

const mycompany = ref({
  idx: null,
  name: "",
  targetEScore: null,
  targetSScore: null,
  targetGScore: null,
  isEditing: false,
});


const fetchDept = async () => {
  const response = await departmentStore.fetchDepartments();
  departments.value = response.data.data.departments;
  deptlength.value = response.data.data.departments.length;
};

const addDepartment = () => {
  departments.value.push({ 
    idx: null, name: "", 
    targetScore: "", 
    targetSScore: "",
    targetGScore: "",
    isEditing:true });
};

const removeDept = async (idx) => {
  if (idx) {
    await departmentStore.deleteDepartment(idx);
  }

  await fetchDept();
  
  alert("삭제를 성공했습니다.");
};

const updateDept = async (index) => {
  const dept = departments.value[index];

  await departmentStore.updateDepartment(dept);
  await fetchDept();
  alert("수정을 성공했습니다.");
};

const saveForm = async () => {
  createDepartments.value = departments.value
    .filter((dept) => dept.idx === null)
    .map((dept) => ({
      name: dept.name,
      targetEScore: dept.targetEScore ?? 0,
      targetSScore: dept.targetSScore ?? 0,
      targetGScore: dept.targetGScore ?? 0,
    }));


  const response = await departmentStore.createDepartments({
    createRequests: createDepartments.value,
    deleteRequests: [],
  });

  if (response.data.isSuccess) {
    fetchDept();
    alert("부서가 저장되었습니다!");
  } else {
    alert("저장에 실패했습니다.");
  }
};

const cancleDept = async (index) => {
  departments.value[index].isEditing = false;
  await fetchDept();
};

const updateCompany = async () => {
  await companyStore.updateScore(mycompany.value);

  search();
  alert("수정을 성공하였습니다.");
};

const search = async () => {
  const c = await companyStore.fetchCompany();

  mycompany.value.idx = c.idx ?? null;
  mycompany.value.name = c.name ?? null;
  mycompany.value.targetEScore = c.targetEScore ?? null;
  mycompany.value.targetSScore = c.targetSScore ?? null;
  mycompany.value.targetGScore = c.targetGScore ?? null;
  mycompany.value.isEditing = false;
};

const cancelCompany = async () => {
  mycompany.value.isEditing = false;
  await search(); 
};

onMounted(async () => {
  search();
  fetchDept();
});
</script>

<template>
  <div class="bg-gray-50 p-8">
    <h1 class="text-2xl font-bold mb-6">
      {{ mycompany.name }} 기업 목표 점수 설정
    </h1>

    <div class="mb-3 mb-6 border-b pb-6">
      <div class="flex items-center w-full">
        <label class="block text-gray-700 text-2xl">기업 E 목표 점수 : </label>

        <input
          v-model="mycompany.targetEScore"
          type="number"
          class="border border-gray-300 p-2 rounded w-40 mt-3 ml-2 mr-2"
          placeholder="목표 E 점수 입력"
          :readonly="!mycompany.isEditing"
        />

        <label class="block text-gray-700 text-2xl">기업 S 목표 점수 : </label>

        <input
          v-model="mycompany.targetSScore"
          type="number"
          class="border border-gray-300 p-2 rounded w-40 mt-3 ml-2 mr-2"
          placeholder="목표 S 점수 입력"
          :readonly="!mycompany.isEditing"
        />

        <label class="block text-gray-700 text-2xl">기업 G 목표 점수 : </label>

        <input
          v-model="mycompany.targetGScore"
          type="number"
          class="border border-gray-300 p-2 rounded w-40 mt-3 ml-2 mr-2"
          placeholder="목표 G 점수 입력"
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
          @click="updateCompany()"
        >
          저장
        </button>

        <button
          v-if="mycompany.isEditing"
          class="bg-black h-10 text-white px-4 py-1 rounded mr-2"
          @click="cancelCompany()"
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
          :readonly="!dept.isEditing"
          class="border border-gray-300 p-2 rounded w-50 ml-2 mr-2"
          placeholder="부서명을 입력하세요"
        />

        <label class="block text-gray-700 pl-2">부서 E 목표 점수 : </label>
        <input
          v-model="dept.targetEScore"
          type="number"
          :readonly="!dept.isEditing"
          class="border border-gray-300 p-2 rounded w-40 ml-2 mr-2"
          placeholder="목표 E 점수 입력"
        />

        <label class="block text-gray-700 pl-2">부서 S 목표 점수 : </label>
        <input
          v-model="dept.targetSScore"
          type="number"
          :readonly="!dept.isEditing"
          class="border border-gray-300 p-2 rounded w-40 ml-2 mr-2"
          placeholder="목표 S 점수 입력"
        />

        <label class="block text-gray-700 pl-2">부서 G 목표 점수 : </label>
        <input
          v-model="dept.targetGScore"
          type="number"
          :readonly="!dept.isEditing"
          class="border border-gray-300 p-2 rounded w-40 ml-2 mr-2"
          placeholder="목표 G 점수 입력"
        />
      </div>

      <div class="flex justify-end">
        <button
          v-if="!dept.isEditing && index < deptlength"
          class="bg-yellow-500 h-10 text-white px-4 py-1 rounded mr-2"
          @click="dept.isEditing = true"
        >
          수정
        </button>

        <button
          v-if="dept.isEditing && index < deptlength"
          class="bg-blue-500 h-10 text-white px-4 py-1 rounded mr-2"
          @click="updateDept(index)"
        >
          저장
        </button>

        <button 
          v-if="dept.isEditing && index < deptlength"
          class="bg-black h-10 text-white px-4 py-1 rounded mr-2"
          @click="cancleDept(index)">
          취소
        </button>

        <button
          class="bg-red-500 text-white px-4 py-1 rounded"
          @click="removeDept(dept.idx)"
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
