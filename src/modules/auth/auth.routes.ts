import AuthController from './auth.controller';
import BaseRouter from '../../shared/base.router';

class AuthRoutes extends BaseRouter {
  protected override base = '/api/auth';
  protected override configureRoutes(): void {
    const authController = new AuthController();

    this.router.post('/signup', this.wrapAsync(authController.signup));
    this.router.post('/login', this.wrapAsync(authController.login));
  }
}

export default AuthRoutes;
