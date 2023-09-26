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
    acceptedTime: { ideal: Date, actual: Date },
    collectionTime: {
      ideal: { type: Date, required: true },
      actual: Date,
    },
    prepTime: {
      ideal: {
        start: { type: Date, required: true },
        end: { type: Date, required: true },
      },
      actual: { start: Date, end: Date },
    },
    orderStatus: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Pending,
    },
    collectionStatus: {
      type: String,
      enum: Object.values(CollectionStatus),
      default: CollectionStatus.None,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<OrderDocument, OrderModel>(
  'Order',
  orderSchema
);

export default OrderModel;
