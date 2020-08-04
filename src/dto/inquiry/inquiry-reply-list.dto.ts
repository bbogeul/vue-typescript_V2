import { BaseDto } from '@/core';
import { YN, OrderByValue } from '@/common';
import { InquiryReplyDto } from './inquiry-reply.dto';

export class InquiryReplyListDto extends BaseDto<InquiryReplyListDto>
  implements Partial<InquiryReplyDto> {
  no?: number;
  companyUserName?: string;
  adminName?: string;
  isInquiryReply: YN;
  orderByNo: OrderByValue;
}
