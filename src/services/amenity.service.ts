import { BaseService } from '@/core';
import { AmenityDto, AmenityListDto } from '@/dto';
import { Pagination } from '@/common';

class AmenityService extends BaseService {
  /**
   *
   * @param amenityType
   */
  findAmenities(amenityType: string) {
    return super.get<AmenityDto[]>(`admin/amenity/${amenityType}`);
  }

  /**
   *
   * @param amenity
   */
  create(amenity: AmenityDto) {
    return super.post<AmenityDto>(`admin/amenity`, amenity);
  }
}

export default new AmenityService();
