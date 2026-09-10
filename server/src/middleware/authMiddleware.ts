import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AuthenticatedRequest, UserRole, AdminRole } from '../types';
import { AuditService } from '../services/auditService';

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  // 1. Check Authorization Bearer Header, Cookie, or Custom Header
  const authHeader = req.headers['authorization'];
  let token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token && (req as any).cookies?.token) {
    token = (req as any).cookies.token;
  }

  if (!token && req.headers.cookie) {
    const match = req.headers.cookie.match(/(?:^|;\s*)token=([^;]+)/);
    if (match) {
      token = decodeURIComponent(match[1]);
    }
  }

  if (!token && req.headers['x-access-token']) {
    token = req.headers['x-access-token'] as string;
  }

  if (!token) {
    res.status(401).json({
      success: false,
      error: 'Access denied. No valid cryptographic token provided.'
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as {
      id: string;
      email: string;
      role: UserRole;
      name: string;
    };

    req.user = decoded;
    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: 'Session expired or cryptographic signature invalid. Please authenticate again.'
    });
    return;
  }
}

/**
 * Role-based authorization middleware with super_admin inheritance
 */
export function requireRole(...allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required before accessing protected resources.'
      });
      return;
    }

    const userRole = req.user.role;

    // Super Admin inherits all administrative permissions
    if (userRole === 'super_admin') {
      next();
      return;
    }

    // Direct role match
    if (allowedRoles.includes(userRole)) {
      next();
      return;
    }

    // Manager inheritance for staff-accessible endpoints
    if ((userRole === 'manager' || userRole === 'admin') && allowedRoles.includes('staff')) {
      next();
      return;
    }

    // Log unauthorized attempt to audit log
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
    AuditService.logEvent({
      event: 'unauthorized_access',
      user_id: req.user.id,
      email: req.user.email,
      ip_address: clientIp,
      status: 'failure',
      metadata: {
        path: req.originalUrl,
        method: req.method,
        required_roles: allowedRoles,
        actual_role: userRole
      }
    }).catch(() => {});

    res.status(403).json({
      success: false,
      error: `Access forbidden: Insufficient security clearance. Required role(s): [${allowedRoles.join(', ')}].`
    });
  };
}

/**
 * Convenience middleware requiring any administrative role
 */
export const requireAdmin = requireRole('super_admin', 'manager', 'staff', 'admin', 'investigator');

