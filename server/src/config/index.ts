import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'seekproof_db',
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10),
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'seekproof_fallback_secret_investigation_suite_dev_key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 mins
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },

  adminSeed: {
    email: process.env.ADMIN_SEED_EMAIL || 'admin@seekproof.com',
    password: process.env.ADMIN_SEED_PASSWORD || 'Admin@SeekProof2026!',
    name: process.env.ADMIN_SEED_NAME || 'Principal Director',
    role: process.env.ADMIN_SEED_ROLE || 'super_admin',
  }
};
