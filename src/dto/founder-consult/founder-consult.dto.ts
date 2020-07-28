import { BaseDto } from '@/core';
import { FOUNDER_CONSULT } from '@/services/shared';
import { AVAILABLE_TIME, YN } from '@/common';
import { CodeManagementDto } from '@/services/init/dto';
import { AdminDto } from '../admin';
import { SpaceDto } from '../space';
import { NanudaUserDto } from '../nanuda-user';

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
  space?: SpaceDto;
  codeManagement?: CodeManagementDto;
  nanudaUser?: NanudaUserDto;
  admin?: AdminDto;
  confirmDate?: Date;
  hopeDate?: Date;
  hopeFoodCategory?: string;
}
