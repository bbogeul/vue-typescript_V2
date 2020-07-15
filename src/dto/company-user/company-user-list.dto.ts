import { BaseUser } from '@/services/shared/auth';
import { BaseDto, OrderByValue } from '@/core';
import { APPROVAL_STATUS, COMPANY_USER } from '@/services/shared';
import { CompanyUserDto } from './company-user.dto';

export class CompanyUserListDto extends BaseDto<CompanyUserListDto>
  implements Partial<CompanyUserDto> {
  constructor(partial?: any) {
    super(partial);
  }

  name?: string;
  email?: string;
  phone?: string;
  companyUserStatus?: APPROVAL_STATUS;
  companyAdminRole?: COMPANY_USER;
  orderByNo?: OrderByValue;
}
