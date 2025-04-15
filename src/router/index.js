import { createWebHistory, createRouter } from 'vue-router';
// import { useMemberStore } from '../stores/useMemberStore';
// 로그인 & 인증
import Login from '../pages/member/Login.vue';
import FindIdView from '../pages/member/FindIdView.vue'
import ResetPasswordView from '../pages/member/ResetPasswordView.vue'
import ChangePasswordView from '../pages/member/ChangePasswordView.vue'

// 회원가입
import CompanyRegisterView from '../pages/member/CompanyRegisterView.vue'
import EmployeeRegisterView from '../pages/member/EmployeeRegisterView.vue'

// 관리자
import PermissionSetting from '../pages/mosque/PermissionSetting.vue';
import MosqueSearch from '../pages/mosque/MosqueSearch.vue';
import MosqueDetail from '../pages/mosque/MosqueDetail.vue';
import DepartmentSetting from '../pages/department/DepartmentSetting.vue'


// 활동
import AllActivityDetails from '../pages/esg/AllActivityDetails.vue'
import ActivityList from '../pages/esg/ActivityList.vue'
import CampaignList from '../pages/esg/CampaignList.vue'
import CampaignDetail from '../pages/esg/CampaignDetail.vue';

// 교육
import EducationList from '../pages/esg/EducationList.vue'

// 보고서
import ReportListView from '../pages/report/reportList.vue'
import ReportDetailView from '../pages/report/reportDetail.vue'

// 제품
import ProductListView from '../pages/product/productList.vue'
import ProductDetailView from '../pages/product/productDetail.vue'
import ProductRegistView from '../pages/product/ProductRegist.vue'

// 캘린더
import Calendar from '../pages/Calendar/Calendar.vue';

import DashboardView from '../pages/dashboard/Dashboard.vue';
import PartnerDashboard from '../pages/dashboard/PartnerDashboard.vue';
import PartnerListView from '../pages/partner/partnerList.vue';

// 피드백
import FeedbackForm from '../pages/feedback/FeedbackForm.vue';
import FeedbackDetail from '../pages/feedback/FeedbackDetail.vue';

import MyPageView from '../pages/mypage/MyPageView.vue';
const routes = [
  {
    path: '/',
    name: 'homeRedirect',
    beforeEnter: (to, from, next) => {
      const companyId = 1;
      // getUserCompanyIdSomehow(); // 예: store 또는 localStorage 등 
      if (companyId) {
        next(`/partner/${companyId}`);
      } else {
        next(`/partner/${companyId}`)
        // next('/login'); // 로그인 안됐으면 로그인으로
      }
    }
  },
  {
    path: '/dashboard/1',
    name: 'dashboard',
    component: DashboardView
  },
  // 로그인 & 인증 (레이아웃 없이)
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

  // 회원가입 (레이아웃 없이)
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
    path: '/mosqueSearch/1',
    name: 'mosqueSearch',
    component: MosqueSearch
  },
  {
    path: '/mosqueDetail/:id',
    name: 'mosqueDetail',
    component: MosqueDetail,
    props: true
  },
  {
    path: '/permissionSetting/:id',
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
    path: '/campaignlist/1',
    name: 'activityCampaignList',
    component: CampaignList
  },
  {
    path: '/campaigndetail/1',
    name: 'activityCampaignDetail',
    component: CampaignDetail
  },

  // 보고서
  {
    path: '/reportsList/1',
    name: 'reportList',
    component: ReportListView
  },
  {
    path: '/reports/1',
    name: 'reportDetail',
    component: ReportDetailView
  },
  // 제품
  {
    path: '/productList/1',
    name: 'productList',
    component: ProductListView
  },
  {
    path: '/products/1',
    name: 'productDetail',
    component: ProductDetailView
  },

  // 교육
  {
    path: '/educationList/1',
    name: 'EducationList',
    component: EducationList
  },

  // 캘린더
  {
    path: "/calendar/:companyIdx",
    name: 'calendar',
    component: Calendar,
    props: true,
  },

  // 파트너사
  {
    path: '/partnerList/1',
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
    path: '/partner/1',
    name: 'partnerDashboard',
    component: PartnerDashboard,
    props: true
  },
  // 부서 주기 설정
  {
    path: '/departmentSetting/1',
    name: 'DepartmentSetting',
    component: DepartmentSetting
  },
  // 피드백 양식 관리
  {
    path: '/feedbackForm/1',
    name: 'feedbackForm',
    component: FeedbackForm,
  },
  //피드백 작성
  {
    path: '/feedback/:id',
    name: 'feedbackDetail',
    component: FeedbackDetail,
    props: true
  },

  // 친환경 제품 등록
  {
    path: '/productRegist',
    name: 'productRegist',
    component: ProductRegistView
  },
  // 친환경 제품 상세보기
  {
    path: '/productList/:idx',
    name: 'ProductDetail',
    component: () => import('../pages/product/ProductRegist.vue'),
    meta: { hideLayout: false }
  }
  ,
  


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