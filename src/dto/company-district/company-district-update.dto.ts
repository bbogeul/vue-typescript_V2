import { BaseDto } from '@/core';
import { APPROVAL_STATUS } from '@/services/shared';
import { AmenityDto } from '../amenity/amenity.dto';
import { CompanyDistrictDto } from './company-district.dto';

export class CompanyDistrictUpdateDto extends BaseDto<CompanyDistrictUpdateDto>
  implements Partial<CompanyDistrictDto> {
  no?: number;
  companyDistrictStatus?: APPROVAL_STATUS;
  companyNo?: number;
  nameKr?: string;
  nameEng?: string;
  address?: string;
  amenities?: AmenityDto[];
  amenityIds?: number[];
  lat?: string;
  lon?: string;
}
