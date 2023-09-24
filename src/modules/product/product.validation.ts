import AppRegex from '../../shared/app.regex';
import Joi, { ValidationResult } from 'joi';

class ProductValidation {
  private objectIdValidation = Joi.string()
    .required()
    .regex(AppRegex.objectIdRegex);

  private productValidationSchema = Joi.object({
    productType: this.objectIdValidation,
    description: Joi.string().required().max(256),
    price: Joi.number().positive().required(),
    prepTime: Joi.number().integer().positive().required(),
  });

  public validateProductInput(data: any): ValidationResult {
    const { productType, description, price, prepTime } = data;

    return this.productValidationSchema.validate({
      productType,
      description,
      price,
      prepTime,
    });
  }
}

export default new ProductValidation();
