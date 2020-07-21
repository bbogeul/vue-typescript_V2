import { BaseDto } from '@/core';
import { CompanyDto } from '../company/company.dto';
import { SpaceDto } from '../space';

export class CompanyDistrictDto extends BaseDto<CompanyDistrictDto> {
  no?: number;
  companyNo?: number;
  nameKr?: string;
  nameEng?: string;
  address?: string;
  company?: CompanyDto;
  spaces?: SpaceDto[];
}
