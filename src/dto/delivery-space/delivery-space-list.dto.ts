import { DeliverySpaceDto } from './delivery-space.dto';

export class DeliverySpaceListDto extends DeliverySpaceDto {
  companyDistrictName?: string;
  companyName?: string;
  companyNo?: number;
}
