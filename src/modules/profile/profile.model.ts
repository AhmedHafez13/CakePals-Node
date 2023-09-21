import mongoose, { Document, Model, Schema } from 'mongoose';
import { ProfileAttributes } from './profile.types';
import { UserRole } from './profile.enums';

export interface ProfileDocument extends Document, ProfileAttributes {}

interface ProfileModel extends Model<ProfileDocument> {}

const profileSchema: Schema<ProfileDocument, ProfileModel> = new mongoose.Schema(
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
    collectionTimeRange: {
      type: {
        startTime: Date,
        endTime: Date,
      },
      required: true,
    },
  },
  { timestamps: true }
);

const ProfileModel = mongoose.model<ProfileDocument, ProfileModel>(
  'Profile',
  profileSchema
);

export default ProfileModel;
