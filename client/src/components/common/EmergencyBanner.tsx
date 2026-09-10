import { ShieldAlert, Phone, LockKeyhole } from 'lucide-react';
import { Container } from '../ui/Container';

export function EmergencyBanner() {
  const hotline = import.meta.env.VITE_EMERGENCY_HOTLINE || '+91 7304679756';
  const encryptionId = import.meta.env.VITE_ENCRYPTION_ID || 'SP-PGP-90218';

  return (
    <div className="bg-[#F8FAFC] border-b border-slate-200 py-1.5 text-[11px] font-mono text-slate-600">
      <Container size="xl" className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-3.5 w-3.5 text-[#0F1E2E] shrink-0" aria-hidden="true" strokeWidth={2} />
          <span className="font-bold uppercase tracking-wider text-[#0F1E2E]">Confidential Operations:</span>
          <span className="text-slate-500 hidden sm:inline">24/7 Rapid Response Intelligence Unit</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1.5 text-slate-500">
            <LockKeyhole className="h-3 w-3 text-slate-400" aria-hidden="true" strokeWidth={2} />
            <span>PGP: <span className="text-slate-800 font-bold">{encryptionId}</span></span>
          </div>
          <a
            href={`tel:${hotline.replace(/[^0-9+]/g, '')}`}
            className="flex items-center gap-1 text-[#0F1E2E] hover:text-[#D4AF37] font-bold transition-colors"
            aria-label={`Emergency hotline: ${hotline}`}
          >
            <Phone className="h-3 w-3 text-[#D4AF37]" aria-hidden="true" strokeWidth={2.5} />
            <span>{hotline}</span>
          </a>
        </div>
      </Container>
    </div>
  );
}

export default EmergencyBanner;

