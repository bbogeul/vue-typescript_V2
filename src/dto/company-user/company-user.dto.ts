import { BaseUser } from '@/services/shared/auth';
import { COMPANY_USER } from '@/services/shared';
import { YN } from '@/common';
import { CodeManagementDto } from '@/services/init/dto';
import { CompanyDto } from '../company/company.dto';
import { CompanyUserUpdateHistoryDto } from '../company-user-update-history';
export class CompanyUserDto extends BaseUser {
  passwordChangedYn?: YN;
  companyAdminRole?: COMPANY_USER;
  codeManagement?: CodeManagementDto;
  company?: CompanyDto;
  companyUserUpdateHistories?: CompanyUserUpdateHistoryDto[];
}
