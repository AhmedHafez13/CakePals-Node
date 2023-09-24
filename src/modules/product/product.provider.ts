import ProductModel, { ProductDocument } from './product.model';
import { ProductAttributes } from './product.types';
import ProductTypeModel from '../product-type/product-type.model';
import UserModel from '../user/user.model';
import ProfileModel from '../profile/profile.model';
import LocationModel from '../location/location.model';

class ProductProvider {
  async createProduct(data: ProductAttributes): Promise<ProductDocument> {
    return ProductModel.create(data);
  }

  async findProductById(productId: string): Promise<ProductDocument | null> {
    return ProductModel.findById(productId);
  }

  async listProducts(): Promise<ProductDocument[]> {
    const products = await ProductModel.find()
      .populate({
        path: 'baker',
        select: 'user',
        model: ProfileModel,
        populate: {
          path: 'user',
          select: 'username location',
          model: UserModel,
          populate: {
            path: 'location',
            model: LocationModel,
          },
        },
      })
      .populate({
        path: 'productType',
        select: 'type name',
        model: ProductTypeModel,
      });

    return products;
  }

  async updateProduct(
    productId: string,
    data: { name?: string; price?: number }
  ): Promise<ProductDocument | null> {
    const product = await ProductModel.findByIdAndUpdate(productId, data, {
      new: true,
    });
    return product;
  }

  async deleteProduct(productId: string): Promise<ProductDocument | null> {
    return ProductModel.findByIdAndDelete(productId);
  }
}

export default new ProductProvider();
