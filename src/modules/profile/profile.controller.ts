import { Response } from 'express';
import ProfileProvider from './profile.provider';
import { UserRole } from './profile.enums';
import ProfileValidation from './profile.validation';
import { UserDocument } from '../user/user.model';
import { AppRequest } from '../../types/general.types';

class ProfileController {
  async createProfile(req: AppRequest, res: Response) {
    const user = req.userData as UserDocument;
    const { role } = req.body;

    // Validate the incoming data
    const { error, value } = ProfileValidation.validateProfileInput(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if a profile with the same role already exists for the user
    const existingProfile = await ProfileProvider.findUserProfile(user.id, {
      role,
    });

    if (existingProfile && existingProfile.role === role) {
      return res.status(400).json({
        message: `A profile with role ${role} already exists for this user.`,
      });
    }

    // Update user location if exists
    if (value.location) {
      user.location = value.location;
      await user.save();
    }

    // Create the profile based on the user role
    let profile;
    if (role === UserRole.Member) {
      profile = await ProfileProvider.createMemberProfile(user.id);
    } else if (role === UserRole.Baker) {
      profile = await ProfileProvider.createBakerProfile(
        user.id,
        value.collectionTimeRange
      );
    } else {
      return res.status(400).json({
        message: `role must be one of ${Object.values(UserRole).join(', ')}`,
      });
    }

    return res.json({ profile });
  }
}

export default new ProfileController();
