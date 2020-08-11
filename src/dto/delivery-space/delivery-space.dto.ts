import { BaseDto } from '@/core';
import { FileAttachmentDto } from '../file-upload';
import { YN } from '@/common';
import { CompanyDistrictDto } from '../company-district';
import { AmenityDto } from '../amenity';

export class DeliverySpaceDto extends BaseDto<DeliverySpaceDto> {
  no?: number;
  typeName?: string;
  buildingName?: string;
  companyDistrictNo?: number;
  size?: number;
  images?: FileAttachmentDto[];
  deposit?: string;
  monthlyRentFee?: string;
  quantity?: number;
  showYn?: YN;
  delYn?: YN;
  monthlyUtilityFee?: string;
  companyDistrict?: CompanyDistrictDto;
  remainingCount?: number;
  amenities?: AmenityDto[];
  deliverySpaceOptions?: DeliverySpaceDto[];
}
