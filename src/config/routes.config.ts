import { Application, Request, Response, NextFunction } from 'express';
import { AppRequest } from '../types/general.types';
import AuthMiddleware from '../middleware/auth.middleware';
import NotFoundError from '../error-handler/not-found-error';
import BaseRouter from '../shared/base.router';
import AuthRoutes from '../modules/auth/auth.routes';
import ProfileRoutes from '../modules/profile/profile.routes';

class RoutesConfig extends BaseRouter {
  protected override base = '';

  constructor(app: Application) {
    super(app);
  }

  protected override before(): void {
    // Apply Authentication Wrapper
    this.app.use(AuthMiddleware.authenticate);
  }

  protected override configureRoutes() {
    // API route
    new AuthRoutes(this.app).register();
    new ProfileRoutes(this.app).register();

    // Test routes [TODO: TEST/REMOVE]
    this.router.get('/api', (req: AppRequest, res: Response) => {
      const authenticated = Boolean(req.user);
      const hasProfile = Boolean(req.profile);
      res.json({ message: 'Hello, World!', authenticated, hasProfile });
    });
    this.router.get(
      '/api/member-protected',
      AuthMiddleware.isMember,
      (req: AppRequest, res: Response) => {
        const authenticated = Boolean(req.user);
        const profile = req.profile;
        res.json({ message: 'Hello, Member!', authenticated, profile });
      }
    );
    this.router.get(
      '/api/baker-protected',
      AuthMiddleware.isBaker,
      (req: AppRequest, res: Response) => {
        const authenticated = Boolean(req.user);
        const profile = req.profile;
        res.json({ message: 'Hello, Baker!', authenticated, profile });
      }
    );
  }

  protected override after(): void {
    // Catch-all route handler for 404 Not Found errors
    this.app.use((_req: Request, _res: Response, next: NextFunction) => {
      const error = new NotFoundError('Route not found');
      next(error);
    });
  }
}

export default RoutesConfig;
