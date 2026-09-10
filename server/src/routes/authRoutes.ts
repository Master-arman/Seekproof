import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticateToken, requireRole } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validationMiddleware';
import { authLimiter } from '../middleware/rateLimiter';
import { registerSchema, loginSchema } from '../validators/authValidators';

const router = Router();

// Standard Client & Admin Registration / Authentication
router.post('/register', authLimiter, validateBody(registerSchema), AuthController.register);
router.post('/login', authLimiter, validateBody(loginSchema), AuthController.login);
router.post('/admin/login', authLimiter, validateBody(loginSchema), AuthController.login);
router.post('/logout', authenticateToken, AuthController.logout);

// Current User Profile Verification
router.get('/me', authenticateToken, AuthController.getCurrentUser);

// Security Audit Logs (Super Admin Clearance Only)
router.get('/audit-logs', authenticateToken, requireRole('super_admin'), AuthController.getAuditLogs);

export default router;

