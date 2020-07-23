import { RouteConfig } from 'vue-router';
import { CONST_ADMIN_USER } from '@/services/shared';

// 철자 순으로 컴퍼논트 나열한다.
const componentsRouter: RouteConfig[] = [
  {
    path: '/company',
    name: '업체',
    component: () => import('../../modules/company/Company.vue'),
    children: [
      {
        path: '/company',
        name: '업체 관리',
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
      {
        path: '/company/:id',
        name: 'CompanyDetail',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/company/components/CompanyDetail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
        },
      },
    ],
  },
  {
    path: '/company-user',
    name: '업체 사용자 관리',
    component: () => import('../../modules/company-user/CompanyUser.vue'),
    children: [
      {
        path: '/company-user',
        name: '업체 사용자 관리',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/company-user/components/CompanyUserList.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '업체 사용자 관리',
        },
      },
    ],
  },
  {
    path: '/founder-consult',
    name: '방문자 신청',
    component: () => import('../../modules/founder-consult/FounderConsult.vue'),
    children: [
      {
        path: '/founder-consult',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */
            '../../modules/founder-consult/components/FounderConsultList.vue'
          ),
        name: '방문자 신청 관리',
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
          detailPage: true,
        },
      },
    ],
  },
];

export default componentsRouter;
