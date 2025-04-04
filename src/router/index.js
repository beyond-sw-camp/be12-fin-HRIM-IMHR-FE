import { createWebHistory, createRouter } from 'vue-router';
// import { useMemberStore } from '../stores/useMemberStore';
import Home from '../pages/Home.vue';
import ESGEducationListpage from '../pages/Education/ESGEducationListpage.vue';
import Loginpage from '../pages/Member/Loginpage.vue';
import DashboardView from '../pages/dashboard/Dashboard.vue';
import ActivityListView from '../pages/activity/ActivityListView.vue';
import ActivityCampaignListView from '../pages/activity/ActivityCampaignListView.vue';
import ActivityCampaignDetailView from '../pages/activity/ActivityCampaignDetailView.vue';
import reportListView from '../pages/report/reportList.vue';
import AllActivityDetails from '../pages/activity/AllActivityDetails.vue';
import reporDetailView from '../pages/report/reportDetail.vue';
import productListView from '../pages/product/productList.vue';
import Calendar from '../pages/Calendar/Calendar.vue';
import productDetailView from '../pages/product/productDetail.vue';
// 관리자 관련
import AdminUserApprovalView from '../pages/admin/AdminUserApprovalView.vue'
import AdminUserSearchView from '../pages/admin/AdminUserSearchView.vue'
import AdminPermissionTransferView from '../pages/admin/AdminPermissionTransferView.vue'
// 홈
import HomeView from '../pages/home/HomeView.vue'
// 로그인 및 인증 관련
import AdminLoginView from '../pages/admin/AdminLoginView.vue'
import FindIdView from '../pages/auth/FindIdView.vue'
import ResetPasswordView from '../pages/auth/ResetPasswordView.vue'
import ChangePasswordView from '../pages/auth/ChangePasswordView.vue'

// 회원가입
import CompanyRegisterView from '../pages/register/CompanyRegisterView.vue'
import EmployeeRegisterView from '../pages/register/EmployeeRegisterView.vue'


// const checkLogin = async (from, to, next) => {
//   const memberStore = useMemberStore();
//   // await memberStore.loginCheck();
//   if(memberStore.isLogin) {
//     return next();
//   }

//   next("/login");
// }

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'loginpage',
    component: Loginpage
  },
  {
    path: '/edumanagment',
    name: 'edumanagment',
    component: ESGEducationListpage
  },
  {
    path: '/aaDetails',
    name: 'aaDetails',
    component: AllActivityDetails
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/activity',
    name: 'ActivityList',
    component: ActivityListView
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
  {
    path: '/reportList',
    name: 'reportList',
    component: reportListView
  },
  {
    path: '/reportDetail',
    name: 'reportDetail',
    component: reporDetailView
  },
  {
    path: '/productList',
    name: 'productList',
    component: productListView
  },
  {
    path: '/calendat',
    name: 'calendat',
    component: Calendar
  },
  {
    path: '/productDetail',
    name: 'productDetail',
    component: productDetailView
  },
  { path: '/', component: HomeView },

  // 로그인 & 인증
  { path: '/login', component: AdminLoginView },
  { path: '/find-id', component: FindIdView },
  { path: '/reset-password', component: ResetPasswordView },
  { path: '/change-password', component: ChangePasswordView },

  // 관리자 기능
  { path: '/admin/user-approval', component: AdminUserApprovalView },
  { path: '/admin/user-search', component: AdminUserSearchView },
  { path: '/admin/user-permission', component: AdminPermissionTransferView },

  // 회원가입
  { path: '/register/company', component: CompanyRegisterView },
  { path: '/register/employee', component: EmployeeRegisterView },
  
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