import { BaseDto } from '@/core';
import { APPROVAL_STATUS } from '@/services/shared';

export class CompanyDistrictCreateDto extends BaseDto<
  CompanyDistrictCreateDto
> {
  no?: number;
  companyNo?: number;
  nameKr?: string;
  nameEng?: string;
  address?: string;
  status?: APPROVAL_STATUS;
}
