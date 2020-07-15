import { BaseUser } from '@/services/shared/auth';
import { COMPANY_USER } from '@/services/shared';
import { YN } from '@/common';

export class CompanyUserDto extends BaseUser {
  passwordChangedYn?: YN;
  companyAdminRole?: COMPANY_USER;
}
