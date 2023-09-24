import Joi, { ValidationResult } from 'joi';
import { UserRole } from './profile.enums';
import AppRegex from '../../shared/app.regex';

class ProfileValidation {
  private timeValidation = Joi.number().integer().required().min(0);
  private objectIdValidation = Joi.string()
    .required()
    .regex(AppRegex.objectIdRegex);

  private commonSchema = Joi.object({
    role: Joi.string()
      .required()
      .valid(...Object.values(UserRole)),
    location: this.objectIdValidation,
  });

  private bakerSchema = this.commonSchema.keys({
    collectionTimeRange: Joi.object({
      startTime: this.timeValidation.max(Joi.ref('endTime')),
      endTime: this.timeValidation.max(1380),
    }).required(),
  });

  public validateProfileInput(data: any): ValidationResult {
    const { role, location, collectionTimeRange } = data;

    // Validate role
    const result = this.validateRule(role);
    if (result.error) return result;

    // Validate profile data
    let validationSchema;
    let profileData;

    if (role === UserRole.Member) {
      profileData = { role, location };
      validationSchema = this.commonSchema;
    } else {
      // UserRole.Baker
      profileData = { role, location, collectionTimeRange };
      validationSchema = this.bakerSchema;
    }

    return validationSchema.validate(profileData);
  }

  private validateRule(role: string): ValidationResult {
    const validationSchema = Joi.string()
      .valid(...Object.values(UserRole))
      .required();
    return validationSchema.validate(role);
  }
}

export default new ProfileValidation();
