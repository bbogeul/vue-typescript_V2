import { BaseService, Pagination } from '@/core';
import { CompanyUserDto, CompanyUserListDto } from '@/dto';

class CompanyUserService extends BaseService {
  getAll(filter: CompanyUserListDto, paginate?: Pagination) {
    return super.paginate<CompanyUserDto>(
      'admin/company-user',
      filter,
      paginate,
    );
  }
}
export default new CompanyUserService();
