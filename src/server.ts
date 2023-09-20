import express, { Express } from 'express';
import morgan from 'morgan';
import { errorHandler } from './middleware/error-handler.middleware';
import RoutesConfig from './config/routes.config';
import DatabaseConfig from './config/database.config';

class Server {
  private app: Express;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8080';
  }

  public async start(): Promise<void> {
    const connected = await this.connectToDatabase();
    if (!connected) {
      process.exit();
    }

    this.setupLogger();
    this.setupMiddleware();
    this.configureRoutes();
    this.setupErrorHandling();

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }

  private async connectToDatabase(): Promise<boolean> {
    const databaseConfig = new DatabaseConfig();
    return await databaseConfig.connect();
  }

  private setupLogger(): void {
    this.app.use(morgan('combined'));
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
  }

  private configureRoutes(): void {
    new RoutesConfig(this.app);
  }

  private setupErrorHandling(): void {
    this.app.use(errorHandler);
  }
}

export default Server;
