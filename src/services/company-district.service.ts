import { BaseService } from '@/core';
import { Pagination } from '@/common';
import { CompanyDistrictDto, CompanyDistrictListDto } from '@/dto';

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

  createCompanyDistrict(companyDistrict: CompanyDistrictDto) {
    return super.post<CompanyDistrictDto>(
      'admin/company-district',
      companyDistrict,
    );
  }
}
export default new CompanyDistrictService();
