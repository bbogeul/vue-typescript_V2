import { BaseService } from '@/core';
import { AmenityDto } from '@/dto';

export class AmenityService extends BaseService {
  findAmenities(param: string) {
    return super.get<AmenityDto[]>(`admin/amenity/${param}`);
  }
}

export default new AmenityService();
