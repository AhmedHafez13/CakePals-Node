import { UserRole } from './profile.enums';
import { CollectionTimeRange } from './profile.types';
import ProfileModel, {
  BakerProfileModel,
  ProfileDocument,
} from './profile.model';

class ProfileProvider {
  public async findUserProfile(
    userId: string,
    filters?: { [key: string]: any }
  ): Promise<ProfileDocument | null> {
    return ProfileModel.findOne({ user: userId, ...filters });
  }

  public async findUserProfiles(
    userId: string,
    filters?: { [key: string]: any }
  ): Promise<ProfileDocument[] | null> {
    return ProfileModel.find({ user: userId, ...filters });
  }

  public async createMemberProfile(userId: string): Promise<ProfileDocument> {
    return ProfileModel.create({ user: userId, role: UserRole.Member });
  }

  public async createBakerProfile(
    userId: string,
    collectionTimeRange: CollectionTimeRange
  ): Promise<ProfileDocument> {
    return BakerProfileModel.create({
      user: userId,
      role: UserRole.Baker,
      collectionTimeRange,
    }) as Promise<ProfileDocument>;
  }
}

export default new ProfileProvider();
