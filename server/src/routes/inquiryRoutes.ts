import { Router } from 'express';
import { InquiryController } from '../controllers/inquiryController';
import { authenticateToken, requireRole } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validationMiddleware';
import { inquiryLimiter } from '../middleware/rateLimiter';
import { createInquirySchema, updateInquiryStatusSchema } from '../validators/inquiryValidators';

const router = Router();

// Public consultation inquiry submission (rate limited & validated)
router.post('/', inquiryLimiter, validateBody(createInquirySchema), InquiryController.createInquiry);

// Staff, Manager, Admin, and Investigator can view inbound leads/inquiries
router.get('/', authenticateToken, requireRole('staff', 'manager', 'admin', 'investigator'), InquiryController.getInquiries);

// Manager, Admin, and Super Admin can triage & modify lead status
router.patch('/:id/status', authenticateToken, requireRole('manager', 'admin', 'investigator'), validateBody(updateInquiryStatusSchema), InquiryController.updateStatus);

export default router;
