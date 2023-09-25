import AppRegex from '../../shared/app.regex';
import Joi, { ValidationResult } from 'joi';
import { PaymentMethods } from './order.enums';
import { EditOrderData, PlaceOrderData } from './order.types';

class OrderValidation {
  private objectIdValidation = Joi.string()
    .required()
    .regex(AppRegex.objectIdRegex);

  private productCommonSchema = Joi.object({
    paymentMethod: Joi.string()
      .required()
      .valid(...Object.values(PaymentMethods)),
    collectionTime: Joi.date().required().min('now'),
  });

  private productSchema = this.productCommonSchema.keys({
    product: this.objectIdValidation,
  });

  private productUpdateSchema = this.productCommonSchema.keys({
    orderId: this.objectIdValidation,
  });

  public validateOrderInput(
    data: PlaceOrderData
  ): ValidationResult<PlaceOrderData> {
    const { product, paymentMethod, collectionTime } = data;

    return this.productSchema.validate({
      product,
      paymentMethod,
      collectionTime,
    });
  }

  public validateOrderEdit(
    data: EditOrderData
  ): ValidationResult<EditOrderData> {
    const { orderId, paymentMethod, collectionTime } = data;

    return this.productUpdateSchema.validate({
      orderId,
      paymentMethod,
      collectionTime,
    });
  }
}

export default new OrderValidation();
