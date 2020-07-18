import { RouteConfig } from 'vue-router';
import { CONST_ADMIN_USER } from '@/services/shared';

const componentsRouter: RouteConfig[] = [
  {
    path: '/founder-consult',
    component: () => import('../../modules/founder-consult/FounderConsult.vue'),
    name: '방문자 신청',
    meta: {
      authRequired: true,
      layout: 'MainLayout',
      roles: [...CONST_ADMIN_USER],
    },
  },
];

export default componentsRouter;
