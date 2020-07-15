import { BaseDto } from '@/core';
import { APPROVAL_STATUS } from '@/services/shared';

export class CompanyDto extends BaseDto<CompanyDto> {
  no: number;
  nameKr: string;
  nameEng?: string;
  ceoKr?: string;
  ceoEng?: string;
  population?: string;
  address: string;
  website?: string;
  email?: string;
  fax?: string;
  phone: string;
  companyStatus: APPROVAL_STATUS;
}
