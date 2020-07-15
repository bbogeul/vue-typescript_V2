import { ADMIN_USER } from '@/services/shared';
import * as jwtDecode from 'jwt-decode';
import JwtStorageService from '../../services/shared/auth/jwt-storage.service';

export const PermissionGuard = (roles: ADMIN_USER[] | any): boolean => {
  const token = JwtStorageService.getToken();
  if (!token) {
    return false;
  }
  const payload = jwtDecode(token);
  const authCode = payload.adminRole;
  const newArray = [];
  const splittedArray = authCode.split(',');
  splittedArray.map(role => {
    newArray.push(role);
  });
  //   maybe change the name to hasRoles to sync with server??
  const hasPermission = () => roles.some(role => newArray.includes(role));
  if (!hasPermission) {
    return false;
  }
  return true;
};
