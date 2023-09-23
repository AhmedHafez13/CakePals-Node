import express from 'express';
import { ProfileDocument } from '../modules/profile/profile.model';

export interface Coordinate {
  type: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export interface AppRequest extends express.Request {
  profile?: ProfileDocument;
}
