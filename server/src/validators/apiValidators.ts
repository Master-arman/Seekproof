import { z } from 'zod';

// Helper to sanitize strings by stripping potential script tags and trimming
const sanitize = (val: string) => val.trim().replace(/[<>]/g, '');

// Lead / Consultation Submission Schema
export const createLeadSchema = z.preprocess((input: any) => {
  if (typeof input !== 'object' || input === null) return input;
  return {
    ...input,
    fullName: input.fullName || input.full_name || input.name,
    phone: input.phone,
    email: input.email,
    city: input.city,
    serviceId: input.serviceId || input.service_id,
    serviceType: input.serviceType || input.service_type,
    preferredDate: input.preferredDate || input.preferred_date,
    preferredContactMethod: input.preferredContactMethod || input.preferred_contact_method || 'phone',
    message: input.message || input.requirement || input.notes,
    consentGiven: input.consentGiven !== undefined ? input.consentGiven : (input.consent !== undefined ? input.consent : false),
    source: input.source || input.source_page || input.sourcePage || 'website',
    utm_source: input.utm_source || input.utmSource,
    utm_medium: input.utm_medium || input.utmMedium,
    utm_campaign: input.utm_campaign || input.utmCampaign,
    utm_term: input.utm_term || input.utmTerm
  };
}, z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(255).transform(sanitize),
  phone: z.string().min(7, 'Phone number must be at least 7 digits').max(50).transform(sanitize),
  email: z.string().email('Invalid email address').max(255).transform(sanitize),
  city: z.string().max(100).optional().transform((v?: string) => (v ? sanitize(v) : undefined)),
  serviceId: z.number().int().positive().optional(),
  serviceType: z.string().max(255).optional().transform((v?: string) => (v ? sanitize(v) : undefined)),
  preferredDate: z.string().max(50).optional().transform((v?: string) => (v ? sanitize(v) : undefined)),
  preferredContactMethod: z.string().max(50).default('phone').transform(sanitize),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000).transform(sanitize),
  consentGiven: z.boolean().refine((val: boolean) => val === true, {
    message: 'You must consent to confidential data processing'
  }),
  source: z.string().max(100).default('website').transform(sanitize),
  utm_source: z.string().max(100).optional().transform((v?: string) => (v ? sanitize(v) : undefined)),
  utm_medium: z.string().max(100).optional().transform((v?: string) => (v ? sanitize(v) : undefined)),
  utm_campaign: z.string().max(100).optional().transform((v?: string) => (v ? sanitize(v) : undefined)),
  utm_term: z.string().max(100).optional().transform((v?: string) => (v ? sanitize(v) : undefined))
}));

// Update Lead Status Schema
export const updateLeadStatusSchema = z.object({
  status: z.enum([
    'New',
    'Contacted',
    'In Progress',
    'Converted',
    'Closed',
    'Spam',
    'new',
    'contacted',
    'in_progress',
    'converted',
    'closed',
    'spam'
  ], {
    errorMap: () => ({ message: 'Status must be one of: New, Contacted, In Progress, Converted, Closed, Spam' })
  })
});

// Contact Message Schema
export const createContactMessageSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255).transform(sanitize),
  email: z.string().email('Invalid email address').max(255).transform(sanitize),
  phone: z.string().max(50).optional().transform((v?: string) => (v ? sanitize(v) : undefined)),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(255).transform(sanitize),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000).transform(sanitize),
  consent: z.boolean().optional(),
  consentGiven: z.boolean().optional()
});

// Service Schema
export const createServiceSchema = z.object({
  title: z.string().min(2).max(255),
  slug: z.string().min(2).max(255),
  category: z.string().max(100).optional(),
  shortDescription: z.string().min(5).max(500),
  fullDescription: z.string().min(10),
  iconName: z.string().max(100).optional().nullable(),
  featuredImage: z.string().max(500).optional().nullable(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
  metaTitle: z.string().max(255).optional().nullable(),
  metaDescription: z.string().max(500).optional().nullable()
});

export const updateServiceSchema = z.object({
  title: z.string().min(2).max(255).optional(),
  slug: z.string().min(2).max(255).optional(),
  category: z.string().max(100).optional(),
  shortDescription: z.string().min(5).max(500).optional(),
  fullDescription: z.string().min(10).optional(),
  iconName: z.string().max(100).optional().nullable(),
  featuredImage: z.string().max(500).optional().nullable(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
  metaTitle: z.string().max(255).optional().nullable(),
  metaDescription: z.string().max(500).optional().nullable()
});

// Testimonial Schema
export const createTestimonialSchema = z.object({
  clientName: z.string().min(2).max(255),
  designation: z.string().max(255).optional(),
  testimonialText: z.string().min(10),
  rating: z.number().int().min(1).max(5).default(5),
  imageUrl: z.string().url().max(500).optional().nullable(),
  isPublished: z.boolean().default(false),
  displayOrder: z.number().int().default(0)
});

export const updateTestimonialSchema = z.object({
  clientName: z.string().min(2).max(255).optional(),
  designation: z.string().max(255).optional(),
  testimonialText: z.string().min(10).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  imageUrl: z.string().url().max(500).optional().nullable(),
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().optional()
});

// Blog Post Schema
export const createBlogPostSchema = z.object({
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  category: z.string().max(100).optional(),
  excerpt: z.string().min(10).max(500),
  content: z.string().min(20),
  featuredImage: z.string().max(500).optional().nullable(),
  authorName: z.string().max(100).optional(),
  readTime: z.string().max(50).optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  metaTitle: z.string().max(255).optional().nullable(),
  metaDescription: z.string().max(500).optional().nullable(),
  publishedAt: z.string().optional().nullable()
});

export const updateBlogPostSchema = z.object({
  title: z.string().min(3).max(255).optional(),
  slug: z.string().min(3).max(255).optional(),
  category: z.string().max(100).optional(),
  excerpt: z.string().min(10).max(500).optional(),
  content: z.string().min(20).optional(),
  featuredImage: z.string().max(500).optional().nullable(),
  authorName: z.string().max(100).optional(),
  readTime: z.string().max(50).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  metaTitle: z.string().max(255).optional().nullable(),
  metaDescription: z.string().max(500).optional().nullable(),
  publishedAt: z.string().optional().nullable()
});


// Admin Login Schema
export const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

// Assign Lead Schema
export const assignLeadSchema = z.object({
  assignedTo: z.number().int().positive().nullable()
});

// Add Lead Internal Note Schema
export const addLeadNoteSchema = z.object({
  note: z.string().min(1, 'Internal note cannot be empty').max(3000).transform(sanitize)
});
