import { BaseDto } from '@/core';
import { CompanyDistrictDto } from './company-district.dto';
import { OrderByValue } from '@/common';

export class CompanyDistrictListDto extends BaseDto<CompanyDistrictListDto>
  implements Partial<CompanyDistrictDto> {
  companyNo?: number;
  nameKr?: string;
  nameEng?: string;
  address?: string;
  orderByNo?: OrderByValue;
}
