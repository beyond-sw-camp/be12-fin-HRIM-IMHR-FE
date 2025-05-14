<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { Search } from "lucide-vue-next";
import PartnerDelete from "./PartnerDelete.vue";
import PartnerRegist from "./PartnerRegist.vue";
import { usePartnerStore } from "../../stores/usePartnerStore";
import { useCompanyStore } from "../../stores/useCompanyStore";

const partnerStore = usePartnerStore();
const search = ref("");
const currentPage = ref(0);
const totalPages = ref(0);
const mycompanyIdx = computed(() => partnerStore.mycompanyIdx);
const companyStore = useCompanyStore();

const registerModule = ref(false);
const deleteModal = ref(false);
const selectedPartneryIndex = ref(null);
const companyId = ref(null);

const onSearch = async () => {
  currentPage.value = 0;
  await fetchCompanies(); // 키워드로 백엔드 검색
};

const openRegistModal = async () => {
  await companyStore.list(0, 5);
  companyId.value = mycompanyIdx;
  registerModule.value = true;
};

const openDeleteModal = (idx) => {
  selectedPartneryIndex.value = idx;
  deleteModal.value = true;
};

const deletePartner = async () => {
  await fetchCompanies(); // 최신 리스트 다시 불러오기
  deleteModal.value = false;
  alert("협력사 삭제가 성공적으로 되었습니다.");
};

const registPartner = async () => {
  await fetchCompanies();
  registerModule.value = false;
  alert("협력사 추가가 성공적으로 되었습니다.");
};

const filteredPartners = computed(() =>
  partnerStore.partners.filter((p) =>
    (p.companyName || "").toLowerCase().includes(search.value.toLowerCase()) 
  )
);



const fetchCompanies = async () => {
  totalPages.value = await partnerStore.pagelist(
    currentPage.value,
    8,
    search.value
  );
};

watch(currentPage, fetchCompanies);
onMounted(fetchCompanies);

const userRole = ref(
  JSON.parse(localStorage.getItem("userInfo"))?.role || "manager"
);
// manager executive staff `'${{변수명}}'` v-if="userRole === 'manager'"
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold text-slate-800 mb-8 text-center">
      협력사 리스트
    </h1>

 <!-- ✅ ESG TOP3 차트 섹션 -->
    <div class="max-w-5xl mx-auto mb-10">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-slate-700">협력사 ESG 점수 Top 3</h2>
        </div>
        <iframe
          src="https://www.imhr.p-e.kr/grafana/d-solo/c28e40df-1f86-4207-a40a-11fd7b80cc7b/new-dashboard?orgId=1&from=1747181305209&to=1747202905209&timezone=browser&var-year=2025&var-company_idx=1&editIndex=1&panelId=2&__feature.dashboardSceneSolo"
          width="100%"
          height="300"
          frameborder="0"
          class="w-full rounded border"
        ></iframe>
      </div>
    </div>

    <!-- 검색창 -->
    <div
      class="max-w-2xl mx-auto bg-white p-4 rounded-md shadow-md flex items-center gap-3 mb-3"
    >
      <Search color="black" :size="30" />

      <input
        type="text"
        v-model="search"
        placeholder="검색어를 입력하세요"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
      />

      <button
        class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition"
        @click="onSearch"
      >
        검색
      </button>
    </div>

    <div class="flex justify-end" v-if="userRole === 'manager'">
      <button
        @click="openRegistModal"
        class="bg-slate-800 text-white px-4 py-1 rounded hover:bg-slate-900 transition mb-3"
      >
        협력사 추가
      </button>
    </div>

    <!-- 테이블 -->
    <div class="overflow-x-auto bg-white rounded shadow">
      <table class="w-full table-auto text-center">
        <thead class="bg-slate-100 text-slate-700">
          <tr>
            <th class="p-3 border" rowspan="2">회사명</th>
            <th class="p-3 border" colspan="4">KEGS</th>
            <th class="p-3 border" rowspan="2" v-if="userRole === 'manager'">
              삭제
            </th>
          </tr>
          <tr>
            <th class="p-2 border">종합등급</th>
            <th class="p-2 border">환경</th>
            <th class="p-2 border">사회</th>
            <th class="p-2 border">지배구조</th>
          </tr>
        </thead>
        <tbody v-if="partnerStore.partners.length > 0">
          <tr
            v-for="(partner, idx) in filteredPartners"
            :key="idx"
            class="hover:bg-slate-50 border-b"
          >
            <td class="p-2">
              <router-link to="/partner/1">
                {{ partner.companyName }}
              </router-link>
            </td>

            <td class="p-2">{{ partner.totalScore }}</td>
            <td class="p-2">{{ partner.environmentScore }}</td>
            <td class="p-2">{{ partner.socialScore }}</td>
            <td class="p-2">{{ partner.governanceScore }}</td>
            <!-- <td class="p-2">{{ partner.score }}</td> -->

            <td class="p-2" v-if="userRole === 'manager'">
              <button
                class="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 transition"
                @click="openDeleteModal(partner.idx)"
              >
                삭제
              </button>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td class="p-4 text-center text-gray-500" colspan="7">
              검색 결과가 없습니다.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 페이지네이션 -->
    <div class="flex justify-center items-center mt-6 space-x-2 text-sm">
      <button
        class="px-3 py-1 bg-slate-700 text-white rounded disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        ← 이전
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page - 1"
        :class="[
          'px-3 py-1 rounded',
          currentPage === page - 1
            ? 'bg-slate-800 text-white'
            : 'bg-slate-100 hover:bg-slate-200',
        ]"
      >
        {{ page }}
      </button>

      <button
        class="px-3 py-1 bg-slate-700 text-white rounded disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="currentPage === totalPages - 1"
        @click="currentPage++"
      >
        다음 →
      </button>
    </div>

    <PartnerDelete
      :visible="deleteModal"
      :partnerIdx="selectedPartneryIndex"
      @close="deleteModal = false"
      @confirm="deletePartner"
    />

    <PartnerRegist
      :visible="registerModule"
      :companyIdx="companyId"
      @close="registerModule = false"
      @confirm="registPartner"
    />
  </div>
</template>