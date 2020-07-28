import { BaseService } from '@/core';

class DashboardService extends BaseService {
  constructor() {
    super();
  }

  dashboardGraph() {
    return super.get<any>('admin/dashboard/founder-consult');
  }
}

export default new DashboardService();
