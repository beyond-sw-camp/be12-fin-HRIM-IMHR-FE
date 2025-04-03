import { createWebHistory, createRouter } from 'vue-router';
// import { useMemberStore } from '../stores/useMemberStore';

import ESGEducationManagementpage from '../pages/ESGEducationManagementpage.vue';

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
    path: '/header',
    name: 'header',
    component: Headers
  },
  {
    path: '/test',
    name: 'esgEducationManagementpage',
    component: ESGEducationManagementpage
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