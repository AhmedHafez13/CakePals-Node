import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserProvider from '../modules/user/user.provider';
import ProfileProvider from '../modules/profile/profile.provider';
import { UserRole } from '../modules/profile/profile.enums';
import { UserDocument } from '../modules/user/user.model';
import { ProfileDocument } from '../modules/profile/profile.model';
import { AppRequest } from '../types/general.types';
import { jwtSettings } from '../settings/jwt.settings';

class AuthMiddleware {
  public authenticate = async (
    req: AppRequest,
    _res: Response,
    next: NextFunction
  ) => {
    const token = this.extractTokenFromHeader(req.headers.authorization);

    if (!token) {
      return next(); // Allow guests to access public routes
    }

    try {
      const payload = this.verifyToken(token);

      if (payload && payload.hasOwnProperty('id')) {
        const { user, profiles } = await this.getUserAndProfile(payload);
        if (user) req.userData = user;
        if (profiles) req.profiles = profiles;
      }

      return next();
    } catch (error) {
      return next();
    }
  };

  public isAuthenticated = (
    req: AppRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.userData) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  };

  public isMember = (req: AppRequest, res: Response, next: NextFunction) => {
    const profile = req.profiles?.find(
      (profile) => profile.role === UserRole.Member
    );
    if (!profile || profile?.role !== UserRole.Member || !profile.isActive) {
      return res.status(403).json({
        message:
          'Access restricted to members, create or activate your member profile first!',
      });
    }
    next();
  };

  public isBaker = (req: AppRequest, res: Response, next: NextFunction) => {
    const profile = req.profiles?.find(
      (profile) => profile.role === UserRole.Baker
    );
    if (!profile || profile.role !== UserRole.Baker || !profile.isActive) {
      return res.status(403).json({
        message:
          'Access restricted to bakers, create or activate your baker profile first!',
      });
    }
    next();
  };

  private extractTokenFromHeader(header: string | undefined) {
    if (!header) return null;

    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return null;

    return parts[1];
  }

  private verifyToken(token: string) {
    const payload = jwt.verify(token, jwtSettings.secretKey);
    return typeof payload === 'object' ? payload : null;
  }

  private async getUserAndProfile(payload: JwtPayload) {
    let user: UserDocument | null = null;
    let profiles: ProfileDocument[] | null = null;

    user = await UserProvider.findUserById(payload['id']);
    if (user) {
      profiles = await ProfileProvider.findUserProfiles(user._id);
    }

    return { user, profiles };
  }
}

export default new AuthMiddleware();
