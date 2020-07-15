import { BaseUser } from '@/services/shared/auth';
import { YN } from '@/core/interfaces/del-yn.type';
import { COMPANY_USER } from '@/services/shared';

export class CompanyUserDto extends BaseUser {
  passwordChangedYn?: YN;
  companyAdminRole?: COMPANY_USER;
}
