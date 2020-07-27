import { BaseDto } from '@/core';
import { CompanyUpdateRefusalReason } from './company-update-refusal-reason.type';

export class CompanyUpdateRefusalReasonDto
  extends BaseDto<CompanyUpdateRefusalReasonDto>
  implements CompanyUpdateRefusalReason {
  email?: boolean;
  nameKr?: boolean;
  nameEng?: boolean;
  ceoKr?: boolean;
  ceoEng?: boolean;
  address?: boolean;
  website?: boolean;
  fax?: boolean;
  phone?: boolean;
  population?: boolean;
  businessNo?: boolean;
}
