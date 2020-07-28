import { BaseDto } from "@/core";
import { APPROVAL_STATUS } from "@/services/shared";

export class CompanyDistrictDto extends BaseDto<CompanyDistrictDto> {
  no?: number;
  companyNo?: number;
  nameKr?: string;
  nameEng?: string;
  address?: string;
  companyDistrictStatus?: APPROVAL_STATUS;
}
