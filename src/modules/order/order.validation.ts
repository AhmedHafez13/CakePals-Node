import AppRegex from '../../shared/app.regex';
import Joi, { ValidationResult } from 'joi';
import { PaymentMethods } from './order.enums';

class OrderValidation {
  private objectIdValidation = Joi.string()
    .required()
    .regex(AppRegex.objectIdRegex);

  private productValidationSchema = Joi.object({
    product: this.objectIdValidation,
    paymentMethod: Joi.string()
      .required()
      .valid(...Object.values(PaymentMethods)),
    collectionTime: Joi.date().required().min('now'),
  });

  public validateOrderInput(data: any): ValidationResult {
    const { product, paymentMethod, collectionTime } = data;

    return this.productValidationSchema.validate({
      product,
      paymentMethod,
      collectionTime,
    });
  }
}

export default new OrderValidation();
