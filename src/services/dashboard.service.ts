import { BaseService } from '@/core';

class DashboardService extends BaseService {
  constructor() {
    super();
  }

  dashboardGraph() {
    return super.get<any>('admin/dashboard/founder-consult');
  }

  dashboardGraphByCity() {
    return super.get<any>('admin/dashboard/founder-consult/city');
  }
}

export default new DashboardService();
