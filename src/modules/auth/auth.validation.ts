import Joi, { ValidationResult } from 'joi';

class AuthValidation {
  public validateSignupInput(data: any): ValidationResult {
    const signupSchema = Joi.object({
      username: Joi.string().max(128).required(),
      email: Joi.string().email().max(128).required(),
      password: Joi.string().min(6).max(128).required(),
    });

    return signupSchema.validate(data);
  }

  public validateLoginInput(data: any): ValidationResult {
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    return loginSchema.validate(data);
  }
}

export default new AuthValidation();
