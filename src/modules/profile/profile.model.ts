import mongoose, { Document, Model, Schema } from 'mongoose';
import { ProfileAttributes } from './profile.types';
import { UserRole } from './profile.enums';

export interface ProfileDocument extends Document, ProfileAttributes {}

interface ProfileModel extends Model<ProfileDocument> {}

// Schemas
const profileSchema: Schema<ProfileDocument, ProfileModel> =
  new mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      role: {
        type: String,
        enum: Object.values(UserRole),
        required: true,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  );

const bakerProfileSchema = new mongoose.Schema({
  collectionTimeRange: {
    type: {
      startTime: Number,
      endTime: Number,
    },
    required: false,
  },
});

// Model
const ProfileModel = mongoose.model<ProfileDocument, ProfileModel>(
  'Profile',
  profileSchema
);

// Discriminators
export const BakerProfileModel = ProfileModel.discriminator(
  UserRole.Baker,
  bakerProfileSchema
);

export default ProfileModel;
