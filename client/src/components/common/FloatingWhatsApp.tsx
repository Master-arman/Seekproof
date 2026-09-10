import React, { useState } from 'react';
import { MessageSquare, X, ShieldCheck, ArrowUpRight } from 'lucide-react';

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
              <MessageSquare className="h-4 w-4" />
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
        <MessageSquare className="h-4 w-4 text-[#C5A059]" />
        <span className="text-xs font-mono font-bold tracking-tight text-white hidden sm:inline">
          Confidential WhatsApp
        </span>
      </button>
    </div>
  );
}

export default FloatingWhatsApp;
