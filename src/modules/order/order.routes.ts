import { Application } from 'express';
import OrderController from './order.controller';
import BaseRouter from '../../shared/base.router';
import AuthMiddleware from '../../middleware/auth.middleware';

class OrderRoutes extends BaseRouter {
  protected override base = '/api/orders';

  constructor(app: Application) {
    super(app);
  }

  protected override before(): void {
    // Apply isAuthenticated middlewares to all endpoints endpoint
    this.router.use([`/`], AuthMiddleware.isAuthenticated);
  }

  protected override configureRoutes(): void {
    // ----- Member Events -----
    this.router.post(
      '/',
      AuthMiddleware.isMember,
      this.wrapAsync(OrderController.placeOrder)
    );
  }
}

export default OrderRoutes;
