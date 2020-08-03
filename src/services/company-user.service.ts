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
   * update company user info
   * @param companyUserNo
   * @param CompanyUserUpdateDto
   */
  update(companyUserNo: string, CompanyUserUpdateDto: CompanyUserUpdateDto) {
    return super.patch(
      `admin/company-user/${companyUserNo}`,
      CompanyUserUpdateDto,
    );
  }

  /**
   * update status
   * @param companyUserNo
   * @param param
   * @param companyUserUpdateRefusalDto
   */
  updateCompanyUserStatus(
    companyUserNo: string,
    param: string,
    companyUserUpdateRefusalDto?: CompanyUserUpdateRefusalDto,
  ) {
    return super.patch(
      `admin/company-user/${companyUserNo}/${param}`,
      companyUserUpdateRefusalDto,
    );
  }

  /**
   * create company user
   * @param companyUser
   */
  createCompanyUser(companyUser: CompanyUserDto) {
    return super.post<CompanyUserDto>('admin/company-user', companyUser);
  }

  deleteCompanyUser(companyUserNo: string) {
    return super.delete<CompanyUserDto>(`admin/company-user/${companyUserNo}`);
  }
}
export default new CompanyUserService();
