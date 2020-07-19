import { BaseDto } from '@/core';
import { FounderConsultDto } from '.';
import { FOUNDER_CONSULT } from '@/services/shared';
import { AVAILABLE_TIME, YN, OrderByValue } from '@/common';

export class FounderConsultListDto extends BaseDto<FounderConsultListDto>
  implements Partial<FounderConsultDto> {
  spaceNo?: number;
  phone?: string;
  status?: FOUNDER_CONSULT;
  hopeTime?: AVAILABLE_TIME;
  purposeUse?: YN;
  changUpExpYn?: YN;
  spaceOwnYn?: YN;
  companyNo?: number;
  companyDistrictNameKr?: string;
  companyDistrictNameEng?: string;
  spaceTypeNo?: number;
  nanudaUserName?: string;
  adminUserName?: string;
  address?: string;
  orderByNo?: OrderByValue;
}
