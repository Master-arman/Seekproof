import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { AuditService } from '../services/auditService';
import { AuthenticatedRequest } from '../types';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
    try {
      const result = await AuthService.register(req.body);
      
      // Set secure HttpOnly cookie
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      await AuditService.logEvent({
        event: 'login_success',
        user_id: result.user.id,
        email: result.user.email,
        ip_address: clientIp,
        user_agent: req.headers['user-agent'],
        status: 'success',
        metadata: { action: 'register', role: result.user.role }
      });

      res.status(201).json({
        success: true,
        message: 'Account registered successfully.',
        data: result
      });
    } catch (error: any) {
      await AuditService.logEvent({
        event: 'login_failure',
        email: req.body?.email || 'unknown',
        ip_address: clientIp,
        user_agent: req.headers['user-agent'],
        status: 'failure',
        metadata: { action: 'register_fail', error: error.message }
      });

      res.status(400).json({
        success: false,
        error: error.message || 'Failed to register account'
      });
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
    try {
      const result = await AuthService.login(req.body);

      // Set secure HttpOnly cookie
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      await AuditService.logEvent({
        event: 'login_success',
        user_id: result.user.id,
        email: result.user.email,
        ip_address: clientIp,
        user_agent: req.headers['user-agent'],
        status: 'success',
        metadata: { role: result.user.role }
      });

      res.status(200).json({
        success: true,
        message: 'Authentication successful.',
        data: result
      });
    } catch (error: any) {
      await AuditService.logEvent({
        event: 'login_failure',
        email: req.body?.email || 'unknown',
        ip_address: clientIp,
        user_agent: req.headers['user-agent'],
        status: 'failure',
        metadata: { error: error.message }
      });

      res.status(401).json({
        success: false,
        error: error.message || 'Invalid credentials'
      });
    }
  }

  static async logout(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
    
    if (req.user) {
      await AuditService.logEvent({
        event: 'logout',
        user_id: req.user.id,
        email: req.user.email,
        ip_address: clientIp,
        status: 'success',
      });
    }

    // Clear authentication cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.status(200).json({
      success: true,
      message: 'Session terminated and credentials invalidated successfully.'
    });
  }

  static async getCurrentUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, error: 'Unauthorized' });
        return;
      }

      const user = await AuthService.findById(req.user.id);
      if (!user) {
        res.status(404).json({ success: false, error: 'User profile not found' });
        return;
      }

      res.status(200).json({
        success: true,
        data: { user }
      });
    } catch (error: any) {
      next(error);
    }
  }

  static async getAuditLogs(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const logs = await AuditService.getRecentLogs(100);
      res.status(200).json({
        success: true,
        data: logs
      });
    } catch (error: any) {
      next(error);
    }
  }
}
