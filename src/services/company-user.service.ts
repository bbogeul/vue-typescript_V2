import { BaseService } from '@/core';
import { Pagination } from '@/common';
import { CompanyUserDto, CompanyUserListDto } from '@/dto';

class CompanyUserService extends BaseService {
  /**
   *
   * @param filter
   * @param paginate
   */
  findAll(filter: CompanyUserListDto, paginate?: Pagination) {
    return super.paginate<CompanyUserDto>(
      'admin/company-user',
      filter,
      paginate,
    );
  }
}
export default new CompanyUserService();
