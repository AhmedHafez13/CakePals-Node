import { Response, NextFunction } from 'express';
import { AppRequest } from '../../types/general.types';
import ProfileProvider from '../../modules/profile/profile.provider';
import UserProvider from '../../modules/user/user.provider';
import AuthMiddleware from '../auth.middleware';
import { userMock, profileMock, jwtMock } from './auth.middleware.mocks';
import { UserRole } from '../../modules/profile/profile.enums';

describe('Authentication Middleware', () => {
  let req: AppRequest;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
    } as AppRequest;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('authenticate', () => {
    it('should allow guests to access public routes', async () => {
      await new AuthMiddleware().authenticate(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should handle valid token and set user and profile in request', async () => {
      req.headers = { authorization: 'Bearer validtoken' };

      jest
        .spyOn(AuthMiddleware.prototype as any, 'verifyToken')
        .mockReturnValueOnce({ id: userMock._id });

      UserProvider.findUserById = jest.fn().mockResolvedValue(userMock);
      ProfileProvider.findUserProfile = jest
        .fn()
        .mockResolvedValue(profileMock);

      await new AuthMiddleware().authenticate(req, res, next);

      expect(req.user).toEqual(userMock);
      expect(req.profile).toEqual(profileMock);
      expect(next).toHaveBeenCalled();
    });

    it('should handle invalid token and return unauthorized', async () => {
      req.headers = { authorization: 'Bearer invalidtoken' };
      jwtMock.verify.mockImplementation(() => {
        throw new Error();
      });

      const jsonMock = jest.fn();
      res.status = jest.fn().mockReturnValueOnce({ json: jsonMock });

      await new AuthMiddleware().authenticate(req, res, next);

      expect(jsonMock).toHaveBeenCalledWith({ message: 'Unauthorized' });
    });
  });
});

describe('Authorization Middleware', () => {
  let req: AppRequest;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
      profile: { role: '' } as any,
    } as AppRequest;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('isMember', () => {
    it('should allow access for members', async () => {
      if (req.profile) {
        req.profile.role = UserRole.Member;
        req.profile.isActive = true;
      }

      const authMiddleware = new AuthMiddleware();
      authMiddleware.isMember(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should restrict access for non-active member profiles', async () => {
      if (req.profile) {
        req.profile.role = UserRole.Member;
        req.profile.isActive = false;
      }

      const authMiddleware = new AuthMiddleware();
      authMiddleware.isMember(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Access restricted to members, create or activate your member profile first!',
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should restrict access for non-members', async () => {
      if (req.profile) {
        req.profile.role = UserRole.Baker;
      }

      const authMiddleware = new AuthMiddleware();
      authMiddleware.isMember(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Access restricted to members, create or activate your member profile first!',
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('isBaker', () => {
    it('should allow access for bakers', async () => {
      if (req.profile) {
        req.profile.role = UserRole.Baker;
        req.profile.isActive = true;
      }

      const authMiddleware = new AuthMiddleware();
      authMiddleware.isBaker(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should restrict access for non-active baker profiles', async () => {
      if (req.profile) {
        req.profile.role = UserRole.Baker;
        req.profile.isActive = false;
      }

      const authMiddleware = new AuthMiddleware();
      authMiddleware.isBaker(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Access restricted to bakers, create or activate your baker profile first!',
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should restrict access for non-bakers', async () => {
      if (req.profile) {
        req.profile.role = UserRole.Member;
      }

      const authMiddleware = new AuthMiddleware();
      authMiddleware.isBaker(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Access restricted to bakers, create or activate your baker profile first!',
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
