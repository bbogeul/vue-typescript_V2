import NProgress from 'nprogress';
import '../../../node_modules/nprogress/nprogress.css';
import { PermissionGuard } from '../../core/guards/';
import { Route } from 'vue-router';
import router from '@/router';
import JwtStorageService from '../../services/shared/auth/jwt-storage.service';
import * as jwtCode from 'jwt-decode';
import { async } from 'rxjs';

const whiteList = ['/login', '/auth-redirect'];

NProgress.configure({ showSpinner: false });

const getPageTitle = (key: string) => {
  const hasKey = `${key}`;
  if (hasKey) {
    return hasKey;
  }
  return '나누다 공유 플랫폼';
};

router.beforeEach(async (to: Route, from: Route, next: any) => {
  // 진행바 시작~
  NProgress.start();

  if (JwtStorageService.getToken() && jwtCode(JwtStorageService.getToken())) {
    if (to.path === '/login') {
      next({ path: '/dashboard' });
    }
    if (to.meta.roles.length > 0 && to.meta.requiresAuth) {
      PermissionGuard;
      JwtStorageService.removeToken();
      next({ path: '/login' });
    }
  } else {
    // Has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next();
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach((to: Route) => {
  // Finish progress bar
  NProgress.done();

  // set page title
  document.title = getPageTitle(to.name);
});
