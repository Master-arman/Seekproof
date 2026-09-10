import React, { useState } from 'react';
import { X, ShieldCheck, ArrowUpRight } from 'lucide-react';

// Official WhatsApp SVG icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M4.868 43.303l2.694-9.835a18.919 18.919 0 01-2.535-9.489C5.032 13.518 13.558 5 24.014 5c5.079.002 9.845 1.979 13.43 5.566 3.584 3.588 5.558 8.356 5.556 13.428-.004 10.465-8.531 18.985-18.986 18.985a18.95 18.95 0 01-9.059-2.301l-10.087 2.625zm10.555-6.102l.571.339a15.736 15.736 0 008.024 2.199c8.684 0 15.754-7.062 15.758-15.748.002-4.209-1.633-8.163-4.603-11.137-2.97-2.974-6.922-4.612-11.13-4.614-8.693 0-15.763 7.062-15.766 15.748-.001 2.927.849 5.782 2.459 8.233l.382.607-1.624 5.931 6.929-1.558z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.268 16.045c-.355-.79-.728-.806-1.066-.82-.276-.012-.591-.011-.906-.011-.315 0-.828.118-1.261.591-.433.473-1.656 1.618-1.656 3.946 0 2.328 1.695 4.58 1.932 4.896.236.315 3.294 5.29 8.121 7.22 4.019 1.585 4.833 1.27 5.703 1.19.87-.079 2.807-1.147 3.202-2.255.394-1.108.394-2.059.276-2.256-.118-.196-.433-.315-.906-.551-.473-.236-2.807-1.385-3.242-1.543-.434-.157-.75-.236-1.066.237-.315.473-1.223 1.543-1.498 1.858-.276.315-.552.354-1.025.118-.473-.236-1.995-.736-3.801-2.348-1.405-1.254-2.354-2.802-2.63-3.275-.275-.473-.029-.729.207-.965.212-.211.473-.552.71-.827.236-.276.315-.473.473-.789.157-.315.079-.591-.04-.827-.118-.236-1.066-2.574-1.498-3.533z"
    />
  </svg>
);

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = '917304679756';
  const prefilledGreeting = 'Hello SeekProof Duty Desk, I would like to inquire confidentially regarding an investigation matter.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefilledGreeting)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#0F1E2E] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm font-bold text-sm">
                SP
              </div>
              <div>
                <div className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                  <span>SeekProof Duty Desk</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[10px] text-slate-300">Confidential WhatsApp Gateway</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-[#F8FAFC]">
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1.5 shadow-2xs">
              <p className="font-medium text-[#0F1E2E]">
                Welcome to SeekProof Private Intelligence.
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Connect directly with a Senior Investigator via end-to-end encrypted WhatsApp messaging. All initial inquiries are protected under immediate Non-Disclosure terms.
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>256-bit encrypted • 100% Confidential</span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>Start Encrypted Chat</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#0F1E2E] hover:bg-[#182a3e] text-white rounded-full shadow-xl border border-[#C5A059]/40 hover:border-[#C5A059] transition-all hover:scale-105 cursor-pointer"
        aria-label="Open confidential WhatsApp advisory chat"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
        </span>
        <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
        <span className="text-xs font-mono font-bold tracking-tight text-white hidden sm:inline">
          Confidential WhatsApp
        </span>
      </button>
    </div>
  );
}

export default FloatingWhatsApp;
