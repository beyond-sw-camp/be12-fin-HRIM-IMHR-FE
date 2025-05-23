import { createWebHistory, createRouter } from 'vue-router';

// 로그인 & 인증
import Login from '../pages/member/Login.vue';
import FindIdView from '../pages/member/FindIdView.vue'
import ResetPasswordView from '../pages/member/ResetPasswordView.vue'
import ChangePasswordView from '../pages/member/ChangePasswordView.vue'

// 회원가입
import CompanyRegisterView from '../pages/member/CompanyRegisterView.vue'
import EmployeeRegisterView from '../pages/member/EmployeeRegisterView.vue'

// 관리자
import PermissionSetting from '../pages/staff/PermissionSetting.vue';
import StaffSearch from '../pages/staff/StaffSearch.vue';
import StaffDetail from '../pages/staff/StaffDetail.vue';
import DepartmentSetting from '../pages/department/DepartmentSetting.vue'

// 활동
import AllActivityDetails from '../pages/ESG/AllActivityDetails.vue'
import ActivityList from '../pages/ESG/ActivityList.vue'
import CampaignList from '../pages/ESG/CampaignEventList.vue';
import CampaignMemberAdd from '../pages/ESG/CampaignMemberAdd.vue';
import ActivitySetting from '../pages/ESG/ESGActivitySetting.vue'

// 보고서
import ReportListView from '../pages/report/reportList.vue'
import ReportDetailView from '../pages/report/reportDetail.vue'

// 제품
import ProductListView from '../pages/product/productList.vue'
import ProductDetailView from '../pages/product/productDetail.vue'
import ProductRegistView from '../pages/product/ProductRegist.vue'

// 캘린더
import Calendar from '../pages/Calendar/Calendar.vue';

// 대시보드 & 파트너
import PartnerDashboard from '../pages/dashboard/partnerDashboard.vue';
import DepartmentDashboard from '../pages/dashboard/DepartmentDashboard.vue';
import PartnerListView from '../pages/partner/partnerList.vue';


// 피드백
import FeedbackForm from '../pages/feedback/FeedbackForm.vue';
import FeedbackDetail from '../pages/feedback/FeedbackDetail.vue';

// 마이페이지
import MyPageView from '../pages/mypage/MyPageView.vue';

const routes = [
  {
      path: '/departmentdashboard',
      name: 'dashboard-no-department',
      component: DepartmentDashboard,
      props: route => ({
        departmentIdx:null,
        departmentName: null,
        yearMonth: null,
      })
    },
    {
      path: '/departmentdashboard/:departmentIdx/:departmentName/:yearMonth',
      name: 'dashboard-with-department',
      component: DepartmentDashboard,
      props: route => ({
        departmentIdx:route.params.departmentIdx,
        departmentName: route.params.departmentName,
        yearMonth: route.params.yearMonth,
      })
  },

  // 로그인 & 인증
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { hideLayout: true }
  },
  {
    path: '/findId',
    name: 'findId',
    component: FindIdView,
    meta: { hideLayout: true }
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: ResetPasswordView,
    meta: { hideLayout: true }
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: ChangePasswordView,
    meta: { hideLayout: true }
  },
  {
    path: '/changePassword/:uuid',
    name: 'changePasswordUuid',
    component: ChangePasswordView,
    meta: { hideLayout: true }
  },

  // 회원가입
  {
    path: '/companySignup',
    name: 'companyRegister',
    component: CompanyRegisterView,
    meta: { hideLayout: true }
  },
  {
    path: '/employeeSignup',
    name: 'employeeRegister',
    component: EmployeeRegisterView,
    meta: { hideLayout: true }
  },

  // 관리자
  {
    path: '/staffSearch',
    name: 'staffSearch',
    component: StaffSearch
  },
  {
    path: '/staffDetail/:id',
    name: 'staffDetail',
    component: StaffDetail,
    props: true
  },
  {
    path: '/permissionSetting',
    name: 'permissionSetting',
    component: PermissionSetting,
    props: true
  },

  // 활동
  {
    path: '/activityList',
    name: 'ActivityList',
    component: ActivityList
  },
  {
    path: '/activeDetails/:idx',
    name: 'allActivityDetails',
    component: AllActivityDetails
  },
  {
    path: '/activeSetting',
    name: 'activitySetting',
    component: ActivitySetting
  },

  // 캘린더
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar,
    props: true,
  },
  {
    path: '/campaignlist',
    name: 'campaignList',
    component: CampaignList
  },
  {
    path: '/memberadd/:idx',
    name: 'memberadd',
    component: CampaignMemberAdd
  },

  // 보고서
  {
    path: '/reportsList/',
    name: 'reportList',
    component: ReportListView
  },
  {
    path: '/reports/:idx',
    name: 'reportDetail',
    component: ReportDetailView
  },

  // 파트너사
  {
    path: '/partnerList',
    name: 'partnerList',
    component: PartnerListView
  },
  {
    path: '/partner/:idx',
    name: 'partnerDashboard',
    component: PartnerDashboard,
    props: true
  },


  // 부서 설정
  {
    path: '/departmentSetting/',
    name: 'DepartmentSetting',
    component: DepartmentSetting
  },

  // 피드백
  {
    path: '/feedbackForm/',
    name: 'feedbackForm',
    component: FeedbackForm,
  },
  {
    path: '/feedback/:id',
    name: 'feedbackDetail',
    component: FeedbackDetail,
    props: true
  },

  // 제품 등록
  {
    path: '/productRegist',
    name: 'productRegist',
    component: ProductRegistView
  },

  // 제품 목록 (회사별)
  {
    path: '/productList/:idx',
    name: 'ProductList',
    component: ProductListView,
    props: true,
  },

  // 제품 상세 (회사 idx + 제품 idx)
  {
    path: '/productDetail/:idx',
    name: 'productDetail',
    component: ProductDetailView,
    props: true,
  },

  // 마이 페이지
  {
    path: '/mypage',
    name: 'myPage',
    component: MyPageView,
  },
];



const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
