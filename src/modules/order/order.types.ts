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
