import OrderModel, { OrderDocument } from './order.model';

class OrderProvider {
  async createOrder(data: any): Promise<OrderDocument> {
    const order = new OrderModel(data);
    await order.save();
    return order;
  }

  async findProductById(orderId: string): Promise<OrderDocument | null> {
    return OrderModel.findById(orderId);
  }
}

export default new OrderProvider();
