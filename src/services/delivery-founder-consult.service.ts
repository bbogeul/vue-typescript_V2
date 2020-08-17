import { BaseService } from '@/core';
import {
  DeliveryFounderConsultListDto,
  DeliveryFounderConsultDto,
} from '@/dto';
import { Pagination } from '@/common';

class DeliveryFounderConsultService extends BaseService {
  /**
   * find list for founder consult admin
   * @param filter
   * @param pagination
   */
  findAll(filter: DeliveryFounderConsultListDto, pagination?: Pagination) {
    return super.paginate<DeliveryFounderConsultDto>(
      'admin/delivery-founder-consult',
      filter,
      pagination,
    );
  }

  /**
   * find one for founer consult admin
   * @param founderConsultNo
   */
  findOne(deliveryFounderConsultNo) {
    return super.get<DeliveryFounderConsultDto>(
      `admin/delivery-founder-consult/${deliveryFounderConsultNo}`,
    );
  }

  /**
   *
   * @param deliveryFounderConsult
   */
  create(deliveryFounderConsult: DeliveryFounderConsultDto) {
    return super.post<DeliveryFounderConsultDto>(
      'admin/delivery-founder-consult',
      deliveryFounderConsult,
    );
  }
}

export default new DeliveryFounderConsultService();
