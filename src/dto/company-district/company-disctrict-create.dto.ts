import { BaseDto } from "@/core";
import { APPROVAL_STATUS } from "@/services/shared";

export class CompanyDistrictCreateDto extends BaseDto<
  CompanyDistrictCreateDto
> {
  companyNo?: number;
  nameKr?: string;
  nameEng?: string;
  address?: string;
}
