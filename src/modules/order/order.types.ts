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
  acceptedTime?: Date;
  collectionTime: { ideal: Date; actual?: Date };
  prepTime: {
    ideal: { start: Date; end: Date };
    actual?: { start: Date; end: Date };
  };
  orderStatus: OrderStatus;
  collectionStatus: CollectionStatus;
}

export interface PlaceOrderData {
  product: string;
  paymentMethod: PaymentMethods;
  collectionTime: string;
}

export interface EditOrderData {
  orderId: string;
  paymentMethod: PaymentMethods;
  collectionTime: string;
}
