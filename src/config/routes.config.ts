import AuthMiddleware from '../middleware/auth.middleware';
import NotFoundError from '../error-handler/not-found-error';
import { Application, Request, Response, NextFunction, Router } from 'express';
import AuthRoutes from '../modules/auth/auth.routes';
import { AppRequest } from '../types/general.types';
import BaseRouter from '../shared/base.router';

class RoutesConfig extends BaseRouter {
  protected override base = '';
  private authMiddleware: AuthMiddleware;

  constructor(app: Application) {
    super(app);
    this.authMiddleware = new AuthMiddleware();
  }

  protected override before(): void {
    // Apply Authentication Wrapper
    this.app.use(this.authMiddleware.authenticate);
  }

  protected override configureRoutes(router: Router) {
    // API route
    new AuthRoutes(this.app).register();

    // Test routes [TODO: TEST/REMOVE]
    router.get('/api', (req: AppRequest, res: Response) => {
      const authenticated = Boolean(req.user);
      const hasProfile = Boolean(req.profile);
      res.json({ message: 'Hello, World!', authenticated, hasProfile });
    });
    router.get(
      '/api/member-protected',
      this.authMiddleware.isMember,
      (req: AppRequest, res: Response) => {
        const authenticated = Boolean(req.user);
        const profile = req.profile;
        res.json({ message: 'Hello, Member!', authenticated, profile });
      }
    );
    router.get(
      '/api/baker-protected',
      this.authMiddleware.isBaker,
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
