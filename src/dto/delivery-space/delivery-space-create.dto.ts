import { DeliverySpaceDto } from './delivery-space.dto';

export class DeliverSpaceCreateDto extends DeliverySpaceDto {
  amenityIds?: number[];
}
