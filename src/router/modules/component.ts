import { RouteConfig } from 'vue-router';
import { CONST_ADMIN_USER } from '@/services/shared';

const componentsRouter: RouteConfig[] = [
  {
    path: '/founder-consult',
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
        path: '/:id',
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
