import * as React from 'react';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({ isOpen, onClose, title, description, children, className }: DialogProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby={title ? 'dialog-title' : undefined}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 transition-opacity"
        onClick={onClose}
      />
      {/* Modal Card */}
      <div
        className={cn(
          'relative z-50 w-full max-w-lg rounded-md border border-slate-300 bg-white p-6 shadow-md text-slate-900 animate-in fade-in zoom-in-95 duration-150',
          className
        )}
      >
        <div className="flex items-center justify-between pb-3">
          {title && <h3 id="dialog-title" className="text-base sm:text-lg font-bold text-[#0F1E2E] tracking-tight">{title}</h3>}
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
          </button>
        </div>
        {description && <p className="text-xs text-slate-500 mb-4 leading-relaxed">{description}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}

