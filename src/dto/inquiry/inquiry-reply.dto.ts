import { BaseDto } from '@/core';
import { InquiryDto } from '.';
import { YN } from '@/common';

export class InquiryReplyDto extends BaseDto<InquiryDto> {
  companyUserName?: string;
  adminName?: string;
  isInquiryReply: YN;
}
