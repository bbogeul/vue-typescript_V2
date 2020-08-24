import { BrandDto } from './brand.dto';
import { YN, OrderByValue } from '@/common';

export class BrandListDto extends BrandDto {
  delYn?: YN;
  orderByNo?: OrderByValue;
  categoryName?: string;
  adminName?: string;
}
