import React, { useEffect, useState } from 'react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { TestimonialCard } from '../ui/TestimonialCard';
import { testimonialService, TestimonialItem } from '../../services/testimonialService';
import { ShieldCheck, LockKeyhole } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '../../lib/animations';

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadTestimonials() {
      try {
        const data = await testimonialService.getPublishedTestimonials();
        if (mounted) {
          setTestimonials(data);
        }
      } catch (err) {
        console.error('Failed to load testimonials:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadTestimonials();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="py-20 md:py-24 lg:py-28 bg-[#F8FAFC] border-b border-slate-200 relative overflow-hidden">
      <Container size="xl" className="relative z-10">
        <SectionHeading
          badge="Client Testimonials"
          badgeVariant="default"
          title="Trusted by Corporate Counsel & Private Clients"
          description="Legal counsel, corporations, and private individuals rely on our evidentiary standards for litigation, arbitration, and confidential personal inquiries."
          align="center"
          theme="light"
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 md:mt-14">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-md bg-white border border-slate-200 animate-pulse shadow-none" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 md:mt-14"
          >
            {testimonials.map((t, index) => (
              <motion.div key={t.id || index} variants={fadeUp}>
                <TestimonialCard
                  quote={t.testimonial_text}
                  authorName={t.client_name}
                  authorRole={t.designation || 'Verified Client'}
                  caseType={index === 0 ? 'Corporate Fraud' : index === 1 ? 'Litigation Support' : 'Personal Investigation'}
                  rating={t.rating || 5}
                  verified={true}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-12 md:mt-14 p-4 rounded-md bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500 max-w-4xl mx-auto shadow-none">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-700" aria-hidden="true" strokeWidth={2} />
            <span>Client identities anonymized to protect case confidentiality.</span>
          </div>
          <div className="flex items-center gap-2">
            <LockKeyhole className="h-4 w-4 text-slate-500" aria-hidden="true" strokeWidth={2} />
            <span>Strict NDA Protections Enforced</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TestimonialsSection;
