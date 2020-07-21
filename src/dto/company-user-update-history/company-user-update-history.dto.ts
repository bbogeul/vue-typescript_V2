import { BaseDto } from '@/core';
import { CompanyUserDto } from '../company-user/company-user.dto';
import { COMPANY_USER, APPROVAL_STATUS } from '@/services/shared';
import { CompanyUserUpdateRefusalReasonDto } from './company-user-update-refusal.dto';

export class CompanyUserUpdateHistoryDto
  extends BaseDto<CompanyUserUpdateHistoryDto>
  implements Partial<CompanyUserDto> {
  no?: number;
  phone?: string;
  name?: string;
  email?: string;
  companyUserNo?: number;
  companyNo?: number;
  companyUserStatus?: APPROVAL_STATUS;
  authCode?: COMPANY_USER;
  companyAdminRole?: COMPANY_USER;
  refusalReasons?: CompanyUserUpdateRefusalReasonDto;
  refusalDesc?: string;
  companyUser?: CompanyUserDto;
}
