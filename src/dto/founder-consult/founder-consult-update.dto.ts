import { BaseDto } from '@/core';
import { FounderConsultDto } from './founder-consult.dto';
import { YN } from '@/common';
import { FOUNDER_CONSULT } from '@/services/shared';

export class FounderConsultUpdateDto extends BaseDto<FounderConsultUpdateDto>
  implements Partial<FounderConsultDto> {
  spaceConsultManager?: number;
  purposeYn?: YN;
  changUpExpYn?: YN;
  status?: FOUNDER_CONSULT;
  spaceOwnYn?: YN;
  confirmDate?: Date;
  hopeDate?: Date;
}
