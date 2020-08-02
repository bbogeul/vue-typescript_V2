import { BaseDto } from '@/core';
import { NOTICE_BOARD } from '@/services/shared';

export class NoticeBoardDto extends BaseDto<NoticeBoardDto> {
  no?: number;
  title: string;
  content: string;
  started?: Date;
  ended?: Date;
  url?: string;
  noticeBoardType?: NOTICE_BOARD;
}
