import { Router } from 'express';
import { CaseController } from '../controllers/caseController';
import { authenticateToken, requireRole } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validationMiddleware';
import { createCaseSchema, updateCaseStatusSchema } from '../validators/caseValidators';

const router = Router();

// All case routes require authentication
router.use(authenticateToken);

router.get('/', CaseController.getCases);
router.get('/:id', CaseController.getCaseById);
router.post('/', validateBody(createCaseSchema), CaseController.createCase);
router.patch('/:id/status', requireRole('investigator', 'admin'), validateBody(updateCaseStatusSchema), CaseController.updateStatus);

export default router;
