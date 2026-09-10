import { Router } from 'express';
import { 
  AuthController, 
  ServicesController, 
  BlogController,
  LeadsController, 
  TestimonialsController, 
  ContactController, 
  SettingsController, 
  HealthController,
  AdminController 
} from '../controllers/apiControllers';
import { validate } from '../middleware/validationMiddleware';
import { authenticateToken, requireRole } from '../middleware/authMiddleware';
import { submissionLimiter, authLimiter } from '../middleware/rateLimiter';
import { 
  createLeadSchema, 
  updateLeadStatusSchema,
  assignLeadSchema,
  addLeadNoteSchema,
  createServiceSchema,
  updateServiceSchema,
  createBlogPostSchema,
  updateBlogPostSchema,
  createContactMessageSchema, 
  adminLoginSchema,
  createTestimonialSchema,
  updateTestimonialSchema
} from '../validators/apiValidators';

const router = Router();

// 1. Health-check Endpoint
router.get('/health', HealthController.check);

// 2. Authentication Routes (/api/v1/auth)
router.post('/auth/login', authLimiter, validate(adminLoginSchema), AuthController.adminLogin);
router.get('/auth/me', authenticateToken, AuthController.getMe);

// 3. Services Routes (/api/v1/services & /api/v1/admin/services)
router.get('/services', ServicesController.getAll);
router.get('/services/:slug', ServicesController.getBySlug);
router.get('/admin/services', authenticateToken, requireRole('staff', 'manager', 'admin'), ServicesController.getAllAdmin);
router.get('/admin/services/:id', authenticateToken, requireRole('staff', 'manager', 'admin'), ServicesController.getById);
router.post('/admin/services', authenticateToken, requireRole('manager', 'admin'), validate(createServiceSchema), ServicesController.create);
router.patch('/admin/services/:id', authenticateToken, requireRole('manager', 'admin'), validate(updateServiceSchema), ServicesController.update);
router.patch('/admin/services/:id/toggle-active', authenticateToken, requireRole('manager', 'admin'), ServicesController.toggleActive);
router.delete('/admin/services/:id', authenticateToken, requireRole('super_admin', 'manager'), ServicesController.delete);

// 3.1 Blog Routes (/api/v1/blog & /api/v1/admin/blog)
router.get('/blog', BlogController.getPublished);
router.get('/blog/:slug', BlogController.getBySlug);
router.get('/admin/blog', authenticateToken, requireRole('staff', 'manager', 'admin'), BlogController.getAllAdmin);
router.get('/admin/blog/:id', authenticateToken, requireRole('staff', 'manager', 'admin'), BlogController.getById);
router.post('/admin/blog', authenticateToken, requireRole('manager', 'admin'), validate(createBlogPostSchema), BlogController.create);
router.patch('/admin/blog/:id', authenticateToken, requireRole('manager', 'admin'), validate(updateBlogPostSchema), BlogController.update);
router.delete('/admin/blog/:id', authenticateToken, requireRole('super_admin', 'manager'), BlogController.delete);

// 4. Leads Management Routes (/api/v1/leads)
router.post('/leads', submissionLimiter, validate(createLeadSchema), LeadsController.create);
router.get('/leads/export', authenticateToken, requireRole('staff', 'manager', 'admin'), LeadsController.exportLeads);
router.get('/leads', authenticateToken, requireRole('staff', 'manager', 'admin'), LeadsController.getAll);
router.get('/leads/:id', authenticateToken, requireRole('staff', 'manager', 'admin'), LeadsController.getById);
router.patch('/leads/:id/status', authenticateToken, requireRole('manager', 'admin'), validate(updateLeadStatusSchema), LeadsController.updateStatus);
router.patch('/leads/:id/assign', authenticateToken, requireRole('manager', 'admin'), validate(assignLeadSchema), LeadsController.assignStaff);
router.post('/leads/:id/notes', authenticateToken, requireRole('staff', 'manager', 'admin'), validate(addLeadNoteSchema), LeadsController.addNote);
router.delete('/leads/:id', authenticateToken, requireRole('super_admin'), LeadsController.delete);

// 5. Testimonials Routes (/api/v1/testimonials)
router.get('/testimonials', TestimonialsController.getPublished);
router.get('/admin/testimonials', authenticateToken, requireRole('staff', 'manager', 'admin'), TestimonialsController.getAll);
router.get('/admin/testimonials/:id', authenticateToken, requireRole('staff', 'manager', 'admin'), TestimonialsController.getById);
router.post('/admin/testimonials', authenticateToken, requireRole('manager', 'admin'), validate(createTestimonialSchema), TestimonialsController.create);
router.patch('/admin/testimonials/:id', authenticateToken, requireRole('manager', 'admin'), validate(updateTestimonialSchema), TestimonialsController.update);
router.delete('/admin/testimonials/:id', authenticateToken, requireRole('super_admin', 'manager'), TestimonialsController.delete);

// 6. Contact Messages Routes (/api/v1/contact)
router.post('/contact', submissionLimiter, validate(createContactMessageSchema), ContactController.create);

// 7. Site Settings Routes (/api/v1/settings)
router.get('/settings', SettingsController.getPublicSettings);

// 8. Admin Audit Logs, Staff & Overview Routes (/api/v1/admin)
router.get('/admin/overview', authenticateToken, requireRole('staff', 'manager', 'admin'), AdminController.getOverview);
router.get('/admin/staff', authenticateToken, requireRole('staff', 'manager', 'admin'), AdminController.getStaffList);
router.get('/admin/audit-logs', authenticateToken, requireRole('super_admin'), AdminController.getAuditLogs);

export default router;


