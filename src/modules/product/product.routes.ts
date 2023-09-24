import { Application } from 'express';
import ProductController from './product.controller';
import BaseRouter from '../../shared/base.router';
import AuthMiddleware from '../../middleware/auth.middleware';

class ProductRoutes extends BaseRouter {
  protected override base = '/api/products';

  constructor(app: Application) {
    super(app);
  }

  protected override configureRoutes(): void {
    this.router.get('/', this.wrapAsync(ProductController.listProducts));
    this.router.post(
      '/',
      AuthMiddleware.isAuthenticated,
      AuthMiddleware.isBaker,
      this.wrapAsync(ProductController.createProduct)
    );
  }
}

export default ProductRoutes;
