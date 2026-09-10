import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Send, 
  LockKeyhole, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MessageCircle 
} from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { PrimaryButton } from '../ui/button';
import { Alert } from '../ui/alert';
import { leadService } from '../../services/leadService';
import { cn } from '../../lib/utils';

// Indian phone number regex: accepts optional +91, followed by 10 digits starting with 6, 7, 8, or 9
const INDIAN_PHONE_REGEX = /^(?:\+91[\-\s]?)?[6-9]\d{9}$/;

// Input sanitization helper
function sanitizeText(value: string): string {
  if (!value) return '';
  return value
    .trim()
    .replace(/[<>]/g, '') // Strip basic HTML tags
    .slice(0, 5000);
}

// Zod Schema for Free Consultation Form
export const freeConsultationSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters')
    .transform(sanitizeText),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(INDIAN_PHONE_REGEX, 'Please enter a valid Indian mobile number (e.g. +91 9876543210 or 9876543210)'),
  email: z
    .string()
    .email('Please enter a valid confidential email address')
    .max(255, 'Email is too long')
    .transform(sanitizeText),
  city: z
    .string()
    .min(2, 'City is required')
    .max(100)
    .transform(sanitizeText),
  serviceType: z
    .string()
    .min(1, 'Please select the primary investigation service required'),
  preferredContactMethod: z
    .enum(['phone', 'email', 'whatsapp', 'encrypted_portal'], {
      errorMap: () => ({ message: 'Please select a preferred contact method' })
    })
    .default('phone'),
  preferredDate: z
    .string()
    .optional(),
  message: z
    .string()
    .min(10, 'Requirement description must be at least 10 characters')
    .max(1000, 'Description cannot exceed 1000 characters')
    .transform(sanitizeText),
  consentGiven: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must consent to confidential data handling under NDA'
    }),
  // Honeypot field for anti-spam
  website_hp: z.string().max(0, 'Spam detected').optional()
});

export type FreeConsultationFormValues = z.infer<typeof freeConsultationSchema>;

// Standard operational services options
const SERVICE_OPTIONS = [
  'Corporate Fraud & Internal Embezzlement',
  'Digital Forensics & Incident Response',
  'TSCM Bug Sweeps & Counter-Surveillance',
  'Cross-Border Asset Tracing & Recovery',
  'Pre-Matrimonial Background Investigation',
  'Post-Matrimonial & Infidelity Inquiries',
  'Missing Persons & Locating',
  'Personal Investigation & Character Checks',
  'Lady Detective Specialized Operations',
  'Background Checks & Personnel Vetting',
  'Identity & Credential Authentication',
  'Forensic Analysis & Litigation Support',
  'Bespoke Multi-Disciplinary Mandate'
];

// Major Indian cities for quick selection
const POPULAR_CITIES = [
  'Mumbai',
  'Delhi NCR',
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Chandigarh',
  'Jaipur',
  'Other / International'
];

export interface FreeConsultationFormProps {
  initialService?: string;
  source?: string;
  className?: string;
}

