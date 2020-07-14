import { BaseUser } from '@/services/shared/auth';
import { BaseDto, OrderByValue } from '@/core';
import { APPROVAL_STATUS } from '@/services/shared';

export class CompanyUserListDto extends BaseDto<CompanyUserListDto> {
  constructor(partial?: any) {
    super(partial);
  }

  name?: string;
  email?: string;
  phone?: string;
  companyUserStatus?: APPROVAL_STATUS;
  orderByNo?: OrderByValue;
}
