import mongoose, { Document, Model, Schema } from 'mongoose';
import { ProductTypeAttributes } from './product-type.types';
import { ProductType } from './product-type.enums';

export interface ProductTypeDocument extends Document, ProductTypeAttributes {}

interface ProductTypeModel extends Model<ProductTypeDocument> {}

const productTypeSchema: Schema<ProductTypeDocument, ProductTypeModel> =
  new mongoose.Schema(
    {
      type: {
        type: String,
        enum: Object.values(ProductType),
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

const ProductTypeModel = mongoose.model<ProductTypeDocument, ProductTypeModel>(
  'ProductType',
  productTypeSchema
);

export default ProductTypeModel;
