import React, { useState } from 'react';
import {
  Wrench,
  Layers,
  CircleDot,
  Boxes,
  Cpu,
  Package,
  ShieldCheck,
} from 'lucide-react';

interface HardwareProductImageProps {
  src?: string;
  alt: string;
  indusCode?: string;
  canonicalName?: string;
  categoryId?: string;
  className?: string;
}

export const HardwareProductImage: React.FC<HardwareProductImageProps> = ({
  src,
  alt,
  indusCode,
  canonicalName,
  categoryId,
  className = 'w-full h-full object-cover',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // If no source is provided or if loading failed, display the technical schematic fallback
  if (!src || hasError) {
    const code = indusCode || 'IDC-GEN-000000';
    const name = canonicalName || alt;
    const cat = categoryId || (code.startsWith('IDC-FST') ? 'fasteners' : code.startsWith('IDC-BRG') ? 'bearings' : 'hardware');

    return (
      <div className="w-full h-full min-h-[140px] relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 flex flex-col items-center justify-center p-4 text-center overflow-hidden border border-slate-700/80 rounded-xl select-none shadow-inner">
        {/* Engineering Blueprint Grid Background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #38bdf8 1px, transparent 1px),
              linear-gradient(to bottom, #38bdf8 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Blueprint Circular Caliper Guide */}
        <div className="absolute w-36 h-36 rounded-full border border-sky-400/20 pointer-events-none animate-pulse" />
        <div className="absolute w-24 h-24 rounded-full border border-dashed border-sky-400/30 pointer-events-none" />

        {/* Center Technical Hardware Icon */}
        <div className="relative z-10 w-12 h-12 rounded-xl bg-slate-800/90 border border-sky-400/40 flex items-center justify-center shadow-lg mb-2 text-sky-400 group-hover:scale-105 transition-transform">
          {cat.includes('fastener') || code.includes('FST') ? (
            <Wrench className="w-6 h-6 text-amber-400" />
          ) : cat.includes('bearing') || code.includes('BRG') ? (
            <CircleDot className="w-6 h-6 text-sky-400" />
          ) : cat.includes('pipe') || code.includes('PIP') ? (
            <Boxes className="w-6 h-6 text-emerald-400" />
          ) : cat.includes('electrical') || code.includes('ELC') ? (
            <Cpu className="w-6 h-6 text-amber-400" />
          ) : (
            <Package className="w-6 h-6 text-blue-400" />
          )}
        </div>

        {/* Indus Code Tag */}
        <div className="relative z-10">
          <span className="inline-block font-mono text-[11px] font-bold tracking-wider text-amber-400 bg-slate-950/80 px-2 py-0.5 rounded border border-amber-500/40 shadow-xs">
            {code}
          </span>
          <p className="text-[11px] font-medium text-slate-200 line-clamp-1 max-w-[200px] mt-1 px-1">
            {name}
          </p>
          <div className="flex items-center justify-center gap-1 text-[9px] text-sky-400/80 mt-1 uppercase tracking-wider font-mono">
            <ShieldCheck className="w-3 h-3 text-sky-400" />
            <span>Standardized Technical Spec</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center">
          <Layers className="w-6 h-6 text-slate-300 animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
};
