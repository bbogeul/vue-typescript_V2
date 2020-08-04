import { BaseService } from '@/core';
import { InquiryListDto, InquiryDto, InquiryReplyListDto } from '@/dto';
import { Pagination } from '@/common';

class InquiryService extends BaseService {
  /**
   *
   * @param filter
   * @param pagination
   */
  findAll(filter: InquiryListDto, pagination?: Pagination) {
    return super.paginate<InquiryDto>('admin/inquiry', filter, pagination);
  }

  /**
   *
   * @param inquiryNo
   */
  findOne(inquiryNo) {
    return super.get<InquiryDto>(`admin/inquiry/${inquiryNo}`);
  }

  /**
   *
   * @param inquiryNo
   * @param pagination
   */
  findForReply(
    inquiryNo: string,
    filter: InquiryListDto,
    pagination?: Pagination,
  ) {
    return super.paginate<InquiryDto>(
      `admin/inquiry/${inquiryNo}/reply`,
      filter,
      pagination,
    );
  }

  createReply(inquiryNo: string, inquiryReply: InquiryReplyListDto) {
    return super.post<InquiryReplyListDto>(
      `admin/inquiry/${inquiryNo}/reply`,
      inquiryReply,
    );
  }
}

export default new InquiryService();
