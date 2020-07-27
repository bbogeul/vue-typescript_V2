import { BaseService } from '@/core';
import { Pagination } from '@/common';
import { CompanyDto, CompanyListDto, CompanyUpdateDto } from '@/dto';
import { CompanyUpdateRefusalDto } from '@/dto/company/company-update-refusal.dto';

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

  update(companyNo, companyUpdateDto: CompanyUpdateDto) {
    return super.patch(`admin/company/${companyNo}`, companyUpdateDto);
  }

  updateCompanyStatus(
    companyNo,
    param: string,
    companyUpdateRefusalDto?: CompanyUpdateRefusalDto,
  ) {
    return super.patch(
      `admin/company/${companyNo}/${param}`,
      companyUpdateRefusalDto,
    );
  }
}
export default new CompanyUserService();
