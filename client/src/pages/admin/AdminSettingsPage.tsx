import { useState } from 'react';
import { 
  ShieldCheck, 
  Server, 
  Save 
} from 'lucide-react';
import { Input } from '../../components/ui/input';
import { PrimaryButton } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Alert } from '../../components/ui/alert';

export function AdminSettingsPage() {
  const [agencyName, setAgencyName] = useState('SeekProof Intelligence Agency');
  const [hotline, setHotline] = useState('+1 (800) 555-PROOF');
  const [pgpKey, setPgpKey] = useState('SP-PGP-90218');
  const [intakeEmail, setIntakeEmail] = useState('intake@seekproof.com');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto text-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F1E2E] font-mono tracking-tight">
            Agency & Security Configuration
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure public encryption identifiers, emergency hotlines, and operational parameters.
          </p>
        </div>

        <Badge variant="navy">
          ISO 27001 Parameter Guard
        </Badge>
      </div>

      {savedSuccess && (
        <Alert variant="success" title="Security Settings Updated">
          New agency parameters and cryptographic routing rules have been applied.
        </Alert>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="rounded-md p-6 sm:p-8 border border-slate-200 bg-white space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-mono uppercase font-bold text-[#0F1E2E] flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#997B24]" aria-hidden="true" strokeWidth={2} /> Agency Identity & Emergency Routing
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Agency Registered Name"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              required
            />
            <Input
              label="24/7 Tactical Response Hotline"
              value={hotline}
              onChange={(e) => setHotline(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Primary Public Intake Email"
              value={intakeEmail}
              onChange={(e) => setIntakeEmail(e.target.value)}
              required
            />
            <Input
              label="Public PGP Key Fingerprint"
              value={pgpKey}
              onChange={(e) => setPgpKey(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 space-y-4">
          <h3 className="text-sm font-mono uppercase font-bold text-slate-800 flex items-center gap-2">
            <Server className="h-4 w-4 text-emerald-700" aria-hidden="true" strokeWidth={2} /> API Gateway Status
          </h3>

          <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Backend API URL:</span>
              <span className="text-slate-800">http://localhost:5000/api</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Token Expiry:</span>
              <span className="text-[#0F1E2E] font-bold">7 Days (JWT HS256)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Rate Limiting Threshold:</span>
              <span className="text-emerald-700 font-bold">100 req / 15m</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200">
          <PrimaryButton type="submit" size="md" className="font-mono text-xs uppercase">
            <Save className="h-4 w-4 mr-1.5" aria-hidden="true" strokeWidth={2} /> Commit System Parameters
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}

export default AdminSettingsPage;
