import { UserRole } from '../profile.enums';
import ProfileValidation from '../profile.validation';

describe('Profile Validation', () => {
  describe('validateProfileInput', () => {
    it('should return an error if role is invalid', () => {
      const invalidData = { role: 'invalid', location: '650f515c891f03d9445e4b61' };
      const result = ProfileValidation.validateProfileInput(invalidData);
      expect(result.error).toBeDefined();
    });

    it('should return an error if location is invalid', () => {
      const invalidData = { role: UserRole.Member, location: 'invalid' };
      const result = ProfileValidation.validateProfileInput(invalidData);
      expect(result.error).toBeDefined();
    });

    it('should return an error if collectionTimeRange is invalid for Baker', () => {
      const invalidData = {
        role: UserRole.Baker,
        location: '650f515c891f03d9445e4b61',
        collectionTimeRange: { startTime: -1, endTime: 1440 },
      };
      const result = ProfileValidation.validateProfileInput(invalidData);
      expect(result.error).toBeDefined();
    });

    it('should return no error if data is valid for Member', () => {
      const validData = {
        role: UserRole.Member,
        location: '650f515c891f03d9445e4b61',
      };
      const result = ProfileValidation.validateProfileInput(validData);
      expect(result.error).toBeUndefined();
    });

    it('should return no error if data is valid for Baker', () => {
      const validData = {
        role: UserRole.Baker,
        location: '650f515c891f03d9445e4b61',
        collectionTimeRange: { startTime: 0, endTime: 720 },
      };
      const result = ProfileValidation.validateProfileInput(validData);
      expect(result.error).toBeUndefined();
    });
  });

  describe('validateRule', () => {
    it('should return an error if role is invalid', () => {
      // Test logic here
    });

    it('should return no error if role is valid', () => {
      // Test logic here
    });
  });
});
