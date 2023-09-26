import { Types } from 'mongoose';
import { PaymentMethods } from './order.enums';
import OrderModel, { OrderDocument } from './order.model';
import { CollectionStatus, OrderStatus } from './order.enums';
import { DateRange } from '../../types/general.types';

class OrderProvider {
  /**
   * Creates a new order.
   * @param data - The order details including product, member, payment method, collection time, and preparation time.
   * @returns The created order document.
   */
  async createOrder(data: {
    product: Types.ObjectId | string;
    member: Types.ObjectId | string;
    paymentMethod: PaymentMethods;
    collectionTime: { ideal: Date | string };
    prepTime: { ideal: DateRange };
  }): Promise<OrderDocument> {
    return OrderModel.create({
      ...data,
      orderStatus: OrderStatus.Pending,
      collectionStatus: CollectionStatus.None,
    });
  }

  /**
   * Updates an existing order.
   * @param orderId - The ID of the order to be updated.
   * @param data - The updated order details including payment method and collection time.
   * @returns The updated order document, or null if the order was not found.
   */
  async updateOrder(
    orderId: Types.ObjectId | string,
    data: {
      paymentMethod: PaymentMethods;
      collectionTime: Date | string;
    }
  ): Promise<OrderDocument | null> {
    return OrderModel.findByIdAndUpdate(orderId, data, { new: true });
  }

  /**
   * Finds an order by its ID.
   * @param orderId - The ID of the order to be found.
   * @returns The found order document, or null if the order was not found.
   */
  async findOrderById(
    orderId: Types.ObjectId | string
  ): Promise<OrderDocument | null> {
    return OrderModel.findById(orderId);
  }

  /**
   * Checks if the order time range intersects with the time ranges of existing orders for the same product.
   * @param productId - The ID of the product being ordered.
   * @param orderTimeRange - The coming order time range.
   * @returns True if there is an intersection, false otherwise.
   */
  async hasOrderTimeOverlap(
    productId: Types.ObjectId,
    orderTimeRange: DateRange
  ): Promise<boolean> {
    const overlappingOrders = await OrderModel.find({
      product: productId,
      'prepTime.ideal.start': { $lt: orderTimeRange.end },
      'prepTime.ideal.end': { $gt: orderTimeRange.start },
    });

    return overlappingOrders.length > 0;
  }
}

export default new OrderProvider();
