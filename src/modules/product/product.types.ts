import { Types } from 'mongoose';

export interface ProductAttributes {
  baker: Types.ObjectId;
  productType: Types.ObjectId;
  description: string;
  price: number;
  prepTime: number;
}
