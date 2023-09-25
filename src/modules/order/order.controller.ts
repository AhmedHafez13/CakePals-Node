import { Response } from 'express';
import { AppRequest } from '../../types/general.types';
import { ProductDocument } from '../product/product.model';
import productProvider from '../product/product.provider';
import { UserRole } from '../profile/profile.enums';
import { ProfileDocument } from '../profile/profile.model';
import OrderProvider from './order.provider';
import OrderValidation from './order.validation';

class OrderController {
  async placeOrder(req: AppRequest, res: Response) {
    const profiles = req.profiles as ProfileDocument[];
    const memberProfile = profiles.find(
      (profile) => profile.role === UserRole.Member
    ) as ProfileDocument;

    // Validate { product, paymentMethod, collectionTime }
    const { error, value } = OrderValidation.validateOrderInput(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const product: ProductDocument | null =
      await productProvider.findProductById(value.product);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const order = await OrderProvider.createOrder({
      product: product.id,
      member: memberProfile.id,
      paymentMethod: value.paymentMethod,
      collectionTime: value.collectionTime,
    });

    return res
      .status(201)
      .json({ message: 'Order placed successfully', order });
  }
}

export default new OrderController();
