import { BaseService } from '@/core';
import { DeliverySpaceDto, DeliverySpaceListDto } from '@/dto';
import { Pagination } from '@/common';

class DeliverSpaceService extends BaseService {
  /**
   *
   * @param filter
   * @param pagination
   */
  findAll(filter: DeliverySpaceListDto, pagination?: Pagination) {
    return super.paginate<DeliverySpaceDto>(
      'admin/delivery-space',
      filter,
      pagination,
    );
  }
  /**
   *
   * @param spaceNo
   */
  findOne(spaceNo) {
    return super.get<DeliverySpaceDto>(`admin/delivery-space/${spaceNo}`);
  }

  /**
   *
   * @param deliverySpace
   */
  create(deliverySpace: DeliverySpaceDto) {
    return super.post<DeliverySpaceDto>('admin/delivery-space', deliverySpace);
  }
}

export default new DeliverSpaceService();
