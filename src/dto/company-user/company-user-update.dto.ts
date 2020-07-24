import { COMPANY_USER, APPROVAL_STATUS } from '@/services/shared';
import { YN } from '@/common';
import { CodeManagementDto } from '@/services/init/dto';
import { CompanyDto } from '../company/company.dto';
import { CompanyUserUpdateHistoryDto } from '../company-user-update-history';
import { CompanyUserDto } from './company-user.dto';
import { BaseDto } from '@/core';
export class CompanyUserUpdateDto extends BaseDto<CompanyUserUpdateDto>
  implements Partial<CompanyUserDto> {
  no: number;
  name: string;
  email: string;
  phone: string;
  companyNo: number;
  companyUserStatus: APPROVAL_STATUS;
  passwordChangedYn?: YN;
  companyAdminRole?: COMPANY_USER;
  codeManagement?: CodeManagementDto;
  company?: CompanyDto;
  companyUserUpdateHistories?: CompanyUserUpdateHistoryDto[];
}
