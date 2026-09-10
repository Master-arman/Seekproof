import { z } from 'zod';

export const createCaseSchema = z.object({
  title: z.string().min(3, 'Case title must be at least 3 characters').max(200),
  description: z.string().min(10, 'Case description must be at least 10 characters'),
  case_type: z.enum([
    'corporate_fraud',
    'background_intelligence',
    'surveillance',
    'digital_forensics',
    'asset_recovery',
    'infidelity_marital',
    'counter_surveillance',
    'other'
  ]),
  priority: z.enum(['standard', 'high', 'urgent', 'critical']).default('standard'),
  confidentiality_level: z.enum(['confidential', 'secret', 'top_secret']).default('confidential'),
  target_subject: z.string().optional(),
  location: z.string().optional(),
  estimated_completion: z.string().optional()
});

export const updateCaseStatusSchema = z.object({
  status: z.enum([
    'inquiry',
    'under_review',
    'active_investigation',
    'evidence_gathering',
    'reporting',
    'closed'
  ]),
  progress_percentage: z.number().min(0).max(100).optional(),
  lead_investigator_id: z.string().uuid().optional()
});

export type CreateCaseInput = z.infer<typeof createCaseSchema>;
export type UpdateCaseStatusInput = z.infer<typeof updateCaseStatusSchema>;
