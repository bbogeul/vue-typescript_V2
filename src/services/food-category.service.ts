import { BaseService } from '@/core';
import { Pagination } from '@/common';
import { FoodCategoryDto, FoodCategoryListDto } from '@/dto/food-category';

class FoodCategoryService extends BaseService {
  /**
   *
   * @param filter
   * @param pagination
   */
  findAll(filter: FoodCategoryListDto, pagination?: Pagination) {
    return super.paginate<FoodCategoryDto>(
      'admin/food-category',
      filter,
      pagination,
    );
  }
}

export default new FoodCategoryService();
