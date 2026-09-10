import { z } from 'zod';

export const createInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address format'),
  phone: z.string().min(6, 'Valid phone number is required'),
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
  service_requested: z.string().min(2, 'Service description is required'),
  description: z.string().min(15, 'Please provide sufficient confidential details (at least 15 characters)'),
  urgency: z.enum(['routine', 'time_sensitive', 'immediate_threat']).default('routine'),
});

export const updateInquiryStatusSchema = z.object({
  status: z.enum(['pending', 'reviewed', 'converted_to_case', 'declined']),
});

export type CreateInquiryInput = z.infer<typeof createInquirySchema>;
export type UpdateInquiryStatusInput = z.infer<typeof updateInquiryStatusSchema>;
