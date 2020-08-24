import { BaseService } from '@/core';
import { BrandListDto } from '@/dto/brand/brand-list.dto';
import { Pagination } from '@/common';
import { BrandDto } from '@/dto';

class BrandService extends BaseService {
  constructor() {
    super();
  }

  findAll(adminListDto: BrandListDto, pagination: Pagination) {
    return super.paginate<BrandDto>('admin/brand', adminListDto, pagination);
  }

  findOne(brandNo) {
    return super.get<BrandDto>(`admin/brand/${brandNo}`);
  }
}

export default new BrandService();
