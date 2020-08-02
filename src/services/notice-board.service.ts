import { BaseService } from '@/core';
import { NoticeBoardDto, NoticeBoardListDto } from '@/dto';
import { Pagination } from '@/common';

class NoticeBoardService extends BaseService {
  constructor() {
    super();
  }

  /**
   * create notice board
   * @param noticeBoardCreateDto
   */
  create(noticeBoardCreateDto: NoticeBoardDto) {
    return super.post<NoticeBoardDto>(
      'admin/notice-board',
      noticeBoardCreateDto,
    );
  }

  /**
   * find all
   * @param noticeBoardListDto
   * @param pagination
   */
  findAll(noticeBoardListDto: NoticeBoardListDto, pagination: Pagination) {
    return super.paginate<NoticeBoardDto>(
      'admin/notice-board',
      noticeBoardListDto,
      pagination,
    );
  }
}

export default new NoticeBoardService();
