import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Scale, 
  Cpu, 
  Building2, 
  ShieldCheck 
} from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { Badge } from '../components/ui/badge';
import { PrimaryButton } from '../components/ui/button';

export function CaseStudiesPage() {
  const cases = [
    {
      code: 'CASE #SP-7719',
      title: 'Semiconductor Proprietary Source Code Theft',
      type: 'Digital Forensics & OSINT',
      location: 'Zurich / London / Singapore',
      outcome: 'Full recovery of exfiltrated blueprints & civil judgment obtained',
      image: '/images/forensics-lab.jpg',
      imageAlt: 'Digital forensics memory extraction and code exfiltration analysis',
      overview: 'A semiconductor design firm suspected proprietary source code theft ahead of a critical patent filing. SeekProof forensic examiners conducted disk and memory acquisitions across target workstations, identifying an unauthorized encrypted cloud exfiltration conduit.',
      metrics: [
        { label: 'Time to Identify Subject', value: '72 Hours' },
        { label: 'Exfiltrated Files Recovered', value: '4.2 TB' },
        { label: 'Court Evidence Status', value: 'Admitted & Accepted' },
      ],
      icon: <Cpu className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
    },
    {
      code: 'CASE #SP-8302',
      title: '$48M Multi-Jurisdiction Offshore Asset Tracing & Freeze',
      type: 'Asset Recovery',
      location: 'British Virgin Islands / Geneva / Dubai',
      outcome: 'Multi-jurisdictional freeze orders obtained across 3 banking hubs',
      image: '/images/corporate-intelligence.jpg',
      imageAlt: 'Corporate intelligence ledger and offshore account beneficial ownership analysis',
      overview: 'Post-judgment enforcement against a debtor claiming insolvency while maintaining luxury real estate and marine assets. SeekProof identified tiered nominee structures and provided sworn affidavits documenting beneficial ownership for court freezing orders.',
      metrics: [
        { label: 'Assets Located', value: '$48.5 Million' },
        { label: 'Nominee Entities Identified', value: '11 Entities' },
        { label: 'Enforcement Timeframe', value: 'Frozen in 14 Days' },
      ],
      icon: <Scale className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
    },
    {
      code: 'CASE #SP-6490',
      title: 'M&A Boardroom Counter-Surveillance & Electronic Sweeping',
      type: 'TSCM Counter-Surveillance',
      location: 'London Financial District',
      outcome: 'Active eavesdropping hardware detected and removed',
      image: '/images/headquarters.jpg',
      imageAlt: 'Corporate boardroom counter-surveillance sweep and RF spectrum inspection',
      overview: 'During sensitive private equity buyout negotiations, an investment firm suspected leaked bid parameters. SeekProof conducted overnight TSCM electronic sweeps, detecting and extracting an active GSM transmitter concealed within a conference room conduit.',
      metrics: [
        { label: 'Transmitters Removed', value: '2 Active Devices' },
        { label: 'Sweep Completion', value: 'Within 6 Hours' },
        { label: 'Transaction Protected', value: '$220M M&A Deal' },
      ],
      icon: <Building2 className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
    }
  ];

  return (
    <div className="space-y-0 min-h-screen bg-[#F8FAFC]">
      {/* Page Hero */}
      <PageHero
        badge="Case Records"
        title="Case Summaries & Documented Outcomes"
        subtitle="In strict adherence to Non-Disclosure Agreements, all corporate identities and subject specifics have been redacted. The following summaries demonstrate our investigative methodology and documented outcomes."
        breadcrumbs={[{ label: 'Case Summaries' }]}
        actions={
          <Link to="/contact">
            <PrimaryButton size="md" className="font-mono text-xs uppercase tracking-wider font-semibold rounded-sm shadow-none">
              Consult on a Similar Matter
            </PrimaryButton>
          </Link>
        }
      />

      {/* Case Studies List */}
      <section className="section-padding bg-[#F8FAFC]">
        <Container size="xl" className="space-y-8">
          {cases.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-md border border-slate-200 p-6 sm:p-8 space-y-6 overflow-hidden shadow-none"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-slate-50 border border-slate-200 text-[#0F1E2E]">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-500 tracking-wider">
                      {item.code}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0F1E2E] mt-0.5">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-sm">{item.type}</Badge>
                  <Badge variant="outline" className="rounded-sm">{item.location}</Badge>
                </div>
              </div>

              {/* Body with Photographic Evidence Container */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2 space-y-4">
                  {/* Authentic Photography Exhibit Box */}
                  <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-sm overflow-hidden bg-slate-900 border border-slate-200">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-slate-900/90 border border-slate-700 px-2.5 py-0.5 rounded-sm text-[10px] font-mono text-white font-semibold">
                      Evidentiary Exhibit • Authenticated
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase text-slate-500 font-semibold tracking-wider">
                      Case Summary:
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.overview}
                    </p>
                  </div>

                  <div className="p-3 rounded-sm bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                    <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={2.5} />
                    <span>Outcome: {item.outcome}</span>
                  </div>
                </div>

                {/* Metrics Column */}
                <div className="rounded-md bg-slate-50 p-5 border border-slate-200 space-y-3 shadow-none">
                  <div className="text-[11px] font-mono uppercase text-slate-500 font-semibold tracking-wider">
                    Verified Case Metrics
                  </div>
                  {item.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs py-2 border-b border-slate-200/60 last:border-0 font-mono"
                    >
                      <span className="text-slate-600 font-normal">{m.label}</span>
                      <span className="font-bold text-[#0F1E2E]">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Bottom CTA Card */}
          <div className="rounded-md bg-white border border-slate-300 p-8 text-center space-y-4 text-slate-900 shadow-none">
            <h3 className="text-xl font-bold text-[#0F1E2E]">Have an Active Matter Requiring Documented Evidence?</h3>
            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed font-normal">
              Contact our Senior Investigative Officers for an immediate, confidential assessment and conflict check.
            </p>
            <Link to="/contact">
              <PrimaryButton size="md" className="font-mono text-xs uppercase tracking-wider font-semibold rounded-sm shadow-none">
                Request Consultation
              </PrimaryButton>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default CaseStudiesPage;
