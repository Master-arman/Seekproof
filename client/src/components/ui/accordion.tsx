import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface AccordionContextValue {
  expandedItems: string[];
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
}

export function Accordion({
  type = 'single',
  defaultValue,
  value: controlledValue,
  onValueChange,
  collapsible = true,
  className,
  children,
  ...props
}: AccordionProps) {
  const [internalExpanded, setInternalExpanded] = React.useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });

  const expandedItems = controlledValue !== undefined
    ? (Array.isArray(controlledValue) ? controlledValue : [controlledValue])
    : internalExpanded;

  const toggleItem = React.useCallback(
    (itemValue: string) => {
      let next: string[];
      if (type === 'single') {
        const isCurrentOpen = expandedItems.includes(itemValue);
        if (isCurrentOpen) {
          next = collapsible ? [] : [itemValue];
        } else {
          next = [itemValue];
        }
      } else {
        if (expandedItems.includes(itemValue)) {
          next = expandedItems.filter(v => v !== itemValue);
        } else {
          next = [...expandedItems, itemValue];
        }
      }

      if (controlledValue === undefined) {
        setInternalExpanded(next);
      }
      if (onValueChange) {
        onValueChange(type === 'single' ? (next[0] || '') : next);
      }
    },
    [expandedItems, type, collapsible, controlledValue, onValueChange]
  );

  return (
    <AccordionContext.Provider value={{ expandedItems, toggleItem, type }}>
      <div className={cn('space-y-3', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

const AccordionItemContext = React.createContext<{ value: string; isOpen: boolean }>({
  value: '',
  isOpen: false
});

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }

  const isOpen = context.expandedItems.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className={cn(
          'border border-slate-200 rounded-md overflow-hidden transition-colors duration-150',
          isOpen ? 'bg-white border-slate-300' : 'bg-white hover:border-slate-300',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export function AccordionTrigger({ className, children, icon, ...props }: AccordionTriggerProps) {
  const { toggleItem } = React.useContext(AccordionContext)!;
  const { value, isOpen } = React.useContext(AccordionItemContext);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleItem(value);
    }
  };

  return (
    <button
      type="button"
      id={`accordion-trigger-${value}`}
      aria-controls={`accordion-content-${value}`}
      aria-expanded={isOpen}
      onClick={() => toggleItem(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        'w-full flex items-center justify-between p-4 sm:p-4.5 text-left font-sans font-semibold text-xs sm:text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0F1E2E] select-none cursor-pointer',
        isOpen ? 'text-[#0F1E2E]' : 'text-slate-800 hover:text-[#0F1E2E]',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3 pr-4">
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="leading-snug">{children}</span>
      </div>
      <ChevronDown
        className={cn(
          'h-4 w-4 shrink-0 transition-transform duration-200 text-slate-400',
          isOpen && 'rotate-180 text-[#0F1E2E]'
        )}
      />
    </button>
  );
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  const { value, isOpen } = React.useContext(AccordionItemContext);

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`accordion-content-${value}`}
          role="region"
          aria-labelledby={`accordion-trigger-${value}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div
            className={cn(
              'px-4 pb-4 sm:px-4.5 sm:pb-4.5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1 pt-3',
              className
            )}
            {...props}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

