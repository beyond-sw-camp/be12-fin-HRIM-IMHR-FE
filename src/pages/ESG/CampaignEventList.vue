<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from "lucide-vue-next";
import MemberAdd from './CampaignMemberAdd.vue';


const search = ref("");
const router = useRouter()
const searchQuery = ref('')

const selectedCampaignIndex = ref(null);
const registerModule = ref(false);

const deleteCampaign = () => {
  if (selectedCampaignIndex.value !== null) {

    selectedCampaignIndex.value = null;
  }
};

const addCampain = (newPartners) => {
  newPartners.forEach(partner => {
    companies.value.push({
      name: partner.name,

    })
  })
  registerModule.value = false
}

const addPartners = (newPartners) => {
  newPartners.forEach(partner => {
    companies.value.push({
      name: partner.name,
      totalGrade: '-', environment: '-', social: '-', governance: '-', score: 0
    })
  })
  registerModule.value = false
}

const campaigns = ref([
  { title: 'ESG 캠페인 5', date: '2025.02.12' },
  { title: 'ESG 캠페인 4', date: '2025.02.12' },
  { title: 'ESG 캠페인 3', date: '2025.02.12' },
  { title: 'ESG 캠페인 2', date: '2025.02.12' },
  { title: 'ESG 캠페인 1', date: '2025.02.12' }
])

const filteredCampaigns = computed(() =>
    campaigns.value.filter(c => c.title.includes(searchQuery.value))
)

const goToDetail = (item) => {
  router.push({ path: '/campaigndetail/1', query: { title: item.title } })
}

const userRole = ref(JSON.parse(localStorage.getItem('userInfo'))?.role || 'manager')
// manager executive staff `'${{변수명}}'` v-if="userRole === 'manager'"
</script>


<template>
  <div class="px-8 py-10 bg-gray-50 min-h-screen">
    <!-- 페이지 제목 -->
    <h2 class="text-2xl font-bold text-slate-800 text-center mb-8">사내 캠페인 리스트</h2>

    <!-- 검색창 -->
    <div
      class="max-w-2xl mx-auto bg-white p-4 rounded-md shadow-md flex items-center gap-3 mb-8"
    >
      <Search color="black" :size="30" />

      <input
        type="text"
        placeholder="캠페인명 검색"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
      />

      <button
        class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition"
      >
        검색
      </button>
    </div>

    

    <div class="flex justify-end max-w-4xl mx-auto" v-if="userRole === 'manager'">
      <button
        @click="registerModule = true"
        class="bg-slate-800 text-white px-4 py-1 rounded hover:bg-slate-900 transition mb-3"
      >
        캠페인 추가
      </button>
    </div>

    <!-- 리스트 테이블 -->
    <div class="bg-white rounded-lg shadow overflow-hidden max-w-4xl mx-auto">
      <table class="min-w-full text-sm text-slate-800 text-center">
        <thead class="bg-slate-100 border-b border-gray-200">
        <tr>
          <th class="py-3 px-6">내용</th>
          <th class="py-3 px-6">날짜</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(item, index) in filteredCampaigns"
            :key="index"
            @click="goToDetail(item)"
            class="border-b hover:bg-slate-50 cursor-pointer transition"
        >
          <td class="py-3 px-6 font-medium">{{ item.title }}</td>
          <td class="py-3 px-6 text-slate-500">{{ item.date }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- 페이지네이션 -->
    <div class="flex justify-center mt-8 space-x-2 text-sm">
      <button class="px-3 py-1 bg-slate-700 text-white rounded hover:bg-slate-900">← 이전</button>
      <button v-for="page in 5" :key="page" class="px-3 py-1 bg-slate-100 rounded hover:bg-slate-200">{{ page }}</button>
      <button class="px-3 py-1 bg-slate-700 text-white rounded hover:bg-slate-900">다음 →</button>
    </div>

    <MemberAdd
      :visible="registerModule"
      @close="registerModule = false"
      @confirm="addCampain"
    />
  </div>
</template>