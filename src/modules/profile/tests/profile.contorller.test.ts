import { UserDocument } from '../../../modules/user/user.model';
import ProfileController from '../profile.controller';
import ProfileProvider from '../profile.provider';
import ProfileValidation from '../profile.validation';
import {
  userMock,
  requestMock,
  responseMock,
  memberProfileMock,
  bakerProfileMock,
} from './profile.controller.mocks';

jest.mock('../profile.provider');
jest.mock('../profile.validation');

describe('Profile Controller', () => {
  describe('createProfile', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      ProfileValidation.validateProfileInput = jest.fn().mockReturnValueOnce({
        value: { location: 'another-location-id' },
      });
    });

    it('should return a validation error if input is invalid', async () => {
      const validationError = 'Validation error';
      ProfileValidation.validateProfileInput = jest.fn().mockReturnValueOnce({
        error: { details: [{ message: validationError }] },
      });

      await ProfileController.createProfile(requestMock, responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(responseMock.json).toHaveBeenCalledWith({
        message: validationError,
      });
    });

    it('should handle existing profile for the same role', async () => {
      const existingProfile = { ...userMock, role: 'member' };
      ProfileProvider.findUserProfile = jest
        .fn()
        .mockResolvedValueOnce(existingProfile);

      await ProfileController.createProfile(requestMock, responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(responseMock.json).toHaveBeenCalledWith({
        message: `A profile with role member already exists for this user.`,
      });
    });

    it('should update user location if provided', async () => {
      await ProfileController.createProfile(requestMock, responseMock);

      expect(userMock.location).toBe('another-location-id');
      expect(userMock.save).toHaveBeenCalled();
    });

    it('should create a member profile if role is member', async () => {
      ProfileProvider.createMemberProfile = jest
        .fn()
        .mockReturnValueOnce(memberProfileMock);

      await ProfileController.createProfile(requestMock, responseMock);

      expect(ProfileProvider.createMemberProfile).toHaveBeenCalledWith(
        userMock.id
      );
      expect(responseMock.json).toHaveBeenCalledWith({
        profile: memberProfileMock,
      });
    });

    it('should create a baker profile if role is baker', async () => {
      requestMock.body.role = 'baker';
      ProfileProvider.createBakerProfile = jest
        .fn()
        .mockResolvedValueOnce(bakerProfileMock as unknown as UserDocument);

      await ProfileController.createProfile(requestMock, responseMock);

      expect(ProfileProvider.createBakerProfile).toHaveBeenCalledWith(
        userMock.id,
        requestMock.body.collectionTimeRange
      );
      expect(responseMock.json).toHaveBeenCalledWith({
        profile: bakerProfileMock,
      });
    });

    it('should handle invalid role', async () => {
      requestMock.body.role = 'invalid-role';

      await ProfileController.createProfile(requestMock, responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(responseMock.json).toHaveBeenCalledWith({
        message: `role must be one of baker, member`,
      });
    });
  });
});
