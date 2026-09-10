import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home, FileSearch } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '../components/ui/button';
import { Container } from '../components/ui/Container';

export function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 bg-[#F8FAFC]">
      <Container size="sm" className="text-center space-y-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white border border-slate-300 shadow-none mx-auto">
          <ShieldAlert className="h-8 w-8 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
            Security Status: 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F1E2E] font-sans">
            Dossier Not Found / Redacted
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-normal">
            The intelligence coordinates or requested file location do not exist, have been relocated, or are restricted under strict agency security protocols.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/">
            <PrimaryButton size="md" className="w-full sm:w-auto font-mono text-xs uppercase rounded-sm shadow-none">
              <Home className="h-4 w-4 mr-1.5" aria-hidden="true" strokeWidth={2} /> Command Overview
            </PrimaryButton>
          </Link>
          <Link to="/services">
            <SecondaryButton size="md" className="w-full sm:w-auto font-mono text-xs uppercase rounded-sm shadow-none">
              <FileSearch className="h-4 w-4 mr-1.5" aria-hidden="true" strokeWidth={2} /> Browse Services
            </SecondaryButton>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default NotFoundPage;
