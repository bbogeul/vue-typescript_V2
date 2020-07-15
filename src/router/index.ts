import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import NonMainLayout from '../modules/_layouts/Layout/NonMainLayout.layout.vue';
import { Environment, DevelopmentEnvironment } from '../../environments';
import { component } from 'vue/types/umd';
import { ADMIN_USER } from '@/services/shared';

// 뷰에서 라이터를 사용할 것을 파람으로 받아 다른 라우터 기능을 억제한다.
Vue.use(Router);

export const constantRoutes: RouteConfig[] = [
  {
    path: '/login',
    component: NonMainLayout,
    name: 'Login',
    meta: { hidden: true, requiredAuth: false },
  },
];

const createRouter = () =>
  new Router({
    // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    // TODO: pull in environment
    base: process.env.BASE_URL || 'http:localhost:4200/',
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
