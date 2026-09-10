import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Send, 
  LockKeyhole, 
  CheckCircle2 
} from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { PrimaryButton } from '../ui/button';
import { Alert } from '../ui/alert';
import { leadService } from '../../services/leadService';
import { cn } from '../../lib/utils';

// Input sanitization helper
function sanitizeText(value: string): string {
  if (!value) return '';
  return value
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 5000);
}

// Zod Schema for Contact Form
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters')
    .transform(sanitizeText),
  email: z
    .string()
    .email('Please provide a valid email address')
    .max(255)
    .transform(sanitizeText),
  phone: z
    .string()
    .max(50)
    .optional()
    .transform((val) => (val ? sanitizeText(val) : '')),
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject must be under 200 characters')
    .transform(sanitizeText),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(3000, 'Message cannot exceed 3000 characters')
    .transform(sanitizeText),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must consent to confidential data handling'
    }),
  // Honeypot anti-spam field
  contact_hp: z.string().max(0, 'Spam detected').optional()
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export interface ContactFormProps {
  className?: string;
  defaultSubject?: string;
}

export function ContactForm({ className, defaultSubject = '' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{ message: string; messageId?: number } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: defaultSubject,
      message: '',
      consent: false,
      contact_hp: ''
    }
  });

  const messageLength = watch('message')?.length || 0;

  const onSubmit = async (data: ContactFormValues) => {
    // Check honeypot
    if (data.contact_hp && data.contact_hp.length > 0) {
      return; // Silent reject spam
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const response = await leadService.submitContactMessage({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        consent: data.consent
      });

      setSubmitSuccess({
        message: response.message || 'Confidential message securely received. A case officer will respond shortly.',
        messageId: response.messageId
      });

      // Reset form after successful submission
      reset();
    } catch (err: any) {
      setSubmitError(err.message || 'Unable to transmit message. Please try again or call our duty line.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Privacy Notice */}
      <div 
        className="p-3.5 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5"
        role="region"
        aria-label="Contact Privacy Notice"
      >
        <LockKeyhole className="h-4 w-4 text-[#997B24] shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2} />
        <p className="leading-relaxed">
          <strong>Confidential Transmission:</strong> General inquiries are encrypted in transit. Please do not submit confidential evidentiary files or financial pins through this form.
        </p>
      </div>

      {/* Success State */}
      {submitSuccess && (
        <div 
          role="status"
          aria-live="polite"
          className="p-6 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3"
        >
          <div className="flex items-center gap-2.5 text-emerald-800">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" aria-hidden="true" strokeWidth={2} />
            <h4 className="text-base font-bold font-mono">
              Inquiry Successfully Transmitted
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {submitSuccess.message}
          </p>
          {submitSuccess.messageId && (
            <div className="font-mono text-xs text-emerald-800 font-semibold bg-emerald-100/70 px-3 py-1.5 rounded-sm inline-block">
              Tracking Ref: <span className="font-bold">#MSG-{submitSuccess.messageId}</span>
            </div>
          )}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setSubmitSuccess(null)}
              className="text-xs font-mono font-bold text-emerald-800 underline hover:no-underline cursor-pointer"
            >
              Send another message
            </button>
          </div>
        </div>
      )}

      {/* Error State */}
      {submitError && (
        <Alert variant="destructive" title="Transmission Error">
          {submitError}
        </Alert>
      )}

      {/* Contact Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        
        {/* Honeypot field */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          style={{ display: 'none', position: 'absolute', left: '-9999px' }}
          aria-hidden="true"
          {...register('contact_hp')}
        />

        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="contact-name"
            label="Your Name / Legal Organization"
            placeholder="e.g. Adv. Rajesh Verma"
            error={errors.name?.message}
            aria-required="true"
            aria-invalid={!!errors.name}
            {...register('name')}
          />

          <Input
            id="contact-email"
            label="Email Address"
            type="email"
            placeholder="rajesh.verma@lawfirm.in"
            error={errors.email?.message}
            aria-required="true"
            aria-invalid={!!errors.email}
            {...register('email')}
          />
        </div>

        {/* Row 2: Phone & Subject */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="contact-phone"
            label="Phone Number (Optional)"
            placeholder="+91 98110 00000"
            error={errors.phone?.message}
            aria-invalid={!!errors.phone}
            {...register('phone')}
          />

          <Input
            id="contact-subject"
            label="Inquiry Subject"
            placeholder="e.g. Litigation Support & Asset Audit"
            error={errors.subject?.message}
            aria-required="true"
            aria-invalid={!!errors.subject}
            {...register('subject')}
          />
        </div>

        {/* Row 3: Message Textarea */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label 
              htmlFor="contact-message" 
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Message / Brief Details
            </label>
            <span className="text-[11px] font-mono text-slate-400">
              {messageLength} / 3000 chars
            </span>
          </div>
          <Textarea
            id="contact-message"
            rows={5}
            placeholder="Describe your inquiry, timing constraints, or general operational questions..."
            error={errors.message?.message}
            aria-required="true"
            aria-invalid={!!errors.message}
            {...register('message')}
          />
        </div>

        {/* Row 4: Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              id="contact-consent"
              className="h-4 w-4 rounded-sm border-slate-300 text-[#0F1E2E] focus:ring-[#0F1E2E] mt-0.5 cursor-pointer shrink-0"
              aria-required="true"
              aria-invalid={!!errors.consent}
              {...register('consent')}
            />
            <span className="text-xs text-slate-600 leading-relaxed">
              I consent to SeekProof processing this inquiry confidentially in accordance with the{' '}
              <a href="/privacy-policy" target="_blank" className="text-[#0F1E2E] font-bold underline hover:text-[#997B24]">
                Privacy Policy
              </a>.
            </span>
          </label>
          {errors.consent && (
            <p role="alert" className="text-xs text-red-600 font-medium mt-1">
              {errors.consent.message}
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
            <span>Send Confidential Inquiry</span>
          </PrimaryButton>
        </div>

      </form>
    </div>
  );
}

export default ContactForm;
