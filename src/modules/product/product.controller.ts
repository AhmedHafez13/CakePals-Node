import { Response } from 'express';
import ProductProvider from './product.provider';
import productValidation from './product.validation';
import { AppRequest } from '../../types/general.types';
import { ProfileDocument } from '../profile/profile.model';
import { UserRole } from '../profile/profile.enums';

class ProductController {
  async createProduct(req: AppRequest, res: Response) {
    const profiles = req.profiles as ProfileDocument[];
    const bakerProfile = profiles.find(
      (profile) => profile.role === UserRole.Baker
    ) as ProfileDocument;

    // Validate the incoming data
    const { error, value } = productValidation.validateProductInput(req.body);

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
}

export default new ProductController();
