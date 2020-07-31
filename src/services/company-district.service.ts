import { BaseService } from '@/core';
import { Pagination } from '@/common';
import {
  CompanyDistrictDto,
  CompanyDistrictListDto,
  CompanyDistrictUpdateRefusalDto,
} from '@/dto';

class CompanyDistrictService extends BaseService {
  /**
   *
   * @param filter
   * @param paginate
  
   */
  findAll(filter: CompanyDistrictListDto, paginate?: Pagination) {
    return super.paginate<CompanyDistrictDto>(
      `admin/company-district`,
      filter,
      paginate,
    );
  }

  /**
   *
   * @param companyNo
   */
  findOne(companyDistrictNo) {
    return super.get<CompanyDistrictDto>(
      `admin/company-district/${companyDistrictNo}`,
    );
  }

  /**
   *
   * @param companyDistrictNo
   * @param param
   * @param companyDistrictUpdateRefusalDto
   */
  updateCompanyDistrictStatus(
    companyDistrictNo,
    param: string,
    companyDistrictUpdateRefusalDto?: CompanyDistrictUpdateRefusalDto,
  ) {
    return super.patch<CompanyDistrictDto>(
      `admin/company-district/${companyDistrictNo}/${param}`,
      companyDistrictUpdateRefusalDto,
    );
  }

  /**
   *
   * @param companyDistrict
   */
  createCompanyDistrict(companyDistrict: CompanyDistrictDto) {
    return super.post<CompanyDistrictDto>(
      'admin/company-district',
      companyDistrict,
    );
  }
}
export default new CompanyDistrictService();
