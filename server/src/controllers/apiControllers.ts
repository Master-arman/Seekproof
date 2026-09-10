import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { 
  ServicesService, 
  BlogService,
  LeadsService, 
  TestimonialsService, 
  ContactService, 
  SettingsService,
  AdminAuthService,
  AuditLogService 
} from '../services/dataService';

// ============================================================================
// 1. Auth Controller (/api/v1/auth)
// ============================================================================
export const AuthController = {
  async adminLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const admin = await AdminAuthService.findByEmail(email);

      if (!admin || !admin.password_hash) {
        res.status(401).json({
          success: false,
          error: 'Invalid administrative credentials or account inactive.'
        });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, admin.password_hash);
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          error: 'Invalid administrative credentials or account inactive.'
        });
        return;
      }

      await AdminAuthService.updateLastLogin(admin.id);

      // Audit Log for Admin Login
      await AuditLogService.log({
        adminId: admin.id,
        action: 'ADMIN_LOGIN_SUCCESS',
        entityType: 'AUTH',
        entityId: admin.id,
        ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip,
        userAgent: req.headers['user-agent']
      });

      const token = jwt.sign(
        { id: admin.id, email: admin.email, role: admin.role, name: admin.name },
        config.jwt.secret,
        { expiresIn: '7d' }
      );

      res.status(200).json({
        success: true,
        message: 'Administrative authentication successful.',
        data: {
          token,
          admin: {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: admin.role
          }
        }
      });
    } catch (err) {
      next(err);
    }
  },

  async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = (req as any).user;
      res.status(200).json({
        success: true,
        data: { user }
      });
    } catch (err) {
      next(err);
    }
  }
};

