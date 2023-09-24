import { Response } from 'express';
import { UserDocument } from '../../user/user.model';
import { AppRequest } from '../../../types/general.types';
import { ProfileDocument } from '../profile.model';

// Mocked user data
export const userMock: UserDocument = {
  id: '12345',
  location: 'some-location-id',
  save: jest.fn(),
} as unknown as UserDocument;

// Mocked profile data
const commonProfileData = {
  _id: '67890',
  user: userMock._id,
  role: 'member',
  isActive: true,
  collectionTimeRange: {
    startTime: new Date(),
    endTime: new Date(),
  },
  save: jest.fn(),
};

export const memberProfileMock: ProfileDocument[] = [
  {
    ...commonProfileData,
    role: 'member',
  },
] as unknown as ProfileDocument[];

export const bakerProfileMock: ProfileDocument[] = [
  {
    ...commonProfileData,
    role: 'baker',
    collectionTimeRange: {
      startTime: new Date(),
      endTime: new Date(),
    },
  },
] as unknown as ProfileDocument[];

// Mocked request object
export const requestMock: AppRequest = {
  userData: userMock,
  body: {
    role: 'member',
    location: 'another-location-id',
  },
} as unknown as AppRequest;

// Mocked response object
export const responseMock: Response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;
