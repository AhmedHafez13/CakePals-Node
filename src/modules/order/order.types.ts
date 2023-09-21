import { Types } from 'mongoose';
import { OrderStatus } from './order.enums';

export interface OrderAttributes {
  product: Types.ObjectId;
  member: Types.ObjectId;
  baker: Types.ObjectId;
  rating?: number;
  comment?: string;
  startTime: Date;
  endTime: Date;
  deliveryTime: Date;
  deliveryStatus: OrderStatus;
}
