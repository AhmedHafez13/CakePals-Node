export const jwtSettings = {
  secretKey: process.env.JWT_SECRET || 'default_secret_key',
  authTokenExpireTime: process.env.JWT_EXPIRE_TIME || '1h',
  verificationTokenExpireTime:
    process.env.VERIFICATION_TOKEN_EXPIRE_TIME || '1h',
};
