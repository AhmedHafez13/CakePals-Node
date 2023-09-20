import NotFoundError from '../error-handler/not-found-error';
import express from 'express';

class RoutesConfig {
  constructor(private app: express.Application) {
    this.configureRoutes();
    this.handleNotFound();
  }

  private configureRoutes() {
    // API routes [TODO: ADD NEEDED API ROUTES]
    // this.app.use('/api/auth', authRoutes);
    // this.app.use('/api/users', userRoutes);
    // this.app.use('/api/urls', isAuthenticated, urlRoutes);

    // Home route [TODO: TEST/REMOVE]
    this.app.get('/api/', (_req: express.Request, res: express.Response) => {
      res.json({ message: 'Hello, World!' });
    });
  }

  private handleNotFound() {
    // Catch-all route handler for 404 Not Found errors
    this.app.use(
      (
        _req: express.Request,
        _res: express.Response,
        next: express.NextFunction
      ) => {
        const error = new NotFoundError('Route not found');
        next(error);
      }
    );
  }
}

export default RoutesConfig;
