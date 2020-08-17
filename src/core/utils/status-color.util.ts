import { APPROVAL_STATUS } from '@/services/shared';

export const getStatusColor = (status: string): string => {
  if (status === APPROVAL_STATUS.APPROVAL) {
    return 'success';
  }
  if (status === APPROVAL_STATUS.REFUSED) {
    return 'danger';
  }
  return 'warning';
};
