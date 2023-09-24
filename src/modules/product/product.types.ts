import { Types } from 'mongoose';

export interface ProductAttributes {
  baker: Types.ObjectId | string;
  productType: Types.ObjectId;
  description: string;
  price: number;
  prepTime: number;
}
