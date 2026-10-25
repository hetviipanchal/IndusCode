import React, { useState } from 'react';
import { Copy, Check, Hash } from 'lucide-react';

interface IndusCodeBadgeProps {
  code: string;
  size?: 'sm' | 'md' | 'lg';
  showCopy?: boolean;
}

export const IndusCodeBadge: React.FC<IndusCodeBadgeProps> = ({
  code,
  size = 'md',
  showCopy = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base font-bold px-3 py-1.5',
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-lg border border-[#6b3815] bg-[#1a0c04] text-[#ffd899] font-mono tracking-wider shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_1px_0_rgba(255,200,150,0.1)] ${sizeClasses[size]}`}
      title="Platform-issued standardized Indus Code"
    >
      <Hash className="w-3.5 h-3.5 text-amber-500 shrink-0" />
      <span className="font-bold">{code}</span>
      {showCopy && (
        <button
          onClick={handleCopy}
          type="button"
          aria-label={`Copy Indus Code ${code}`}
          className="ml-1 text-[#a47a55] hover:text-[#fff4e0] transition-colors focus:outline-none"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      )}
    </div>
  );
};
