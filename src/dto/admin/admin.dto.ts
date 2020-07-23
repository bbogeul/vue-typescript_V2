import { BaseUser } from '@/services/shared/auth';

export class AdminDto extends BaseUser {
  no: number;
  name: string;
  phone: string;
}
