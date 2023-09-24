import { Response } from 'express';
import { AppRequest } from '../../types/general.types';
import { UserRole } from '../profile/profile.enums';
import { ProfileDocument } from '../profile/profile.model';
import { ProductDocument } from './product.model';
import ProductProvider from './product.provider';
import ProductValidation from './product.validation';

class ProductController {
  async createProduct(req: AppRequest, res: Response) {
    const profiles = req.profiles as ProfileDocument[];
    const bakerProfile = profiles.find(
      (profile) => profile.role === UserRole.Baker
    ) as ProfileDocument;

    // Validate the incoming data
    const { error, value } = ProductValidation.validateProductInput(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Convert price to cents/pennies (subunits)
    value.price = value.price * 100;

    const product = await ProductProvider.createProduct({
      baker: bakerProfile.id,
      ...value,
    });

    return res.json({ product });
  }

  async listProducts(_req: AppRequest, res: Response) {
    const products: ProductDocument[] = await ProductProvider.listProducts();

    return res.json({ products });
  }
}

export default new ProductController();
