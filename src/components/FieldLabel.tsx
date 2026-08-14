import React, { useState } from 'react';
import { HelpCircle, Info } from 'lucide-react';

interface FieldLabelProps {
  label: string;
  required?: boolean;
  explanation: string;
  examples?: string[];
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export const FieldLabel: React.FC<FieldLabelProps> = ({
  label,
  required,
  explanation,
  examples = [],
  icon: Icon,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`relative inline-block w-full ${className}`}>
      <div
        className="flex items-center gap-1.5 cursor-help group select-none text-[11px] font-black uppercase text-emerald-950 tracking-wider font-sans py-0.5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(!isHovered)}
      >
        {Icon && <Icon className="w-3.5 h-3.5 text-emerald-700 shrink-0" />}
        <span>{label}</span>
        {required && <span className="text-red-600 font-bold text-xs">*</span>}
        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100/80 text-emerald-800 group-hover:bg-amber-400 group-hover:text-slate-900 transition-colors ml-0.5 shrink-0">
          <HelpCircle className="w-3 h-3" />
        </span>
      </div>

      {/* Hover Popup Tooltip */}
      {isHovered && (
        <div className="absolute z-50 left-0 top-full mt-1 w-72 sm:w-84 p-3 bg-slate-900 text-slate-100 text-xs rounded-xl shadow-2xl border border-slate-700 animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
          <div className="flex items-start gap-2 mb-1.5 pb-1.5 border-b border-slate-700">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span className="font-bold text-amber-300 text-xs">{label}</span>
          </div>
          <p className="text-slate-200 text-[11px] leading-relaxed mb-2 font-sans font-normal">
            {explanation}
          </p>
          {examples.length > 0 && (
            <div className="bg-slate-800/90 rounded-lg p-2 border border-slate-700/80">
              <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider block mb-1">
                Examples:
              </span>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300 font-sans">
                {examples.map((ex, i) => (
                  <li key={i} className="leading-snug">
                    <span className="text-slate-200">{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
