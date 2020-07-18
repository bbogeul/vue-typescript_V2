import { BaseService } from '@/core';
import { AdminDto } from '@/dto';

class AdminService extends BaseService {
  findMe() {
    return super.get<AdminDto>('admin/find-me');
  }
}

export default new AdminService();
