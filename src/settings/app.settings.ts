export const appSettings = {
  // MongoDB
  mongoIP: process.env.MONGO_IP || 'localhost',
  mongoPort: process.env.MONGO_PORT || '27017',
  mongoDBName: process.env.MONGO_DB_NAME || 'cakepals',
};
