import ProductModel, { ProductDocument } from './product.model';
import { ProductAttributes } from './product.types';
import ProductTypeModel from '../product-type/product-type.model';
import UserModel from '../user/user.model';
import ProfileModel from '../profile/profile.model';
import LocationModel from '../location/location.model';

class ProductProvider {
  /**
   * Creates a new product.
   * @param data - The product details including name, price, and baker information.
   * @returns The created product document.
   */
  async createProduct(data: ProductAttributes): Promise<ProductDocument> {
    return ProductModel.create(data);
  }

  /**
   * Finds a product by its ID.
   * @param productId - The ID of the product to be found.
   * @param populateUser - Whether to populate the baker's user information.
   * @returns The found product document, or null if the product was not found.
   */
  async findProductById(
    productId: string,
    populateUser?: boolean
  ): Promise<ProductDocument | null> {
    const product = ProductModel.findById(productId);
    if (populateUser) {
      product.populate({
        path: 'baker',
        select: 'collectionTimeRange user',
        model: ProfileModel,
      });
    }
    return product;
  }

  /**
   * Lists all available products.
   * @returns An array of product documents.
   */
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

  /**
   * Updates an existing product.
   * @param productId - The ID of the product to be updated.
   * @param data - The updated product details including name and price.
   * @returns The updated product document, or null if the product was not found.
   */
  async updateProduct(
    productId: string,
    data: { name?: string; price?: number }
  ): Promise<ProductDocument | null> {
    const product = await ProductModel.findByIdAndUpdate(productId, data, {
      new: true,
    });
    return product;
  }

  /**
   * Deletes a product by its ID.
   * @param productId - The ID of the product to be deleted.
   * @returns The deleted product document, or null if the product was not found.
   */
  async deleteProduct(productId: string): Promise<ProductDocument | null> {
    return ProductModel.findByIdAndDelete(productId);
  }
}

export default new ProductProvider();
