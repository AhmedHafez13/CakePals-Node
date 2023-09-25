import { Types } from 'mongoose';
import { CollectionStatus, OrderStatus, PaymentMethods } from './order.enums';

export interface OrderAttributes {
  product: Types.ObjectId;
  member: Types.ObjectId;
  paymentMethod: PaymentMethods;
  feedback?: {
    rating: number;
    comment?: string;
  };
  collectionTime: Date;
  actualCollectionTime?: Date;
  acceptedTime?: Date;
  preparationTime?: {
    start?: Date;
    end?: Date;
  };
  orderStatus: OrderStatus;
  deliveryStatus: CollectionStatus;
}
