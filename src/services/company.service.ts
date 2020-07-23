import { BaseService } from '@/core';
import { Pagination } from '@/common';
import { CompanyDto, CompanyListDto } from '@/dto';

class CompanyUserService extends BaseService {
  findAll(filter?: CompanyListDto, paginate?: Pagination) {
    return super.paginate<CompanyDto>('admin/company', filter, paginate);
  }
  /**
   *
   * @param companyNo
   */
  findOne(companyNo) {
    return super.get<CompanyDto>(`admin/company/${companyNo}`);
  }

  findForSelect() {
    return super.get<CompanyDto[]>('admin/company/select-option');
  }
}
export default new CompanyUserService();
