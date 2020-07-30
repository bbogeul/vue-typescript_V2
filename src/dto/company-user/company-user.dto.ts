import { BaseUser } from '@/services/shared/auth';
import { APPROVAL_STATUS, ADMIN_USER, COMPANY_USER } from '@/services/shared';
export class CompanyUserDto extends BaseUser {
  name: string;
  email: string;
  phone: string;
  companyAdminRole: COMPANY_USER;
  companyUserStatus: APPROVAL_STATUS;
}
