import { Application } from 'express';
import ProductController from './product.controller';
import BaseRouter from '../../shared/base.router';
import AuthMiddleware from '../../middleware/auth.middleware';

class ProductRoutes extends BaseRouter {
  protected override base = '/api/products';

  constructor(app: Application) {
    super(app);
  }

  protected override before(): void {
    // Apply isAuthenticated and isBaker middlewares to the endpoint
    this.router.use(
      [`/`],
      AuthMiddleware.isAuthenticated,
      AuthMiddleware.isBaker
    );
  }

  protected override configureRoutes(): void {
    this.router.post('/', this.wrapAsync(ProductController.createProduct));
  }
}

export default ProductRoutes;
