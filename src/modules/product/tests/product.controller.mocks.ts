import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { UserDocument } from '../../../modules/user/user.model';
import { UserRole } from '../../../modules/profile/profile.enums';
import { AppRequest } from '../../../types/general.types';

// Mocked user data
export const userMock: UserDocument = {
  id: '650eb234ffd64b091466ba6c',
  location: '650f515c891f03d9445e4b61',
  save: jest.fn(),
} as unknown as UserDocument;

// Mocked product data
const commonProductData = {
  baker: '650eb234ffd64b091466ba6c',
  productType: new ObjectId('650f9f010662bcec519352ed'),
  description:
    'Magic Pie is a delicious dessert that can transport you to a world of sweet indulgence with just one bite.',
  price: 9.85,
  prepTime: 35,
};

export const productMock = {
  _id: '650fa4f29b683b535a358aab',
  ...commonProductData,
};

// Mocked request object
export const requestMock: AppRequest = {
  userData: userMock,
  profiles: [
    {
      role: UserRole.Baker,
    },
  ],
  body: {
    ...commonProductData,
  },
} as unknown as AppRequest;

// Mocked response object
export const responseMock: Response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

export const nextMock = jest.fn();

export const resetMocks = () => {
  jest.clearAllMocks();
};

export const productProviderMock = {
  createProduct: jest.fn().mockResolvedValue(productMock),
  findProductById: jest.fn().mockResolvedValue(productMock),
  updateProduct: jest.fn().mockResolvedValue(productMock),
  deleteProduct: jest.fn().mockResolvedValue(productMock),
};

export const productValidationMock = {
  validateProductInput: jest
    .fn()
    .mockReturnValue({ error: null, value: requestMock.body }),
};
