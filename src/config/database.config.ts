import { appSettings } from '../settings/app.settings';
import mongoose from 'mongoose';

class DatabaseConfig {
  private mongoURI: string;

  constructor() {
    this.mongoURI = `mongodb://${appSettings.mongoIP}:${appSettings.mongoPort}/${appSettings.mongoDBName}`;
  }

  public async connect(): Promise<boolean> {
    try {
      await mongoose.connect(this.mongoURI);
      console.log('Connected to MongoDB');

      return true;
    } catch (error) {
      console.error('MongoDB connection error:', error);

      return false;
    }
  }
}

export default DatabaseConfig;