// ============================================================================
// 2. Services Controller (/api/v1/services)
// ============================================================================
export const ServicesController = {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const services = await ServicesService.getAll();
      res.status(200).json({
        success: true,
        count: services.length,
        data: services
      });
    } catch (err) {
      next(err);
    }
  },

  async getAllAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const services = await ServicesService.getAllAdmin();
      res.status(200).json({
        success: true,
        count: services.length,
        data: services
      });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      const service = await ServicesService.getById(id);
      if (!service) {
        res.status(404).json({
          success: false,
          error: `Investigation service #${id} was not found.`
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: service
      });
    } catch (err) {
      next(err);
    }
  },

  async getBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const slug = req.params.slug as string;
      const service = await ServicesService.getBySlug(slug);

      if (!service) {
        res.status(404).json({
          success: false,
          error: `Investigation service with slug '${slug}' was not found.`
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: service
      });
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const admin = (req as any).user;
      const result = await ServicesService.create({
        title: req.body.title,
        slug: req.body.slug,
        category: req.body.category,
        shortDescription: req.body.shortDescription,
        fullDescription: req.body.fullDescription,
        iconName: req.body.iconName,
        featuredImage: req.body.featuredImage,
        isFeatured: req.body.isFeatured,
        isActive: req.body.isActive,
        displayOrder: req.body.displayOrder,
        metaTitle: req.body.metaTitle,
        metaDescription: req.body.metaDescription
      });

      await AuditLogService.log({
        adminId: admin?.id,
        action: 'CREATE_SERVICE',
        entityType: 'SERVICE',
        entityId: result.id,
        ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip,
        userAgent: req.headers['user-agent']
      });

      res.status(201).json({
        success: true,
        message: 'Investigation service added to catalog successfully.',
        data: { id: result.id }
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const admin = (req as any).user;
      const id = parseInt(req.params.id as string, 10);
      const updateData: any = {};

      if (req.body.title !== undefined) updateData.title = req.body.title;
      if (req.body.slug !== undefined) updateData.slug = req.body.slug;
      if (req.body.category !== undefined) updateData.category = req.body.category;
      if (req.body.shortDescription !== undefined) updateData.short_description = req.body.shortDescription;
      if (req.body.fullDescription !== undefined) updateData.full_description = req.body.fullDescription;
      if (req.body.iconName !== undefined) updateData.icon_name = req.body.iconName;
      if (req.body.featuredImage !== undefined) updateData.featured_image = req.body.featuredImage;
      if (req.body.isFeatured !== undefined) updateData.is_featured = req.body.isFeatured;
      if (req.body.isActive !== undefined) updateData.is_active = req.body.isActive;
      if (req.body.displayOrder !== undefined) updateData.display_order = req.body.displayOrder;
      if (req.body.metaTitle !== undefined) updateData.meta_title = req.body.metaTitle;
      if (req.body.metaDescription !== undefined) updateData.meta_description = req.body.metaDescription;

      const success = await ServicesService.update(id, updateData);
      if (!success) {
        res.status(404).json({
          success: false,
          error: `Investigation service #${id} was not found.`
        });
        return;
      }

      await AuditLogService.log({
        adminId: admin?.id,
        action: 'UPDATE_SERVICE',
        entityType: 'SERVICE',
        entityId: id,
        ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip,
        userAgent: req.headers['user-agent']
      });

      const updated = await ServicesService.getById(id);
      res.status(200).json({
        success: true,
        message: 'Investigation service updated successfully.',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  },

  async toggleActive(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const admin = (req as any).user;
      const id = parseInt(req.params.id as string, 10);
      const success = await ServicesService.toggleActive(id);
      if (!success) {
        res.status(404).json({
          success: false,
          error: `Investigation service #${id} was not found.`
        });
        return;
      }

      const updated = await ServicesService.getById(id);

      await AuditLogService.log({
        adminId: admin?.id,
        action: updated?.is_active ? 'ACTIVATE_SERVICE' : 'DEACTIVATE_SERVICE',
        entityType: 'SERVICE',
        entityId: id,
        ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip,
        userAgent: req.headers['user-agent']
      });

      res.status(200).json({
        success: true,
        message: `Service #${id} is now ${updated?.is_active ? 'Active' : 'Deactivated'}.`,
        data: updated
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const admin = (req as any).user;
      const id = parseInt(req.params.id as string, 10);
      const success = await ServicesService.delete(id);
      if (!success) {
        res.status(404).json({
          success: false,
          error: `Investigation service #${id} was not found.`
        });
        return;
      }

      await AuditLogService.log({
        adminId: admin?.id,
        action: 'DELETE_SERVICE',
        entityType: 'SERVICE',
        entityId: id,
        ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip,
        userAgent: req.headers['user-agent']
      });

      res.status(200).json({
        success: true,
        message: `Investigation service #${id} record permanently removed.`
      });
    } catch (err) {
      next(err);
    }
  }
};

// ============================================================================
// 2.1 Blog Controller (/api/v1/blog & /api/v1/admin/blog)
// ============================================================================
export const BlogController = {
  async getPublished(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const posts = await BlogService.getPublished();
      res.status(200).json({
        success: true,
        count: posts.length,
        data: posts
      });
    } catch (err) {
      next(err);
    }
  },

  async getAllAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const posts = await BlogService.getAllAdmin();
      res.status(200).json({
        success: true,
        count: posts.length,
        data: posts
      });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      const post = await BlogService.getById(id);
      if (!post) {
        res.status(404).json({
          success: false,
          error: `Intelligence briefing #${id} was not found.`
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: post
      });
    } catch (err) {
      next(err);
    }
  },

  async getBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const slug = req.params.slug as string;
      const post = await BlogService.getBySlug(slug);
      if (!post) {
        res.status(404).json({
          success: false,
          error: `Intelligence briefing with slug '${slug}' was not found.`
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: post
      });
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const admin = (req as any).user;
      const result = await BlogService.create({
        title: req.body.title,
        slug: req.body.slug,
        category: req.body.category,
        excerpt: req.body.excerpt,
        content: req.body.content,
        featuredImage: req.body.featuredImage,
        authorName: req.body.authorName || admin?.name,
        authorId: admin?.id,
        readTime: req.body.readTime,
        status: req.body.status,
        metaTitle: req.body.metaTitle,
        metaDescription: req.body.metaDescription,
        publishedAt: req.body.publishedAt
      });

      await AuditLogService.log({
        adminId: admin?.id,
        action: 'CREATE_BLOG_POST',
        entityType: 'BLOG',
        entityId: result.id,
        ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip,
        userAgent: req.headers['user-agent']
      });

      res.status(201).json({
        success: true,
        message: 'Intelligence briefing created successfully.',
        data: { id: result.id }
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const admin = (req as any).user;
      const id = parseInt(req.params.id as string, 10);
      const updateData: any = {};

      if (req.body.title !== undefined) updateData.title = req.body.title;
      if (req.body.slug !== undefined) updateData.slug = req.body.slug;
      if (req.body.category !== undefined) updateData.category = req.body.category;
      if (req.body.excerpt !== undefined) updateData.excerpt = req.body.excerpt;
      if (req.body.content !== undefined) updateData.content = req.body.content;
      if (req.body.featuredImage !== undefined) updateData.featured_image = req.body.featuredImage;
      if (req.body.authorName !== undefined) updateData.author_name = req.body.authorName;
      if (req.body.readTime !== undefined) updateData.read_time = req.body.readTime;
      if (req.body.status !== undefined) updateData.status = req.body.status;
      if (req.body.metaTitle !== undefined) updateData.meta_title = req.body.metaTitle;
      if (req.body.metaDescription !== undefined) updateData.meta_description = req.body.metaDescription;
      if (req.body.publishedAt !== undefined) updateData.published_at = req.body.publishedAt ? new Date(req.body.publishedAt) : null;

      const success = await BlogService.update(id, updateData);
      if (!success) {
        res.status(404).json({
          success: false,
          error: `Intelligence briefing #${id} was not found.`
        });
        return;
      }

      await AuditLogService.log({
        adminId: admin?.id,
        action: 'UPDATE_BLOG_POST',
        entityType: 'BLOG',
        entityId: id,
        ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip,
        userAgent: req.headers['user-agent']
      });

      const updated = await BlogService.getById(id);
      res.status(200).json({
        success: true,
        message: 'Intelligence briefing updated successfully.',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const admin = (req as any).user;
      const id = parseInt(req.params.id as string, 10);
      const success = await BlogService.delete(id);
      if (!success) {
        res.status(404).json({
          success: false,
          error: `Intelligence briefing #${id} was not found.`
        });
        return;
      }

      await AuditLogService.log({
        adminId: admin?.id,
        action: 'DELETE_BLOG_POST',
        entityType: 'BLOG',
        entityId: id,
        ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip,
        userAgent: req.headers['user-agent']
      });

      res.status(200).json({
        success: true,
        message: `Intelligence briefing #${id} record permanently removed.`
      });
    } catch (err) {
      next(err);
    }
  }
};


// ============================================================================
// 3. Leads Controller (/api/v1/leads)
// ============================================================================
export const LeadsController = {
  /**
   * Public: Create a new consultation lead
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip;
      const userAgent = req.headers['user-agent'];

      const result = await LeadsService.create({
        fullName: req.body.fullName,
        phone: req.body.phone,
        email: req.body.email,
        city: req.body.city,
        serviceId: req.body.serviceId,
        serviceType: req.body.serviceType,
        preferredDate: req.body.preferredDate,
        preferredContactMethod: req.body.preferredContactMethod || 'phone',
        message: req.body.message,
        consentGiven: req.body.consentGiven,
        source: req.body.source || 'website',
        utm_source: req.body.utm_source || (req.query.utm_source as string),
        utm_medium: req.body.utm_medium || (req.query.utm_medium as string),
        utm_campaign: req.body.utm_campaign || (req.query.utm_campaign as string),
        ipAddress: clientIp,
        userAgent
      });

      // Generic success message to reduce information leakage
      res.status(201).json({
        success: true,
        message: 'Consultation request received securely under full NDA protection.',
        data: { 
          leadId: result.id,
          reference: `SP-2026-${result.id}`
        }
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: List all leads with optional filtering
   */
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const admin = (req as any).user;
      const { search, status, serviceId, startDate, endDate } = req.query;

      const filters: any = {};
      if (search && typeof search === 'string') filters.search = search;
      if (status && typeof status === 'string') filters.status = status;
      if (serviceId) filters.serviceId = parseInt(serviceId as string, 10);
      if (startDate && typeof startDate === 'string') filters.startDate = startDate;
      if (endDate && typeof endDate === 'string') filters.endDate = endDate;

      const leads = await LeadsService.getAll(Object.keys(filters).length > 0 ? filters : undefined);

      // Audit Log
      await AuditLogService.log({
        adminId: admin?.id,
        action: 'VIEW_LEADS_LIST',
        entityType: 'LEAD',
        ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip,
        userAgent: req.headers['user-agent']
      });

      res.status(200).json({
        success: true,
        count: leads.length,
        data: leads
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Get single lead details by ID
   */
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const admin = (req as any).user;
      const id = parseInt(req.params.id as string, 10);

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid lead ID parameter.'
        });
        return;
      }

      const lead = await LeadsService.getById(id);
      if (!lead) {
        res.status(404).json({
          success: false,
          error: `Lead record #${id} not found.`
        });
        return;
      }

      // Audit Log
      await AuditLogService.log({
        adminId: admin?.id,
        action: 'VIEW_LEAD_DETAIL',
        entityType: 'LEAD',
        entityId: id,
        ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip,
        userAgent: req.headers['user-agent']
      });

      res.status(200).json({
        success: true,
        data: lead
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Update lead status (New, Contacted, In Progress, Converted, Closed, Spam)
   */
  async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const admin = (req as any).user;
      const id = parseInt(req.params.id as string, 10);
      const { status } = req.body;

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid lead ID parameter.'
        });
        return;
      }

      // Normalize status capitalisation
      const statusMap: Record<string, string> = {
        'new': 'New',
        'contacted': 'Contacted',
        'in_progress': 'In Progress',
        'in progress': 'In Progress',
        'converted': 'Converted',
        'closed': 'Closed',
        'spam': 'Spam'
      };
      const normalizedStatus = statusMap[status.toLowerCase()] || status;

      const success = await LeadsService.updateStatus(id, normalizedStatus, admin?.id);
      if (!success) {
        res.status(404).json({
          success: false,
          error: `Lead record #${id} not found or update failed.`
        });
        return;
      }

      // Audit Log
      await AuditLogService.log({
        adminId: admin?.id,
        action: 'UPDATE_LEAD_STATUS',
        entityType: 'LEAD',
        entityId: id,
        ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip,
        userAgent: req.headers['user-agent']
      });

      res.status(200).json({
        success: true,
        message: `Lead #${id} status successfully updated to '${normalizedStatus}'.`,
        data: { id, status: normalizedStatus }
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Assign lead to staff member
   */
  async assignStaff(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const admin = (req as any).user;
      const id = parseInt(req.params.id as string, 10);
      const { assignedTo } = req.body;

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid lead ID parameter.'
        });
        return;
      }

      const staffId = assignedTo !== undefined && assignedTo !== null ? Number(assignedTo) : null;
      const success = await LeadsService.assignStaff(id, staffId);
      if (!success) {
        res.status(404).json({
          success: false,
          error: `Lead record #${id} not found.`
        });
        return;
      }

      // Audit Log
      await AuditLogService.log({
        adminId: admin?.id,
        action: staffId ? `ASSIGN_LEAD_STAFF_${staffId}` : 'UNASSIGN_LEAD_STAFF',
        entityType: 'LEAD',
        entityId: id,
        ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip,
        userAgent: req.headers['user-agent']
      });

      const updatedLead = await LeadsService.getById(id);

      res.status(200).json({
        success: true,
        message: staffId ? `Lead #${id} assigned to staff member.` : `Lead #${id} unassigned.`,
        data: updatedLead
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Add internal note to lead
   */
  async addNote(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const admin = (req as any).user;
      const id = parseInt(req.params.id as string, 10);
      const { note } = req.body;

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid lead ID parameter.'
        });
        return;
      }

      const lead = await LeadsService.getById(id);
      if (!lead) {
        res.status(404).json({
          success: false,
          error: `Lead record #${id} not found.`
        });
        return;
      }

      const adminName = admin?.name || 'Intelligence Officer';
      const createdNote = await LeadsService.addNote(id, admin?.id || null, adminName, note);

      // Audit Log
      await AuditLogService.log({
        adminId: admin?.id,
        action: 'ADD_LEAD_INTERNAL_NOTE',
        entityType: 'LEAD',
        entityId: id,
        ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip,
        userAgent: req.headers['user-agent']
      });

      res.status(201).json({
        success: true,
        message: 'Internal confidential note added to lead dossier.',
        data: createdNote
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Export leads dataset (CSV or JSON)
   */
  async exportLeads(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const admin = (req as any).user;
      const { format = 'csv', search, status, serviceId, startDate, endDate } = req.query;

      const filters: any = {};
      if (search && typeof search === 'string') filters.search = search;
      if (status && typeof status === 'string') filters.status = status;
      if (serviceId) filters.serviceId = parseInt(serviceId as string, 10);
      if (startDate && typeof startDate === 'string') filters.startDate = startDate;
      if (endDate && typeof endDate === 'string') filters.endDate = endDate;

      const leads = await LeadsService.getAll(Object.keys(filters).length > 0 ? filters : undefined);

      // Audit Log
      await AuditLogService.log({
        adminId: admin?.id,
        action: 'EXPORT_LEADS_DATASET',
        entityType: 'LEAD',
        ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip,
        userAgent: req.headers['user-agent']
      });

      if (format === 'json') {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename=seekproof-leads-export-${new Date().toISOString().split('T')[0]}.json`);
        res.status(200).json(leads);
        return;
      }

      // Build CSV
      const headers = ['ID', 'Full Name', 'Email', 'Phone', 'City', 'Service', 'Preferred Contact', 'Preferred Date', 'Status', 'Assigned To', 'Source', 'Campaign', 'Created At'];
      const escapeCsv = (str: any) => {
        if (str === null || str === undefined) return '""';
        const stringVal = String(str).replace(/"/g, '""');
        return `"${stringVal}"`;
      };

      const rows = leads.map(l => [
        l.id,
        escapeCsv(l.full_name),
        escapeCsv(l.email),
        escapeCsv(l.phone),
        escapeCsv(l.city || ''),
        escapeCsv(l.service_type || ''),
        escapeCsv(l.preferred_contact_method || ''),
        escapeCsv(l.preferred_date || ''),
        escapeCsv(l.status),
        escapeCsv(l.assigned_admin_name || 'Unassigned'),
        escapeCsv(l.source || ''),
        escapeCsv(l.utm_campaign || ''),
        escapeCsv(new Date(l.created_at).toISOString())
      ].join(','));

      const csvContent = [headers.join(','), ...rows].join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=seekproof-leads-export-${new Date().toISOString().split('T')[0]}.csv`);
      res.status(200).send(csvContent);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin: Delete or archive lead
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const admin = (req as any).user;
      const id = parseInt(req.params.id as string, 10);

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid lead ID parameter.'
        });
        return;
      }

      const success = await LeadsService.delete(id);
      if (!success) {
        res.status(404).json({
          success: false,
          error: `Lead record #${id} not found.`
        });
        return;
      }

      // Audit Log
      await AuditLogService.log({
        adminId: admin?.id,
        action: 'DELETE_LEAD',
        entityType: 'LEAD',
        entityId: id,
        ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip,
        userAgent: req.headers['user-agent']
      });

      res.status(200).json({
        success: true,
        message: `Lead #${id} record permanently removed.`
      });
    } catch (err) {
      next(err);
    }
  }
};

// ============================================================================
// 4. Testimonials Controller (/api/v1/testimonials)
// ============================================================================
export const TestimonialsController = {
  async getPublished(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const testimonials = await TestimonialsService.getPublished();
      res.status(200).json({
        success: true,
        count: testimonials.length,
        data: testimonials
      });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const testimonials = await TestimonialsService.getAll();
      
      const admin = (req as any).user;
      if (admin) {
        await AuditLogService.log({
          adminId: admin.id,
          action: 'VIEW_TESTIMONIALS_LIST',
          entityType: 'TESTIMONIAL',
          ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip,
          userAgent: req.headers['user-agent']
        });
      }

      res.status(200).json({
        success: true,
        count: testimonials.length,
        data: testimonials
      });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      const testimonial = await TestimonialsService.getById(id);
      if (!testimonial) {
        res.status(404).json({
          success: false,
          error: 'Testimonial record not found.'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: testimonial
      });
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await TestimonialsService.create({
        clientName: req.body.clientName || req.body.client_name,
        designation: req.body.designation,
        testimonialText: req.body.testimonialText || req.body.testimonial_text,
        rating: req.body.rating,
        imageUrl: req.body.imageUrl || req.body.image_url,
        isPublished: req.body.isPublished !== undefined ? req.body.isPublished : (req.body.is_published !== undefined ? req.body.is_published : false),
        displayOrder: req.body.displayOrder || req.body.display_order
      });

      const admin = (req as any).user;
      if (admin) {
        await AuditLogService.log({
          adminId: admin.id,
          action: 'CREATE_TESTIMONIAL',
          entityType: 'TESTIMONIAL',
          entityId: result.id,
          ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip,
          userAgent: req.headers['user-agent']
        });
      }

      res.status(201).json({
        success: true,
        message: 'Testimonial created successfully.',
        data: { id: result.id }
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      const updateData: any = {};
      if (req.body.clientName !== undefined) updateData.client_name = req.body.clientName;
      if (req.body.client_name !== undefined) updateData.client_name = req.body.client_name;
      if (req.body.designation !== undefined) updateData.designation = req.body.designation;
      if (req.body.testimonialText !== undefined) updateData.testimonial_text = req.body.testimonialText;
      if (req.body.testimonial_text !== undefined) updateData.testimonial_text = req.body.testimonial_text;
      if (req.body.rating !== undefined) updateData.rating = req.body.rating;
      if (req.body.imageUrl !== undefined) updateData.image_url = req.body.imageUrl;
      if (req.body.image_url !== undefined) updateData.image_url = req.body.image_url;
      if (req.body.isPublished !== undefined) updateData.is_published = req.body.isPublished;
      if (req.body.is_published !== undefined) updateData.is_published = req.body.is_published;
      if (req.body.displayOrder !== undefined) updateData.display_order = req.body.displayOrder;
      if (req.body.display_order !== undefined) updateData.display_order = req.body.display_order;

      const success = await TestimonialsService.update(id, updateData);
      if (!success) {
        res.status(404).json({
          success: false,
          error: 'Testimonial record not found.'
        });
        return;
      }

      const updated = await TestimonialsService.getById(id);

      const admin = (req as any).user;
      if (admin) {
        await AuditLogService.log({
          adminId: admin.id,
          action: updateData.is_published !== undefined ? (updateData.is_published ? 'PUBLISH_TESTIMONIAL' : 'UNPUBLISH_TESTIMONIAL') : 'UPDATE_TESTIMONIAL',
          entityType: 'TESTIMONIAL',
          entityId: id,
          ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip,
          userAgent: req.headers['user-agent']
        });
      }

      res.status(200).json({
        success: true,
        message: 'Testimonial updated successfully.',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      const success = await TestimonialsService.delete(id);
      if (!success) {
        res.status(404).json({
          success: false,
          error: 'Testimonial record not found.'
        });
        return;
      }

      const admin = (req as any).user;
      if (admin) {
        await AuditLogService.log({
          adminId: admin.id,
          action: 'DELETE_TESTIMONIAL',
          entityType: 'TESTIMONIAL',
          entityId: id,
          ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip,
          userAgent: req.headers['user-agent']
        });
      }

      res.status(200).json({
        success: true,
        message: `Testimonial #${id} record permanently removed.`
      });
    } catch (err) {
      next(err);
    }
  }
};

// ============================================================================
// 5. Contact Messages Controller (/api/v1/contact)
// ============================================================================
export const ContactController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await ContactService.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        subject: req.body.subject,
        message: req.body.message
      });

      res.status(201).json({
        success: true,
        message: 'Inquiry received securely. A case officer will respond via encrypted channel.',
        data: { messageId: result.id }
      });
    } catch (err) {
      next(err);
    }
  }
};

