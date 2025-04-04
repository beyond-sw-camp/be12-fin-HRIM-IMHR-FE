import { createWebHistory, createRouter } from 'vue-router';
// import { useMemberStore } from '../stores/useMemberStore';

import ESGEducationManagementpage from '../pages/ESGEducationManagementpage.vue';
import Home from '../pages/Home.vue';
<<<<<<< Updated upstream
=======
import Loginpage from '../pages/Member/Loginpage.vue';
import ESGEducationManagementpage from '../pages/Education/ESGEducationManagementpage.vue';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    path: '/test',
    name: 'esgEducationManagementpage',
=======
    path: '/login',
    name: 'loginpage',
    component: Loginpage
  },
  {
    path: '/edumanagment',
    name: 'edumanagment',
>>>>>>> Stashed changes
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