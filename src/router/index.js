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