import mongoose, { Document, Model, Schema } from 'mongoose';
import { ProductAttributes } from './product.types';

export interface ProductDocument extends Document, ProductAttributes {}

interface ProductModel extends Model<ProductDocument> {}

const productSchema: Schema<ProductDocument, ProductModel> =
  new mongoose.Schema(
    {
      baker: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
      },
      productType: {
        type: Schema.Types.ObjectId,
        ref: 'ProductType',
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      prepTime: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true }
  );

const ProductModel = mongoose.model<ProductDocument, ProductModel>(
  'Product',
  productSchema
);

export default ProductModel;