export function FreeConsultationForm({
  initialService,
  source = 'free_consultation_page',
  className
}: FreeConsultationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{ message: string; leadId?: number } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const todayDate = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<FreeConsultationFormValues>({
    resolver: zodResolver(freeConsultationSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      city: 'Delhi NCR',
      serviceType: initialService || 'Corporate Fraud & Internal Embezzlement',
      preferredContactMethod: 'phone',
      preferredDate: todayDate,
      message: '',
      consentGiven: false,
      website_hp: ''
    }
  });

  const messageVal = watch('message') || '';

  const onSubmit = async (data: FreeConsultationFormValues) => {
    // Check honeypot
    if (data.website_hp && data.website_hp.length > 0) {
      return; // Silent reject for spam bots
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const response = await leadService.submitLead({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        city: data.city,
        serviceType: data.serviceType,
        preferredDate: data.preferredDate,
        preferredContactMethod: data.preferredContactMethod,
        message: data.message,
        consentGiven: data.consentGiven,
        source
      });

      setSubmitSuccess({
        message: response.message || 'Consultation request securely received. A Senior Case Officer will contact you within 2 hours.',
        leadId: response.leadId
      });

      // Reset form on success
      reset();
    } catch (err: any) {
      setSubmitError(err.message || 'Secure transmission error. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* 1. Privacy & Evidence Safeguard Notice */}
      <div 
        className="p-4 rounded-md bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-1.5 flex items-start gap-3"
        role="region"
        aria-label="Confidentiality and Evidence Notice"
      >
        <LockKeyhole className="h-5 w-5 text-amber-800 shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2} />
        <div className="space-y-1">
          <span className="font-bold font-mono uppercase tracking-wider text-amber-900 block">
            Evidence Submission Notice:
          </span>
          <p className="text-slate-700 leading-relaxed text-[11px] sm:text-xs">
            Do <strong>not</strong> submit highly sensitive evidence, passwords, financial account credentials, or proprietary documents through this public form. All case documents are exchanged via our 256-bit encrypted PGP channel following initial intake and mutual NDA execution.
          </p>
        </div>
      </div>

      {/* 2. Success Banner */}
      {submitSuccess && (
        <div 
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="p-6 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3"
        >
          <div className="flex items-center gap-2.5 text-emerald-800">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" aria-hidden="true" strokeWidth={2} />
            <h4 className="text-base font-bold font-mono">
              Confidential Scoping Brief Received
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {submitSuccess.message}
          </p>
          {submitSuccess.leadId && (
            <div className="font-mono text-xs text-emerald-800 font-semibold bg-emerald-100/70 px-3 py-1.5 rounded-sm inline-block">
              Case Inquiry Reference: <span className="font-bold">#SP-2026-{submitSuccess.leadId}</span>
            </div>
          )}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setSubmitSuccess(null)}
              className="text-xs font-mono font-bold text-emerald-800 underline hover:no-underline cursor-pointer"
            >
              Submit another inquiry
            </button>
          </div>
        </div>
      )}

      {/* 3. Error Banner */}
      {submitError && (
        <Alert variant="destructive" title="Transmission Failed">
          {submitError}
        </Alert>
      )}

      {/* 4. Main Consultation Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        
        {/* Honeypot field (hidden from view and assistive tech) */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          style={{ display: 'none', position: 'absolute', left: '-9999px' }}
          aria-hidden="true"
          {...register('website_hp')}
        />

        {/* Row 1: Full Name & Mobile Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="consultation-fullName"
            label="Full Name / Representative"
            placeholder="e.g. Vikram Malhotra"
            error={errors.fullName?.message}
            aria-required="true"
            aria-invalid={!!errors.fullName}
            {...register('fullName')}
          />

          <Input
            id="consultation-phone"
            label="Mobile Number (India: +91)"
            placeholder="+91 98765 43210"
            error={errors.phone?.message}
            aria-required="true"
            aria-invalid={!!errors.phone}
            {...register('phone')}
          />
        </div>

        {/* Row 2: Email & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="consultation-email"
            label="Confidential Email Address"
            type="email"
            placeholder="v.malhotra@enterprise.com"
            error={errors.email?.message}
            aria-required="true"
            aria-invalid={!!errors.email}
            {...register('email')}
          />

          <div className="space-y-1.5">
            <label 
              htmlFor="consultation-city" 
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Location / City
            </label>
            <select
              id="consultation-city"
              className={cn(
                'flex h-10 w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0F1E2E]',
                errors.city ? 'border-red-500' : ''
              )}
              aria-invalid={!!errors.city}
              {...register('city')}
            >
              {POPULAR_CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.city && (
              <p role="alert" className="text-xs text-red-600 font-medium">
                {errors.city.message}
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Service Type & Preferred Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label 
              htmlFor="consultation-serviceType" 
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Investigation Discipline
            </label>
            <select
              id="consultation-serviceType"
              className={cn(
                'flex h-10 w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0F1E2E]',
                errors.serviceType ? 'border-red-500' : ''
              )}
              aria-invalid={!!errors.serviceType}
              {...register('serviceType')}
            >
              {SERVICE_OPTIONS.map((srv) => (
                <option key={srv} value={srv}>
                  {srv}
                </option>
              ))}
            </select>
            {errors.serviceType && (
              <p role="alert" className="text-xs text-red-600 font-medium">
                {errors.serviceType.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label 
              htmlFor="consultation-date" 
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Preferred Consultation Date
            </label>
            <input
              type="date"
              id="consultation-date"
              min={todayDate}
              className="flex h-10 w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0F1E2E]"
              {...register('preferredDate')}
            />
          </div>
        </div>

        {/* Row 4: Preferred Contact Method */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Preferred Encrypted Contact Channel
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {[
              { label: 'Phone Call', value: 'phone', icon: Phone },
              { label: 'WhatsApp', value: 'whatsapp', icon: MessageCircle },
              { label: 'Email', value: 'email', icon: Mail },
              { label: 'Secure Portal', value: 'encrypted_portal', icon: LockKeyhole }
            ].map((method) => (
              <label
                key={method.value}
                className={cn(
                  'flex items-center gap-2 p-2.5 rounded-sm border text-xs font-medium cursor-pointer transition-colors select-none',
                  watch('preferredContactMethod') === method.value
                    ? 'border-[#0F1E2E] bg-[#0F1E2E] text-white font-semibold'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                )}
              >
                <input
                  type="radio"
                  value={method.value}
                  className="sr-only"
                  {...register('preferredContactMethod')}
                />
                <method.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" strokeWidth={2} />
                <span>{method.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Row 5: Brief Requirement Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label 
              htmlFor="consultation-message" 
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Brief Description of Requirement
            </label>
            <span className="text-[11px] font-mono text-slate-400">
              {messageVal.length} / 1000 characters
            </span>
          </div>
          <Textarea
            id="consultation-message"
            rows={4}
            placeholder="Outline primary objective, key subjects, timeline, and jurisdiction. Please omit passwords, bank codes, or confidential evidence..."
            error={errors.message?.message}
            aria-required="true"
            aria-invalid={!!errors.message}
            {...register('message')}
          />
        </div>

        {/* Row 6: Required Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              id="consultation-consent"
              className="h-4 w-4 rounded-sm border-slate-300 text-[#0F1E2E] focus:ring-[#0F1E2E] mt-0.5 cursor-pointer shrink-0"
              aria-required="true"
              aria-invalid={!!errors.consentGiven}
              {...register('consentGiven')}
            />
            <span className="text-xs text-slate-600 leading-relaxed">
              I understand SeekProof operates under strict confidentiality and agree to the{' '}
              <a href="/privacy-policy" target="_blank" className="text-[#0F1E2E] font-bold underline hover:text-[#997B24]">
                Privacy Policy
              </a>{' '}
              and Non-Disclosure Terms.
            </span>
          </label>
          {errors.consentGiven && (
            <p role="alert" className="text-xs text-red-600 font-medium mt-1">
              {errors.consentGiven.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <PrimaryButton
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            className="w-full font-mono text-xs uppercase tracking-wider py-3.5"
          >
            <Send className="h-4 w-4 mr-2" aria-hidden="true" strokeWidth={2} />
            <span>Submit Confidential Assessment Request</span>
          </PrimaryButton>
        </div>

      </form>
    </div>
  );
}

export default FreeConsultationForm;
