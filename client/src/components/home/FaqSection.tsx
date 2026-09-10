import React from 'react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { FaqAccordion } from '../common/FaqAccordion';

export function FaqSection() {
  return (
    <section className="py-20 md:py-24 lg:py-28 bg-[#F8FAFC] text-slate-900 border-b border-slate-200 relative overflow-hidden">
      <Container size="xl" className="relative z-10">
        <SectionHeading
          badge="Frequently Asked Questions"
          badgeVariant="default"
          title="Clear Answers on Operations & Legal Standards"
          description="Everything you need to know about our investigative protocols, confidentiality guarantees, evidence delivery, and judicial admissibility."
          align="center"
          theme="light"
        />

        <div className="max-w-4xl mx-auto mt-12 md:mt-14">
          <FaqAccordion theme="light" showSearch={true} showCategories={true} showCta={true} />
        </div>
      </Container>
    </section>
  );
}

export default FaqSection;

