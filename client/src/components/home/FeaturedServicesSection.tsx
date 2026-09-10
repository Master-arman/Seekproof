import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  UserCheck, 
  HeartHandshake, 
  UserSearch, 
  Building2, 
  ClipboardCheck, 
  ChevronRight, 
  ArrowUpRight 
} from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { SecondaryButton } from '../ui/button';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '../../lib/animations';

export function FeaturedServicesSection() {
  const services = [
    {
      icon: <Camera className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Field Surveillance',
      category: 'Field Operations',
      description: 'Discreet physical surveillance deploying high-resolution optical cameras, timestamped video logs, and detailed investigator activity reports.',
      features: ['High-definition optical lenses', 'Time-stamped video logs', 'Court-admissible investigator affidavits'],
      path: '/services/surveillance-field'
    },
    {
      icon: <UserCheck className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Personal Investigation',
      category: 'Personal Inquiries',
      description: 'Discreet personal inquiries, lifestyle assessments, identity verification, and background fact-checking for individuals.',
      features: ['Daily routine & activity verification', 'Social circle vetting', 'Confidential evidentiary reports'],
      path: '/services/personal-investigation'
    },
    {
      icon: <HeartHandshake className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Matrimonial Inquiries',
      category: 'Matrimonial Verification',
      description: 'Pre-matrimonial background checks, fidelity verification, and financial asset discovery with complete discretion.',
      features: ['Pre-matrimonial background checks', 'Employment & solvency verification', 'Family background verification'],
      path: '/services/marital-investigations'
    },
    {
      icon: <UserSearch className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Missing Persons & Locating',
      category: 'Location & Tracing',
      description: 'Structured inquiries to locate missing family members, absconding debtors, runaway juveniles, and litigation witnesses.',
      features: ['Digital footprint & record tracing', 'Field investigator verification', 'Cross-referenced registry search'],
      path: '/services/missing-persons'
    },
    {
      icon: <Building2 className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Corporate Fraud Probes',
      category: 'Corporate Intelligence',
      description: 'Internal forensic investigations into corporate fraud, procurement kickback schemes, data theft, and executive fiduciary breaches.',
      features: ['Forensic accounting audits', 'Shell company identification', 'Executive misconduct inquiries'],
      path: '/services/corporate-fraud'
    },
    {
      icon: <ClipboardCheck className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Due Diligence & Vetting',
      category: 'Risk Mitigation',
      description: 'Comprehensive due diligence on target companies, potential business partners, executive hires, and key personnel.',
      features: ['Executive integrity vetting', 'Regulatory sanction checks', 'Reputational risk analysis'],
      path: '/services/due-diligence'
    }
  ];

  return (
    <section className="py-20 md:py-24 lg:py-28 bg-white border-b border-slate-200">
      <Container size="xl">
        <SectionHeading
          badge="Core Capabilities"
          badgeVariant="default"
          title="Featured Investigation Services"
          description="SeekProof provides court-admissible investigative services across personal, corporate, and forensic matters."
          align="center"
          theme="light"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 md:mt-14"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="rounded-md bg-white border border-slate-200 p-6 flex flex-col justify-between group shadow-none hover:border-slate-400 transition-colors duration-150"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-slate-50 border border-slate-200">
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-mono font-semibold uppercase px-2.5 py-1 rounded-sm bg-slate-100 text-slate-700 border border-slate-200">
                    {service.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0F1E2E] group-hover:text-slate-900 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2 font-sans font-normal">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-600 font-normal">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden="true" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={service.path}
                  className="inline-flex items-center text-xs font-mono font-bold text-[#0F1E2E] hover:underline gap-1"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <Link
                  to="/free-consultation"
                  className="text-[11px] font-mono text-slate-500 hover:text-slate-900 transition-colors font-semibold"
                >
                  Inquire
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 md:mt-14 text-center">
          <Link to="/services">
            <SecondaryButton size="md" className="font-mono text-xs uppercase tracking-wider font-semibold rounded-sm shadow-none">
              <span>View All Investigation Services</span>
              <ChevronRight className="h-4 w-4 ml-1.5" aria-hidden="true" />
            </SecondaryButton>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedServicesSection;
