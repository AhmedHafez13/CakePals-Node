import { Response } from 'express';
import { Nullable } from '../../types/generic.type';
import { AppRequest } from '../../types/general.types';
import { ProductDocument } from '../product/product.model';
import { ProfileDocument } from '../profile/profile.model';
import { OrderDocument } from './order.model';
import { UserRole } from '../profile/profile.enums';
import productProvider from '../product/product.provider';
import OrderProvider from './order.provider';
import OrderValidation from './order.validation';

class OrderController {
  async placeOrder(req: AppRequest, res: Response) {
    const profiles = req.profiles as ProfileDocument[];
    const memberProfile = profiles.find(
      (profile) => profile.role === UserRole.Member
    ) as ProfileDocument;

    const result = OrderValidation.validateOrderInput({
      product: req.body.product,
      paymentMethod: req.body.paymentMethod,
      collectionTime: req.body.collectionTime,
    });

    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }

    const data = result.value;
    const product: Nullable<ProductDocument> =
      await productProvider.findProductById(data.product);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const order = await OrderProvider.createOrder({
      product: product.id,
      member: memberProfile.id,
      paymentMethod: data.paymentMethod,
      collectionTime: data.collectionTime,
    });

    return res
      .status(201)
      .json({ message: 'Order placed successfully', order });
  }

  async editOrder(req: AppRequest, res: Response) {
    const result = OrderValidation.validateOrderEdit({
      orderId: req.params.orderId,
      paymentMethod: req.body.paymentMethod,
      collectionTime: req.body.collectionTime,
    });

    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }

    const data = result.value;
    const order: Nullable<OrderDocument> = await OrderProvider.findOrderById(
      data.orderId
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const updatedOrder = await OrderProvider.updateOrder(data.orderId, {
      paymentMethod: data.paymentMethod,
      collectionTime: data.collectionTime,
    });

    return res
      .status(200)
      .json({ message: 'Order updated successfully', order: updatedOrder });
  }
}

export default new OrderController();
