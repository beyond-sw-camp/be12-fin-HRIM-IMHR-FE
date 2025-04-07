import { createWebHistory, createRouter } from 'vue-router';
// import { useMemberStore } from '../stores/useMemberStore';
// 로그인 & 인증
import AdminLoginView from '../pages/admin/AdminLoginView.vue'
import FindIdView from '../pages/auth/FindIdView.vue'
import ResetPasswordView from '../pages/auth/ResetPasswordView.vue'
import ChangePasswordView from '../pages/auth/ChangePasswordView.vue'

// 회원가입
import CompanyRegisterView from '../pages/register/CompanyRegisterView.vue'
import EmployeeRegisterView from '../pages/register/EmployeeRegisterView.vue'

// 관리자
import AdminUserApprovalView from '../pages/admin/AdminUserApprovalView.vue'
import AdminUserSearchView from '../pages/admin/AdminUserSearchView.vue'
import AdminPermissionTransferView from '../pages/admin/AdminPermissionTransferView.vue'
import SettingView from '../pages/admin/Setting.vue'


// 활동
import ActivityListView from '../pages/activity/ActivityListView.vue';
import AllActivityDetails from '../pages/activity/AllActivityDetails.vue'
import ActivityCampaignListView from '../pages/activity/ActivityCampaignListView.vue';
import ActivityCampaignDetailView from '../pages/activity/ActivityCampaignDetailView.vue';

// 보고서
import ReportListView from '../pages/report/reportList.vue'
import ReportDetailView from '../pages/report/reportDetail.vue'

// 제품
import ProductListView from '../pages/product/productList.vue'
import ProductDetailView from '../pages/product/productDetail.vue'

// 교육
import ESGEducationListpage from '../pages/Education/ESGEducationListpage.vue';

// 캘린더
import Calendar from '../pages/Calendar/Calendar.vue'
import DashboardView from '../pages/dashboard/Dashboard.vue';
import PartnerDashboardView from '../pages/dashboard/partnerDashboard.vue';
import PartnerListView from '../pages/partner/partnerList.vue';

// 마이페이지
import FeedbackFormView from '../pages/feedback/FeedbackForm.vue';

// 피드백
import MyPageView from '../pages/mypage/MyPageView.vue';

// const checkLogin = async (from, to, next) => {
//   const memberStore = useMemberStore();
//   // await memberStore.loginCheck();
//   if(memberStore.isLogin) {
//     return next();
//   }

//   next("/login");
// }

const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  // 로그인 & 인증 (레이아웃 없이)
  {
    path: '/login',
    name: 'adminLogin',
    component: AdminLoginView,
    meta: { hideLayout: true }
  },
  {
    path: '/find-id',
    name: 'findId',
    component: FindIdView,
    meta: { hideLayout: true }
  },
  {
    path: '/reset-password',
    name: 'resetPassword',
    component: ResetPasswordView,
    meta: { hideLayout: true }
  },
  {
    path: '/change-password',
    name: 'changePassword',
    component: ChangePasswordView,
    meta: { hideLayout: true }
  },

  // 회원가입 (레이아웃 없이)
  {
    path: '/register/company',
    name: 'companyRegister',
    component: CompanyRegisterView,
    meta: { hideLayout: true }
  },
  {
    path: '/register/employee',
    name: 'employeeRegister',
    component: EmployeeRegisterView,
    meta: { hideLayout: true }
  },

  // 관리자
  {
    path: '/admin/user-approval',
    name: 'adminUserApproval',
    component: AdminUserApprovalView
  },
  {
    path: '/admin/user-search',
    name: 'adminUserSearch',
    component: AdminUserSearchView
  },
  {
    path: '/admin/user-permission',
    name: 'adminUserPermission',
    component: AdminPermissionTransferView
  },

  // 활동
  {
    path: '/activity',
    name: 'ActivityList',
    component: ActivityListView
  },
  {
    path: '/activity/all',
    name: 'allActivityDetails',
    component: AllActivityDetails
  },
  {
    path: '/admin/campaign-list',
    name: 'ActivityCampaignList',
    component: ActivityCampaignListView
  },
  {
    path: '/admin/campaign-detail',
    name: 'ActivityCampaignDetail',
    component: ActivityCampaignDetailView
  },

  // 보고서
  {
    path: '/reports',
    name: 'reportList',
    component: ReportListView
  },
  {
    path: '/reports/:id',
    name: 'reportDetail',
    component: ReportDetailView
  },
  // 제품
  {
    path: '/products',
    name: 'productList',
    component: ProductListView
  },
  {
    path: '/products/:id',
    name: 'productDetail',
    component: ProductDetailView
  },

  // 교육
  {
    path: '/education',
    name: 'esgEducation',
    component: ESGEducationListpage
  },

  // 캘린더
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar
  },

  // 파트너사
  {
    path: '/partnerList',
    name: 'partnerList',
    component: PartnerListView
  },

  // 마이페이지
  {
    path: '/mypage',
    name: 'mypage',
    component: MyPageView
  },
  // 파트너 회사 대시보드
  {
    path: '/partner/:idx',
    name: 'partner',
    component: PartnerDashboardView
  },
  // 회사 ESG 갱신 주기 설정
  {
    path: '/setting/:idx',
    name: 'setting',
    component: SettingView
  },
    // 피드백 양식 관리
    {
      path: '/feedbackForm/:idx',
      name: 'feedbackForm',
      component: FeedbackFormView
    },



]

const router = createRouter({
  history: createWebHistory(),
  routes,
  //   scrollBehavior(to, from, savedPosition) {
  //     if (to.hash) {
  //       return {
  //         el: to.hash,
  //         behavior: 'smooth',
  //       }
  //     }
  //     if (savedPosition) {
  //       return savedPosition
  //     } else {
  //       return { top: 0 }
  //     }
  //   }
})

export default router;