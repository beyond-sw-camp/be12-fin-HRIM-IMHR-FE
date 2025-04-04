import { createWebHistory, createRouter } from 'vue-router';
// import { useMemberStore } from '../stores/useMemberStore';

import ESGEducationManagementpage from '../pages/ESGEducationManagementpage.vue';
import Home from '../pages/Home.vue';
import LogoSection from '../pages/common/LogoSection.vue';
import Loginpage from '../pages/Member/Loginpage.vue';

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
    path: '/test',
    name: 'loginpage',
    component: Loginpage
  },
  {
    path: '/logo',
    name: 'logo',
    component: LogoSection
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