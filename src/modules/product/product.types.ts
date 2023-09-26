import { Types } from 'mongoose';
import { ProfileAttributes } from '../profile/profile.types';

export interface ProductAttributes {
  baker: Types.ObjectId | string | ProfileAttributes;
  productType: Types.ObjectId;
  description: string;
  price: number;
  prepTime: number;
}
