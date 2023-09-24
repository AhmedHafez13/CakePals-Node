import { Application } from 'express';
import ProfileController from './profile.controller';
import BaseRouter from '../../shared/base.router';
import AuthMiddleware from '../../middleware/auth.middleware';

class ProfileRoutes extends BaseRouter {
  protected override base = '/api/profiles';

  constructor(app: Application) {
    super(app);
  }

  protected override before(): void {
    // Apply isAuthenticated middleware to all profile routes
    this.router.use([`/`], AuthMiddleware.isAuthenticated);
  }

  protected override configureRoutes(): void {
    this.router.post('/', this.wrapAsync(ProfileController.createProfile));
  }
}

export default ProfileRoutes;
