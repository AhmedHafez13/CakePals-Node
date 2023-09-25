import { Types } from 'mongoose';
import { PaymentMethods } from './order.enums';
import OrderModel, { OrderDocument } from './order.model';

class OrderProvider {
  async createOrder(data: {
    product: Types.ObjectId | string;
    member: Types.ObjectId | string;
    paymentMethod: PaymentMethods;
    collectionTime: Date | string;
  }): Promise<OrderDocument> {
    return OrderModel.create(data);
  }

  async updateOrder(
    orderId: Types.ObjectId | string,
    data: {
      paymentMethod: PaymentMethods;
      collectionTime: Date | string;
    }
  ): Promise<OrderDocument | null> {
    return OrderModel.findByIdAndUpdate(orderId, data, { new: true });
  }

  async findOrderById(
    orderId: Types.ObjectId | string
  ): Promise<OrderDocument | null> {
    return OrderModel.findById(orderId);
  }
}

export default new OrderProvider();
