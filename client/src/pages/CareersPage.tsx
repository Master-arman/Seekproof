import { Link } from 'react-router-dom';
import { BriefcaseBusiness, MapPin, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { Badge } from '../components/ui/badge';
import { PrimaryButton } from '../components/ui/button';

export function CareersPage() {
  const openings = [
    {
      id: 'sr-cyber-forensics',
      title: 'Senior Digital Forensics & Incident Responder',
      department: 'Digital Forensics Division',
      location: 'London / Remote Hybrid',
      type: 'Full-time',
      experience: '5+ Years Forensic Lab Experience',
      description: 'Lead digital forensic memory extractions, mobile acquisition, and court-admissible forensic reporting for corporate counsel and commercial litigation.',
    },
    {
      id: 'financial-osint-analyst',
      title: 'Financial Intelligence & Asset Tracing Analyst',
      department: 'Financial Intelligence Division',
      location: 'Zurich / London',
      type: 'Full-time',
      experience: '3+ Years Entity Mapping & Registry Research',
      description: 'Identify beneficial ownership structures, analyzing offshore registers, trust documentation, and corporate filing networks.',
    },
    {
      id: 'field-tscm-specialist',
      title: 'Technical Surveillance Counter-Measures (TSCM) Specialist',
      department: 'Physical & Electronic Defense',
      location: 'New York / EMEA Deployments',
      type: 'Full-time / Field',
      experience: 'Prior Technical Surveillance Experience',
      description: 'Execute electronic sweeps, RF spectrum analysis, and physical security assessments for corporate boardrooms and facilities.',
    }
  ];

  return (
    <div className="space-y-0 min-h-screen bg-[#F8FAFC]">
      {/* Page Hero */}
      <PageHero
        badge="Careers at SeekProof"
        title="Careers in Private Investigation & Forensics"
        subtitle="SeekProof recruits experienced digital forensic examiners, financial intelligence analysts, and licensed field investigators dedicated to factual accuracy and ethical standards."
        breadcrumbs={[{ label: 'Careers' }]}
      />

      {/* Main Careers Content */}
      <section className="section-padding bg-[#F8FAFC]">
        <Container size="xl" className="space-y-10">
          {/* Vetting Criteria Card */}
          <div className="rounded-md p-6 sm:p-8 space-y-3 bg-white border border-slate-200 text-slate-800 shadow-none">
            <div className="flex items-center gap-2 text-[#0F1E2E]">
              <ShieldCheck className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
              <h3 className="text-base font-bold font-mono">Candidate Vetting & Security Standards</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl font-normal">
              Due to the sensitive nature of our corporate intelligence and private investigation mandates, all applicants undergo background verification, technical competency evaluations, and non-disclosure compliance reviews.
            </p>
          </div>

          {/* Open Roles List */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#0F1E2E] font-sans">Current Open Positions</h3>

            <div className="space-y-4">
              {openings.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-6 rounded-md border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-none hover:border-slate-400 transition-colors"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-[10px] rounded-sm">
                        {job.department}
                      </Badge>
                      <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                        <MapPin className="h-3 w-3" aria-hidden="true" strokeWidth={2} /> {job.location}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-[#0F1E2E] font-sans">{job.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{job.description}</p>
                    <div className="text-[11px] font-mono text-slate-500 font-semibold">
                      Experience: {job.experience}
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Link to="/contact">
                      <PrimaryButton size="sm" className="font-mono text-xs uppercase rounded-sm shadow-none">
                        Apply Confidentially <ArrowRight className="h-3.5 w-3.5 ml-1" aria-hidden="true" strokeWidth={2} />
                      </PrimaryButton>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default CareersPage;
