import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

/**
 * Sanitizes sensitive database details, passwords, and tokens from error messages
 */
function sanitizeErrorMessage(msg: string): string {
  if (!msg) return 'An unexpected internal error occurred.';
  return msg
    .replace(/password\s*=\s*['"][^'"]*['"]/gi, 'password=***')
    .replace(/password_hash/gi, 'credential_hash')
    .replace(/using password: (YES|NO)/gi, 'authentication failed')
    .replace(/Access denied for user '[^']+'@'[^']+'/gi, 'Database connection access restricted')
    .replace(/seekproof_[a-zA-Z0-9_]+/gi, '[DATABASE_RESOURCE]');
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = err.statusCode || (err.name === 'ValidationError' ? 400 : 500);
  const rawMessage = err.message || 'Internal Server Error';
  const sanitizedMessage = sanitizeErrorMessage(rawMessage);

  // Log error in development (safe server console only)
  if (config.env === 'development') {
    console.error('💥 [Server Exception]:', err.name || 'Error', sanitizedMessage);
  }

  res.status(statusCode).json({
    success: false,
    error: sanitizedMessage,
    ...(err.errors && { errors: err.errors })
  });
}

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error: `API resource not found: ${req.method} ${req.originalUrl}`
  });
}
