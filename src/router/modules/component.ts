import { RouteConfig } from 'vue-router';
import { CONST_ADMIN_USER } from '@/services/shared';
import router from '..';

const componentsRouter: RouteConfig[] = [
  {
    path: '/founder-consult',
    component: () =>
      import(
        /* webpackChunkName: "lazyLoaded" */
        '../../modules/founder-consult/FounderConsult.vue'
      ),
    name: 'FounderConsult',
    meta: {
      authRequired: true,
      layout: 'MainLayout',
      roles: [...CONST_ADMIN_USER],
      title: '방문자 신청',
    },
    children: [
      {
        path: '/founder-consult/:id(\\d+)',
        name: 'test',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/founder-consult/FounderConsult.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '',
        },
      },
    ],
  },
];

export default componentsRouter;
