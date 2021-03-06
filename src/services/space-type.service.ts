import { BaseService } from '@/core';
import { SpaceTypeDto } from '@/dto';

class SpaceTypeService extends BaseService {
  getAll() {
    return super.get<SpaceTypeDto[]>('admin/space-type');
  }
}

export default new SpaceTypeService();
