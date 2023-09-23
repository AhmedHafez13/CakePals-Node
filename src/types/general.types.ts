import express from 'express';
import { ProfileDocument } from '../modules/profile/profile.model';
import { UserDocument } from '../modules/user/user.model';

export interface Coordinate {
  type: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export interface AppRequest extends express.Request {
  userData?: UserDocument;
  profiles?: ProfileDocument[];
}
