import { UPLOAD_TYPE } from '@/config';

export class FileAttachmentDto {
  uploadType?: UPLOAD_TYPE;
  originFilename?: string;
  source?: string;
  key: string;
  endpoint?: string;
  mimetype?: string;
}
