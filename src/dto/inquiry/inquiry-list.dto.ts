import { BaseDto } from '@/core';
import { INQUIRY, OrderByValue, YN } from '@/common';

export class InquiryListDto extends BaseDto<InquiryListDto> {
  title?: string;
  companyUserName?: string;
  companyName?: string;
  inquiryType?: INQUIRY;
  isClosed?: YN;
  orderByNo?: OrderByValue;
}
