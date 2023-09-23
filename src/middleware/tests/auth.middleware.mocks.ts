import { UserDocument } from '../../modules/user/user.model';
import { ProfileDocument } from '../../modules/profile/profile.model';

export const userMock: UserDocument = {
  _id: '12345',
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'hashedpassword',
  location: {
    type: 'Point',
    coordinates: [0, 0],
  },
  save: jest.fn(),
} as unknown as UserDocument;

export const profileMock: ProfileDocument[] = [{
  _id: '67890',
  user: userMock._id,
  role: 'member',
  isActive: true,
  collectionTimeRange: {
    startTime: new Date(),
    endTime: new Date(),
  },
  save: jest.fn(),
}] as unknown as ProfileDocument[];

export const jwtMock = {
  verify: jest.fn(),
};
