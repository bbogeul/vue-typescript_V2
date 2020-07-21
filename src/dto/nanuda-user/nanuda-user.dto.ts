import { BaseDto } from '@/core';
import { BaseUser } from '@/services/shared/auth';
import { YN } from '@/common';

export class NanudaUserDto extends BaseUser {
  lastLoginAt?: Date;
  marketYn?: YN;
  infoYn?: YN;
  serviceYn?: YN;
}
