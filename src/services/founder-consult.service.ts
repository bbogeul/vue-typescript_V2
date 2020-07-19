import { BaseService } from '@/core';
import {
  FounderConsultListDto,
  FounderConsultDto,
} from '@/dto/founder-consult';
import { Pagination } from '@/common';
import { CodeManagementDto } from './init/dto';

class FounderConsultService extends BaseService {
  /**
   * find list for founder consult admin
   * @param filter
   * @param pagination
   */
  findAll(filter: FounderConsultListDto, pagination?: Pagination) {
    return super.paginate<FounderConsultDto>(
      'admin/founder-consult',
      filter,
      pagination,
    );
  }

  /**
   * find one for founder consult admin
   * @param id
   */
  findOne(id) {
    return super.get<FounderConsultDto>(`admin/founder-consult/${id}`);
  }
}

export default new FounderConsultService();
