import { BaseService } from '@/core';
import { Pagination } from '@/common';
import {
  CompanyUserDto,
  CompanyUserListDto,
  CompanyUserUpdateDto,
  CompanyUserUpdateRefusalDto,
} from '@/dto';

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

  /**
   *
   * @param companyUserNo
   */
  findOne(companyUserNo) {
    return super.get<CompanyUserDto>(`admin/company-user/${companyUserNo}`);
  }

  /**
   *
   * @param companyUserNo
   * @param CompanyUserUpdateDto
   */
  update(companyUserNo, CompanyUserUpdateDto: CompanyUserUpdateDto) {
    return super.patch(
      `admin/company-user/${companyUserNo}`,
      CompanyUserUpdateDto,
    );
  }

  updateCompanyUserStatus(
    companyUserNo,
    param: string,
    companyUserUpdateRefusalDto?: CompanyUserUpdateRefusalDto,
  ) {
    return super.patch(
      `admin/company-user/${companyUserNo}/${param}`,
      companyUserUpdateRefusalDto,
    );
  }
}
export default new CompanyUserService();
