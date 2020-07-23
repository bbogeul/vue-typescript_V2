import { RouteConfig } from 'vue-router';
import { CONST_ADMIN_USER } from '@/services/shared';

// 철자 순으로 컴퍼논트 나열한다.
const componentsRouter: RouteConfig[] = [
  {
    path: '/company',
    name: 'Company',
    component: () => import('../../modules/company/Company.vue'),
    children: [
      {
        path: '/',
        name: 'CompanyList',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/company/components/CompanyList.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '업체관리',
        },
      },
    ],
  },
  {
    path: '/founder-consult',
    name: 'FounderConsult',
    component: () => import('../../modules/founder-consult/FounderConsult.vue'),
    children: [
      {
        path: '/',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */
            '../../modules/founder-consult/components/FounderConsultList.vue'
          ),
        name: 'FounderConsultList',
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '방문자 신청',
        },
      },
      {
        path: '/founder-consult/:id',
        name: 'FounderConsultDetail',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/founder-consult/components/FounderConsultDetail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
        },
      },
    ],
  },
];

export default componentsRouter;
