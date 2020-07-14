import { BaseDto } from '@/core';

export class Admin extends BaseDto<Admin> {
  no: number;
  name: string;
  phone: string;
  authCode: string;
}
