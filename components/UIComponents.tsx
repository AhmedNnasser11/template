import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl border border-slate-100 shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' | 'danger'; size?: 'sm' | 'md' | 'lg' }> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md',
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary-900 text-white hover:bg-primary-800",
    outline: "border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-900",
    ghost: "hover:bg-slate-100 text-slate-700",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  
  return (
    <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
  <input 
    className={`flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'success' | 'warning' | 'danger' | 'info' | 'default'; className?: string }> = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    success: "bg-emerald-100 text-emerald-700 border-emerald-200",
    warning: "bg-amber-100 text-amber-700 border-amber-200",
    danger: "bg-rose-100 text-rose-700 border-rose-200",
    info: "bg-blue-100 text-blue-700 border-blue-200",
    default: "bg-slate-100 text-slate-700 border-slate-200"
  };
  
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const Table: React.FC<{ headers: string[]; children: React.ReactNode }> = ({ headers, children }) => (
  <div className="w-full overflow-auto rounded-lg border border-slate-200 bg-white">
    <table className="w-full text-sm text-right">
      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="h-12 px-4 align-middle [&:has([role=checkbox])]:pr-0">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="[&_tr:last-child]:border-0">
        {children}
      </tbody>
    </table>
  </div>
);

export const ConfidenceIndicator: React.FC<{ score: number }> = ({ score }) => {
  let colorClass = "bg-rose-500";
  if (score >= 90) colorClass = "bg-emerald-500";
  else if (score >= 70) colorClass = "bg-amber-500";

  return (
    <div className="flex items-center gap-2" title={`Confidence: ${score}%`}>
      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${colorClass}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs text-slate-500 font-mono">{score}%</span>
    </div>
  );
};

export const Tooltip: React.FC<{ content: string; children: React.ReactNode; side?: 'top' | 'bottom' | 'left' | 'right' }> = ({ content, children, side = 'top' }) => {
  const positionStyles = {
    top: '-top-9 left-1/2 -translate-x-1/2',
    bottom: '-bottom-9 left-1/2 -translate-x-1/2',
    left: 'top-1/2 -translate-y-1/2 -left-2 translate-x-[-100%]',
    right: 'top-1/2 -translate-y-1/2 -right-2 translate-x-[100%]'
  };

  return (
    <div className="group relative inline-flex">
      {children}
      <div className={`absolute z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 ${positionStyles[side]}`}>
        <div className="px-2 py-1 text-xs font-medium text-white bg-slate-900 rounded shadow-lg whitespace-nowrap">
          {content}
          {side === 'top' && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>}
          {side === 'bottom' && <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-900"></div>}
          {side === 'left' && <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-slate-900"></div>}
          {side === 'right' && <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-4 border-transparent border-r-slate-900"></div>}
        </div>
      </div>
    </div>
  );
};

// --- NEW COMPONENTS ---

export interface SelectOption {
  label: string;
  value: string;
}

export const Select: React.FC<{ 
  options: SelectOption[]; 
  value?: string; 
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}> = ({ options, value, onChange, placeholder = "اختر...", className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedLabel = options.find(o => o.value === value)?.label || placeholder;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className={value ? 'text-slate-900' : 'text-slate-400'}>{selectedLabel}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {options.map((option) => (
            <div
              key={option.value}
              className={`relative cursor-pointer select-none py-2 pl-3 pr-9 ${value === option.value ? 'bg-primary-50 text-primary-900' : 'text-slate-900 hover:bg-slate-100'}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <span className="block truncate font-normal">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Popover: React.FC<{ 
  trigger: React.ReactNode; 
  content: React.ReactNode; 
  side?: 'top' | 'bottom';
}> = ({ trigger, content, side = 'bottom' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div className={`absolute z-50 w-64 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${side === 'bottom' ? 'origin-top-right left-0 mt-2' : 'origin-bottom-right left-0 bottom-full mb-2'}`}>
          <div className="p-4">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};