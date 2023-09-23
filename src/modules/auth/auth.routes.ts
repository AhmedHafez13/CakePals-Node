import { Router } from 'express';
import AuthController from './auth.controller';
import BaseRouter from '../../shared/base.router';

class AuthRoutes extends BaseRouter {
  protected override base = '/api/auth';
  protected override configureRoutes(router: Router): void {
    const authController = new AuthController();

    router.post('/signup', this.wrapAsync(authController.signup));
    router.post('/login', this.wrapAsync(authController.login));
  }
}

export default AuthRoutes;
