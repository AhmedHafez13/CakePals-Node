import { Application, RequestHandler, Router } from 'express';

abstract class BaseRouter {
  protected abstract base: string;

  constructor(protected app: Application) {}

  public register() {
    const router = Router();

    this.configureRoutes(router);

    this.before();

    this.app.use(this.base, router);

    this.after();
  }

  protected abstract configureRoutes(router: Router): void;

  protected before() {}

  protected after() {}

  protected wrapAsync(fn: RequestHandler): RequestHandler {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}

export default BaseRouter;
