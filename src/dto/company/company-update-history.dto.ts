import { BaseDto } from '@/core';
import { APPROVAL_STATUS } from '@/services/shared';
import { CompanyUpdateRefusalReason } from './company-update-refusal-reason.type';

export class CompanyUpdateHistoryDto extends BaseDto<CompanyUpdateHistoryDto> {
  no: number;
  companyNo: number;
  address: string;
  email?: string;
  population?: string;
  fax?: string;
  phone?: string;
  nameKr: string;
  nameEng?: string;
  ceoKr?: string;
  ceoEng?: string;
  businessNo?: string;
  website?: string;
  companyStatus: APPROVAL_STATUS;
  refusalReasons?: CompanyUpdateRefusalReason;
  refusalDesc?: string;
}
