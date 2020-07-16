import { BaseDto } from '@/core';
import { FOUNDER_CONSULT } from '@/services/shared';
import { AVAILABLE_TIME, YN } from '@/common';
import { CodeManagementDto } from '@/services/init/dto';

export class FounderConsultDto extends BaseDto<FounderConsultDto> {
  no: number;
  spaceNo: number;
  nanudaUserNo?: number;
  spaceConsultManager?: number;
  status: FOUNDER_CONSULT;
  hopeTime?: AVAILABLE_TIME;
  purposeUse?: YN;
  changUpExpYn?: YN;
  spaceOwnYn?: YN;
  spaceConsultEtc?: string;
  space?: object;
  codeManagement?: CodeManagementDto;
}
