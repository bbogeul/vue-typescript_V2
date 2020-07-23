import { BaseUser } from '@/services/shared/auth';
import { BaseDto } from '@/core';
import { APPROVAL_STATUS, COMPANY_USER } from '@/services/shared';
import { CompanyUserDto } from './company-user.dto';
import { OrderByValue } from '@/common';

export class CompanyUserListDto extends BaseDto<CompanyUserListDto>
  implements Partial<CompanyUserDto> {
  constructor(partial?: any) {
    super(partial);
  }
  no: number;
  companyNo: number;
  name?: string;
  email?: string;
  phone?: string;
  companyUserStatus?: APPROVAL_STATUS;
  companyAdminRole?: COMPANY_USER;
  orderByNo?: OrderByValue;
}
