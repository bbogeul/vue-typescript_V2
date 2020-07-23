import { BaseDto } from '@/core';
import { APPROVAL_STATUS } from '@/services/shared';
import { CodeManagementDto } from '@/services/init/dto';
import { CompanyUserDto } from '../company-user';
import { CompanyDistrictDto } from '../company-district';

export class CompanyCreateDto extends BaseDto<CompanyCreateDto> {
  no: number;
  adminNo?: number;
  nameKr: string;
  nameEng?: string;
  ceoKr?: string;
  ceoEng?: string;
  population?: string;
  address: string;
  website?: string;
  email?: string;
  fax?: string;
  phone: string;
  companyStatus: APPROVAL_STATUS;
  companyUsers?: CompanyUserDto[];
  codeManagement?: CodeManagementDto[];
  companyDistricts?: CompanyDistrictDto[];
}
