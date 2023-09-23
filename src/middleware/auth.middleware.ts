import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserProvider from '../modules/user/user.provider';
import ProfileProvider from '../modules/profile/profile.provider';
import { AppRequest } from '../types/general.types';
import { UserRole } from '../modules/profile/profile.enums';

class AuthMiddleware {
  public authenticate = async (
    req: AppRequest,
    res: Response,
    next: NextFunction
  ) => {
    const token = this.extractTokenFromHeader(req.headers.authorization);

    if (!token) {
      return next(); // Allow guests to access public routes
    }

    try {
      const decoded = this.verifyToken(token, process.env.JWT_SECRET || '');

      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        const user = await UserProvider.findUserById(decoded['id']);

        if (user) {
          const profile = await ProfileProvider.findUserProfile(user._id);

          if (profile) {
            req.profile = profile;
          }

          req.user = user;
          return next();
        }
      }

      return res.status(401).json({ message: 'Unauthorized' });
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };

  public isMember = (req: AppRequest, res: Response, next: NextFunction) => {
    const profile = req.profile;
    if (!profile || profile?.role !== UserRole.Member || !profile.isActive) {
      return res.status(403).json({
        message:
          'Access restricted to members, create or activate your member profile first!',
      });
    }
    next();
  };

  public isBaker = (req: AppRequest, res: Response, next: NextFunction) => {
    const profile = req.profile;
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

  private verifyToken(token: string, secret: string) {
    return jwt.verify(token, secret);
  }
}

export default AuthMiddleware;
