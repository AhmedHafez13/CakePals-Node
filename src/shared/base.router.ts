import { Application, RequestHandler, Router } from 'express';

abstract class BaseRouter {
  protected abstract base: string;
  protected router: Router;

  constructor(protected app: Application) {
    this.router = Router();
  }

  public register() {
    this.before();

    this.configureRoutes();

    this.app.use(this.base, this.router);

    this.after();
  }

  protected before() {}

  protected abstract configureRoutes(): void;

  protected after() {}

  protected wrapAsync(fn: RequestHandler): RequestHandler {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}

export default BaseRouter;
