import { BaseService } from '@/core';
import { AmenityDto } from '@/dto';

export class AmenityService extends BaseService {
  findCommonAmenities() {
    return super.get<AmenityDto[]>('admin/amenity/common-facility');
  }
  findKitcheAmenities() {
    return super.get<AmenityDto[]>('admin/amenity/kitchen-facility');
  }
}

export default new AmenityService();
