import React from 'react';
import { ShieldCheck, Clock, AlertTriangle } from 'lucide-react';
import { VerificationStatus } from '../../types';

interface VerificationBadgeProps {
  status: VerificationStatus;
  showText?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  showText = true,
}) => {
  if (status === 'verified') {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-600/50 shadow-sm"
        title="Admin-verified commercial hardware supplier"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        {showText && <span>Verified Supplier</span>}
      </span>
    );
  }

  if (status === 'pending') {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-600/50 shadow-sm"
        title="Supplier application undergoing administrative verification"
      >
        <Clock className="w-3.5 h-3.5 text-amber-400" />
        {showText && <span>Verification Pending</span>}
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#241308] text-[#c8a88a] border border-[#522910] shadow-sm"
      title="Unverified supplier listing"
    >
      <AlertTriangle className="w-3.5 h-3.5 text-[#a47a55]" />
      {showText && <span>Unverified</span>}
    </span>
  );
};
