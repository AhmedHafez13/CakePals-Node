import mongoose, { Document, Model, Schema } from 'mongoose';
import { OrderAttributes } from './order.types';
import { OrderStatus } from './order.enums';

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
    rating: Number,
    comment: String,
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    deliveryTime: {
      type: Date,
      required: true,
    },
    deliveryStatus: {
      type: String,
      enum: Object.values(OrderStatus),
      required: true,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<OrderDocument, OrderModel>(
  'Order',
  orderSchema
);

export default OrderModel;
