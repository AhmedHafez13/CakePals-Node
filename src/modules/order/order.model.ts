import mongoose, { Document, Model, Schema } from 'mongoose';
import { OrderAttributes } from './order.types';
import { CollectionStatus, OrderStatus, PaymentMethods } from './order.enums';

export interface OrderDocument extends Document, OrderAttributes {}

interface OrderModel extends Model<OrderDocument> {}

const orderSchema: Schema<OrderDocument, OrderModel> = new mongoose.Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    member: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethods),
      required: true,
    },
    feedback: {
      rating: Number,
      comment: String,
    },
    collectionTime: {
      type: Date,
      required: true,
    },
    actualCollectionTime: Date,
    acceptedTime: Date,
    preparationTime: {
      start: Date,
      end: Date,
    },
    orderStatus: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Pending,
    },
    deliveryStatus: {
      type: String,
      enum: Object.values(CollectionStatus),
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<OrderDocument, OrderModel>(
  'Order',
  orderSchema
);

export default OrderModel;
