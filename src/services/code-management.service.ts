import { BaseService } from '@/core';
import { CodeManagementDto } from './init/dto';

class CodeManagementService extends BaseService {
  findCodesFounderConsult() {
    return super.get<CodeManagementDto[]>(
      'admin/code-management/founder-consult',
    );
  }

  findAvailableTimes() {
    return super.get<CodeManagementDto[]>(
      'admin/code-management/available-times',
    );
  }
}

export default new CodeManagementService();
