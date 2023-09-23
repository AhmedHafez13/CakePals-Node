import ProfileModel, { ProfileDocument } from './profile.model';

class ProfileProvider {
  public async findUserProfile(
    userId: string
  ): Promise<ProfileDocument | null> {
    return ProfileModel.findOne({ user: userId });
  }
}

export default new ProfileProvider();
