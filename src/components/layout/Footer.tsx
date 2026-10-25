import React, { useState } from 'react';
import { ShieldCheck, Info, FileText, Lock, Globe, Building2 } from 'lucide-react';
import { TermsPrivacyModal } from '../modals/TermsPrivacyModal';

interface FooterProps {
  onSelectCategory?: (slug: string) => void;
  onNavigate?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onNavigate }) => {
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);

  return (
    <>
      <footer className="bg-[#120803] text-[#bda084] border-t-4 border-[#321606] text-sm">
        {/* Integrity Notice banner */}
        <div className="bg-[#0d0502] border-b border-[#241005] px-4 py-3">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#a8896c]">
            <div className="flex items-center gap-2 text-amber-400 font-medium text-center md:text-left">
              <Info className="w-4 h-4 shrink-0 text-amber-500" />
              <span>
                <strong className="text-[#ffd899]">Platform Declaration:</strong> INDUS CODE (`IDC-***-******`) is a platform-issued digital product identity standard for hardware interoperability in India. It is not an official government or BIS agency standard.
              </span>
            </div>
            <div className="flex items-center gap-4 shrink-0 text-[#856143] font-mono text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Master Catalog Active
              </span>
              <span>•</span>
              <span>Encrypted Storage</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand & Mission */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#2a1306] border border-[#5a2c10] flex items-center justify-center shadow-md">
                  <span className="font-mono font-black text-amber-400 text-sm tracking-wider">IDC</span>
                </div>
                <span className="font-extrabold text-[#fff4e0] text-lg tracking-tight">INDUS CODE</span>
              </div>
              <p className="text-xs text-[#a8896c] leading-relaxed">
                National hardware product identification and supplier discovery platform. Standardizing parts, fasteners, piping, bearings and fittings across India.
              </p>
              <div className="text-xs font-mono text-[#ffd899]">
                Tagline: &quot;Every Product. One Identity.&quot;
              </div>
            </div>

            {/* Col 2: Categories */}
            <div>
              <h4 className="text-[#ffd899] font-bold text-xs uppercase tracking-wider mb-3">
                Hardware Domains
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => onNavigate?.('search')}
                    className="text-[#dec2a2] hover:text-[#fff4e0] transition-colors"
                  >
                    Fasteners, Bolts &amp; Nuts (FST)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate?.('search')}
                    className="text-[#dec2a2] hover:text-[#fff4e0] transition-colors"
                  >
                    Pipes, Valves &amp; Fittings (PIP)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate?.('search')}
                    className="text-[#dec2a2] hover:text-[#fff4e0] transition-colors"
                  >
                    Industrial Bearings (BRG)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate?.('search')}
                    className="text-[#dec2a2] hover:text-[#fff4e0] transition-colors"
                  >
                    Architectural &amp; Door Hinges (HNG)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate?.('search')}
                    className="text-[#dec2a2] hover:text-[#fff4e0] transition-colors"
                  >
                    Switchgear &amp; Electrical (ELC)
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Suppliers & Industry */}
            <div>
              <h4 className="text-[#ffd899] font-bold text-xs uppercase tracking-wider mb-3">
                Suppliers &amp; Trade
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => onNavigate?.('supplier-register')}
                    className="text-[#dec2a2] hover:text-[#fff4e0] transition-colors"
                  >
                    Supplier Registration
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate?.('suppliers')}
                    className="text-[#dec2a2] hover:text-[#fff4e0] transition-colors"
                  >
                    Manufacturer &amp; Wholesaler Directory
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate?.('request')}
                    className="text-[#dec2a2] hover:text-[#fff4e0] transition-colors"
                  >
                    Request New Indus Code
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate?.('supplier-portal')}
                    className="text-[#dec2a2] hover:text-[#fff4e0] transition-colors"
                  >
                    Inventory &amp; Stock Management
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Platform Integrity */}
            <div>
              <h4 className="text-[#ffd899] font-bold text-xs uppercase tracking-wider mb-3">
                Trust &amp; Governance
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => setModalType('terms')}
                    className="text-[#dec2a2] hover:text-[#fff4e0] transition-colors flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-500/80" />
                    <span>Terms of Service</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setModalType('privacy')}
                    className="text-[#dec2a2] hover:text-[#fff4e0] transition-colors flex items-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-500/80" />
                    <span>Privacy Policy</span>
                  </button>
                </li>
                <li className="pt-2 text-[11px] text-[#856143]">
                  Industrial standard mappings: IS (Bureau of Indian Standards), ISO, DIN, ASTM.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#291307] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#856143]">
            <div>&copy; {new Date().getFullYear()} INDUS CODE Platform. All Rights Reserved.</div>
            <div className="flex items-center gap-4 text-[#dec2a2]">
              <span>Crafted for Indian Engineering &amp; Hardware Commerce</span>
            </div>
          </div>
        </div>
      </footer>

      {modalType && (
        <TermsPrivacyModal
          isOpen={!!modalType}
          onClose={() => setModalType(null)}
          type={modalType}
        />
      )}
    </>
  );
};
