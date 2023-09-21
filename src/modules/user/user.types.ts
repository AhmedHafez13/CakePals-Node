import { Coordinate } from '../../types/general.types';

export interface UserAttributes {
  username: string;
  email: string;
  password: string;
  location: Coordinate;
}
