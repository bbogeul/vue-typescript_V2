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
}
export default new CompanyDistrictService();
