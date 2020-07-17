import { BaseService } from '@/core';
import { Pagination } from '@/common';
import { CompanyDto, CompanyListDto } from '@/dto';

class CompanyUserService extends BaseService {
  getAll(filter: CompanyListDto, paginate?: Pagination) {
    return super.paginate<CompanyDto>('admin/company', filter, paginate);
  }
}
export default new CompanyUserService();
