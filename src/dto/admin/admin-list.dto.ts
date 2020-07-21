import { BaseDto } from '@/core';
import { AdminDto } from './admin.dto';
import { OrderByValue } from '@/common';

export class AdminListDto extends BaseDto<AdminDto> {
  name?: string;
  phone?: string;
  orderByNo?: OrderByValue;
}
