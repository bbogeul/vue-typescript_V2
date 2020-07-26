import { BaseDto } from '@/core';
import { APPROVAL_STATUS } from '@/services/shared';
import { CompanyDto } from '.';

export class CompanyUpdateDto extends BaseDto<CompanyUpdateDto>
  implements Partial<CompanyDto> {
  companyStatus?: APPROVAL_STATUS;
  managerNo?: number;
}
