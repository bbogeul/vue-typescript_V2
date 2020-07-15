import { BaseService } from '@/core';
import {
  FounderConsultListDto,
  FounderConsultDto,
} from '@/dto/founder-consult';
import { Pagination } from '@/common';

class FounderConsultService extends BaseService {
  /**
   * find list for founder consult admin
   * @param filter
   * @param pagination
   */
  findAll(filter: FounderConsultListDto, pagination: Pagination) {
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
  findOne(id: number) {
    return super.get<FounderConsultDto>(`/admin/founder/${id}`);
  }
}

export default new FounderConsultService();
