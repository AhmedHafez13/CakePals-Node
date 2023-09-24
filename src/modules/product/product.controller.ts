import { Response } from 'express';
import ProductProvider from './product.provider';
import productValidation from './product.validation';
import { UserDocument } from '../user/user.model';
import { AppRequest } from '../../types/general.types';

class ProductController {
  async createProduct(req: AppRequest, res: Response) {
    const user = req.userData as UserDocument;

    // Validate the incoming data
    const { error, value } = productValidation.validateProductInput(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Convert price to cents/pennies (subunits)
    value.price = value.price * 100;

    const product = await ProductProvider.createProduct({
      baker: user.id,
      ...value,
    });

    return res.json({ product });
  }
}

export default new ProductController();
