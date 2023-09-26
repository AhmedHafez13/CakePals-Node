import { Types } from 'mongoose';
import { UserRole } from './profile.enums';

export interface CollectionTimeRange {
  startTime: number;
  endTime: number;
}

export interface ProfileAttributes {
  user: Types.ObjectId;
  role: UserRole;
  isActive?: boolean;
  collectionTimeRange?: CollectionTimeRange;
}

export interface BakerProfileAttributes extends ProfileAttributes {
  collectionTimeRange: CollectionTimeRange;
}
