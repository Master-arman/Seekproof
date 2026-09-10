import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Award, 
  LockKeyhole, 
  Scale, 
  CheckCircle2, 
  Globe2 
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { ResponsiveGrid } from '../components/ui/ResponsiveGrid';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/badge';
import { PrimaryButton } from '../components/ui/button';

export function AboutPage() {
  const leadership = [
    {
      name: 'V. Vance, LPI',
      role: 'Chief Investigator & Director',
      image: '/images/team-director.jpg',
      background: '22+ years in private investigation and financial crime inquiries. Specializes in multi-jurisdiction asset tracing and corporate fraud.',
      badge: 'Senior Investigator',
    },
    {
      name: 'Elena Rostova, CFE',
      role: 'Head of Digital Forensics',
      image: '/images/team-forensics.jpg',
      background: 'Certified Fraud Examiner and digital forensics specialist. Expert in digital evidence extractions and court-admissible forensic reporting.',
      badge: 'Forensics Specialist',
    },
    {
      name: 'Julian Sterling, LL.M.',
      role: 'Director of Evidentiary Standards',
      image: '/images/team-legal.jpg',
      background: 'Specialized legal consultant advising on chain-of-custody protocols and electronic evidentiary standards for commercial litigation.',
      badge: 'Legal Consultant',
    },
    {
      name: 'Marcus Hayes',
      role: 'Director of Field Operations & TSCM',
      image: '/images/team-ops.jpg',
      background: 'Technical surveillance specialist with extensive experience conducting TSCM electronic bug sweeps and physical security audits.',
      badge: 'TSCM Specialist',
    }
  ];

  const pillars = [
    {
      icon: <Scale className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Judicial Admissibility',
      description: 'Every record, surveillance photograph, and financial ledger is gathered under strict chain-of-custody protocols to withstand courtroom scrutiny.'
    },
    {
      icon: <LockKeyhole className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Strict Confidentiality',
      description: 'We operate under automatic Non-Disclosure Agreements. Preliminary scoping files are protected with 256-bit encryption and restricted access.'
    },
    {
      icon: <Globe2 className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Multi-Jurisdictional Reach',
      description: 'With licensed operatives and established partner networks across 18 key jurisdictions, we trace concealed assets and investigate cross-border corporate fraud.'
    },
    {
      icon: <Award className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Integrity of Evidence',
      description: 'We deal exclusively in verified facts and documented proof. If an assertion cannot be corroborated with evidence, we do not present it as factual.'
    }
  ];

  return (
    <div className="space-y-0 min-h-screen bg-[#F8FAFC]">
      <SEOHead
        title="About SeekProof | Licensed Private Investigators Mumbai"
        description="Learn about SeekProof's certified investigative directors, digital forensics experts, and ISO/IEC 27037 standards operating from Nariman Point, Mumbai."
        canonicalUrl="/about"
        keywords={['about seekproof', 'detective agency leadership', 'licensed investigators mumbai', 'forensic evidence standards']}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://seekproof.in/' },
            { '@type': 'ListItem', 'position': 2, 'name': 'About Us', 'item': 'https://seekproof.in/about' }
          ]
        }}
      />

      {/* Page Hero */}
      <PageHero
        badge="About SeekProof"
        title="Discreet Investigation. Documented Evidence."
        subtitle="Founded by licensed investigators, forensic accountants, and digital forensics specialists, SeekProof is a private intelligence and investigation firm providing documented evidence for corporations, legal counsel, and private individuals."
        breadcrumbs={[{ label: 'About Us' }]}
        actions={
          <Link to="/free-consultation">
            <PrimaryButton size="md" className="font-mono text-xs uppercase tracking-wider rounded-sm shadow-none">
              Schedule Confidential Briefing
            </PrimaryButton>
          </Link>
        }
      />

      {/* Agency Principles */}
      <section className="section-padding bg-[#F8FAFC]">
        <Container size="xl">
          <SectionHeading
            badge="Guiding Principles"
            title="Our Four Evidentiary Standards"
            description="Our operational methodology is designed to eliminate ambiguity and deliver verifiable proof."
            align="center"
          />

          <ResponsiveGrid columns={4} gap="lg">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-md space-y-3 border border-slate-200 shadow-none flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-slate-50 border border-slate-200">
                    {pillar.icon}
                  </div>
                  <h3 className="text-base font-bold text-[#0F1E2E]">{pillar.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{pillar.description}</p>
                </div>
              </div>
            ))}
          </ResponsiveGrid>
        </Container>
      </section>

      {/* Senior Leadership */}
      <section className="section-padding bg-white border-y border-slate-200">
        <Container size="xl">
          <SectionHeading
            badge="Leadership"
            title="Senior Investigative Officers"
            description="Our leadership team brings decades of investigative experience, forensic accounting expertise, and courtroom knowledge."
            align="center"
          />

          <ResponsiveGrid columns={4} gap="lg">
            {leadership.map((leader, idx) => (
              <div
                key={idx}
                className="bg-[#F8FAFC] rounded-md border border-slate-200 overflow-hidden flex flex-col justify-between shadow-none"
              >
                {/* Authentic Portrait Image Container */}
                <div className="relative aspect-[4/5] w-full bg-slate-900 overflow-hidden border-b border-slate-200">
                  <img
                    src={leader.image}
                    alt={`${leader.name} - ${leader.role}`}
                    className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="text-[10px] shadow-none bg-white/95 text-slate-800 border-slate-300 font-semibold rounded-sm">
                      {leader.badge}
                    </Badge>
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-base font-bold text-[#0F1E2E]">{leader.name}</h3>
                    <div className="text-xs font-semibold text-slate-500 font-mono mt-0.5">
                      {leader.role}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{leader.background}</p>
                </div>
              </div>
            ))}
          </ResponsiveGrid>
        </Container>
      </section>

      {/* Accreditations & Standards */}
      <section className="section-padding bg-[#F8FAFC] text-slate-900 border-b border-slate-200">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="rounded-sm">Licensing & Regulatory Compliance</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1E2E] tracking-tight leading-tight">
                Operating strictly within legal and evidentiary boundaries.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                SeekProof operates as a fully licensed private investigation agency (#PI-9824-A). We strictly comply with data protection regulations, statutory privacy rules, and judicial standards of admissibility.
              </p>
              <div className="space-y-2.5">
                {[
                  'ISO/IEC 27037 Digital Evidence Acquisition Standards',
                  'Information Security Management System Standards (ISO/IEC 27001)',
                  'Full Chain-of-Custody Certification on all Physical & Digital Exhibits',
                  'Professional Liability & Errors and Omissions Insurance Coverage',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-normal">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" aria-hidden="true" strokeWidth={2} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Headquarters Visual Card */}
            <div className="rounded-md overflow-hidden border border-slate-300 bg-white shadow-none">
              <div className="relative aspect-[16/9] w-full bg-slate-900 border-b border-slate-200">
                <img
                  src="/images/headquarters.jpg"
                  alt="SeekProof Headquarters at Nariman Point Mumbai"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-700 px-2.5 py-1 rounded-sm text-[10px] font-mono text-white font-semibold">
                  Operational Centre • Nariman Point, Mumbai
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-4">
                <div className="flex items-center gap-2 text-[#0F1E2E]">
                  <ShieldCheck className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                  <h4 className="text-base font-bold text-[#0F1E2E] font-mono">Confidential Case Consultation</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Contact our Senior Investigative Officers to discuss your case requirements. We provide initial feasibility reviews and immediate conflict checks.
                </p>
                <div className="pt-1">
                  <Link to="/contact">
                    <PrimaryButton size="md" className="w-full font-mono text-xs uppercase tracking-wider font-semibold rounded-sm shadow-none">
                      Contact Case Officers
                    </PrimaryButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default AboutPage;
