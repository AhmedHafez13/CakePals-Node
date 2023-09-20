import Server from './server';
import { config } from 'dotenv';

config();

const server = new Server();
server.start().catch((error) => {
  console.error('Failed to start the server:', error);
});
