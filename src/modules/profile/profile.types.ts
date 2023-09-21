import { Types } from 'mongoose';
import { UserRole } from './profile.enums';

export interface CollectionTimeRange {
  startTime: Date;
  endTime: Date;
}

export interface ProfileAttributes {
  user: Types.ObjectId;
  role: UserRole;
  isActive?: boolean;
  collectionTimeRange: CollectionTimeRange;
}
