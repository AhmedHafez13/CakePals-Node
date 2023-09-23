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
      await AuthMiddleware.authenticate(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should handle valid token and set user and profile in request', async () => {
      req.headers = { authorization: 'Bearer validtoken' };

      jest
        .spyOn(AuthMiddleware as any, 'verifyToken')
        .mockReturnValueOnce({ id: userMock._id });

      UserProvider.findUserById = jest.fn().mockResolvedValue(userMock);
      ProfileProvider.findUserProfile = jest
        .fn()
        .mockResolvedValue(profileMock);

      await AuthMiddleware.authenticate(req, res, next);

      expect(req.user).toEqual(userMock);
      expect(req.profile).toEqual(profileMock);
      expect(next).toHaveBeenCalled();
    });

    it('should pass the invalid token and proceed', async () => {
      req.headers = { authorization: 'Bearer invalidtoken' };
      jwtMock.verify.mockImplementation(() => {
        throw new Error();
      });

      const jsonMock = jest.fn();
      res.status = jest.fn().mockReturnValueOnce({ json: jsonMock });

      await AuthMiddleware.authenticate(req, res, next);

      expect(req.user).toEqual(undefined);
      expect(req.profile).toEqual(undefined);
      // This middleware is designed just to get the user and its profile
      // to check if the user is authenticated or check the rule other middleware is used
      expect(next).toHaveBeenCalled();
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

      AuthMiddleware.isMember(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should restrict access for non-active member profiles', async () => {
      if (req.profile) {
        req.profile.role = UserRole.Member;
        req.profile.isActive = false;
      }

      AuthMiddleware.isMember(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message:
          'Access restricted to members, create or activate your member profile first!',
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should restrict access for non-members', async () => {
      if (req.profile) {
        req.profile.role = UserRole.Baker;
      }

      AuthMiddleware.isMember(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message:
          'Access restricted to members, create or activate your member profile first!',
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

      AuthMiddleware.isBaker(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should restrict access for non-active baker profiles', async () => {
      if (req.profile) {
        req.profile.role = UserRole.Baker;
        req.profile.isActive = false;
      }

      AuthMiddleware.isBaker(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message:
          'Access restricted to bakers, create or activate your baker profile first!',
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should restrict access for non-bakers', async () => {
      if (req.profile) {
        req.profile.role = UserRole.Member;
      }

      AuthMiddleware.isBaker(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message:
          'Access restricted to bakers, create or activate your baker profile first!',
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
