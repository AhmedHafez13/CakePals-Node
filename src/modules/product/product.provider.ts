import ProductModel, { ProductDocument } from './product.model';
import { ProductAttributes } from './product.types';

class ProductProvider {
  async createProduct(data: ProductAttributes): Promise<ProductDocument> {
    const product = new ProductModel(data);
    await product.save();
    return product;
  }

  async findProductById(productId: string): Promise<ProductDocument | null> {
    return ProductModel.findById(productId);
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
