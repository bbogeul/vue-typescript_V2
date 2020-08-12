import {
  FOUNDER_CONSULT,
  B2B_FOUNDER_CONSULT,
  COMPANY_USER,
  NANUDA_USER,
  ADMIN_USER,
} from '@/services/shared';
import { AVAILABLE_TIME, YN } from '@/common';
import { CodeManagementDto } from '@/services/init/dto';
import { DeliverySpaceDto } from '../delivery-space';
import { BaseDto } from '@/core';

export class DeliveryFounderConsultDto extends BaseDto<
  DeliveryFounderConsultDto
> {
  no: number;
  deliverySpaceNo: number;
  nanudaUserNo: number;
  spaceConsultManager?: number;
  status: FOUNDER_CONSULT;
  hopeDate?: Date;
  hopeTime: AVAILABLE_TIME;
  purposeUse: YN;
  changUpExpYn: YN;
  spaceOwnYn: YN;
  spaceConsultEtc?: string;
  confirmDate?: Date;
  viewCount?: YN;
  hopeFoodCategory?: string;
  companyDecisionStatus?: B2B_FOUNDER_CONSULT;
  companyUserNo?: number;
  deliveredAt?: Date;
  openedAt?: Date;
  admin?: ADMIN_USER;
  deliverySpaces?: DeliverySpaceDto[];
  codeManagement?: CodeManagementDto;
  companyDecisionStatusCode?: CodeManagementDto;
  availableTime?: CodeManagementDto;
  nanudaUser?: NANUDA_USER;
  companyUser?: COMPANY_USER;
}