// ============================================================================
// 6. Site Settings Controller (/api/v1/settings)
// ============================================================================
export const SettingsController = {
  async getPublicSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const settings = await SettingsService.getPublicSettings();
      res.status(200).json({
        success: true,
        data: settings
      });
    } catch (err) {
      next(err);
    }
  }
};

// ============================================================================
// 8. Admin & Audit Controller (/api/v1/admin)
// ============================================================================
export const AdminController = {
  async getStaffList(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const staff = await AdminAuthService.getAllStaff();
      res.status(200).json({
        success: true,
        count: staff.length,
        data: staff
      });
    } catch (err) {
      next(err);
    }
  },

  async getAuditLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const logs = await AuditLogService.getAll();
      res.status(200).json({
        success: true,
        data: logs
      });
    } catch (err) {
      next(err);
    }
  },

  async getOverview(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const leads = await LeadsService.getAll();
      const auditLogs = await AuditLogService.getAll();
      const services = await ServicesService.getAll();
      const contactMessages = await ContactService.getAll();

      const newLeads = leads.filter(l => l.status === 'New');
      const inProgressLeads = leads.filter(l => l.status === 'In Progress');
      const convertedLeads = leads.filter(l => l.status === 'Converted');
      const contactedLeads = leads.filter(l => l.status === 'Contacted');
      const closedLeads = leads.filter(l => l.status === 'Closed');
      const spamLeads = leads.filter(l => l.status === 'Spam');
      const publishedServices = services.filter(s => s.is_active);

      res.status(200).json({
        success: true,
        data: {
          metrics: {
            new_leads: newLeads.length,
            total_leads: leads.length,
            in_progress_leads: inProgressLeads.length,
            converted_leads: convertedLeads.length,
            contact_messages: contactMessages.length,
            published_services: publishedServices.length,
            contacted_leads: contactedLeads.length,
            closed_leads: closedLeads.length,
            spam_leads: spamLeads.length,
            total_services: services.length
          },
          recent_leads: leads.slice(0, 10),
          recent_audit_logs: auditLogs.slice(0, 10)
        }
      });
    } catch (err) {
      next(err);
    }
  }
};

// ============================================================================
// 9. Health Controller (/api/v1/health)
// ============================================================================
export const HealthController = {
  async check(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      success: true,
      status: 'operational',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      api: {
        name: 'SeekProof Private Intelligence Suite',
        version: '1.0.0',
        environment: config.env
      },
      security: {
        rateLimiting: 'active',
        helmetProtection: 'active',
        encryptionStandard: 'AES-256-GCM / SHA-256'
      }
    });
  }
};


