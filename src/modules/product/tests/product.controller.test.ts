import ProductController from '../product.controller';
import ProductProvider from '../product.provider';
import productValidation from '../product.validation';
import {
  requestMock,
  responseMock,
  productMock,
} from './product.controller.mocks';

jest.mock('../product.provider');
jest.mock('../product.validation');

describe('Product Controller', () => {
  describe('createProduct', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return a validation error if input is invalid', async () => {
      const validationError = 'Validation error';
      productValidation.validateProductInput = jest.fn().mockReturnValueOnce({
        error: { details: [{ message: validationError }] },
      });

      await ProductController.createProduct(requestMock, responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(responseMock.json).toHaveBeenCalledWith({
        message: validationError,
      });
    });

    it('should create a product', async () => {
      productValidation.validateProductInput = jest
        .fn()
        .mockReturnValueOnce({ value: productMock });
      ProductProvider.createProduct = jest.fn().mockResolvedValue(productMock);
      const originalPrice = productMock.price;

      await ProductController.createProduct(requestMock, responseMock);

      expect(productMock.price).toEqual(originalPrice * 100);
      expect(ProductProvider.createProduct).toHaveBeenCalledWith(productMock);
      expect(responseMock.json).toHaveBeenCalledWith({
        product: productMock,
      });
    });
  });
});
