import React from 'react';
import { X, ShieldAlert, FileText } from 'lucide-react';

interface TermsPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export const TermsPrivacyModal: React.FC<TermsPrivacyModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#241308] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-w-2xl w-full max-h-[80vh] flex flex-col border-2 border-[#6c3b17] overflow-hidden text-[#f7ecd5]">
        <div className="bg-[#1b0d05] px-6 py-4 flex items-center justify-between text-[#fff4e0] border-b-2 border-[#43230e]">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-base tracking-wide">
              {type === 'terms' ? 'Platform Terms of Service' : 'Privacy & Data Protection Policy'}
            </h3>
          </div>
          <button onClick={onClose} className="text-[#a47a55] hover:text-white transition-colors" aria-label="Close modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-sm text-[#e8d5be] leading-relaxed">
          {type === 'terms' ? (
            <>
              <div className="p-3.5 bg-[#361a09] border border-amber-600/40 rounded-xl text-[#ffd899] text-xs font-medium flex gap-2.5">
                <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <div>
                  <strong className="text-white">Platform Identity Disclaimer:</strong> Indus Code (`IDC-***-******`) is a platform-issued digital identification code for hardware products across India. It is not an official government standard, BIS certification, or statutory trademark.
                </div>
              </div>

              <h4 className="font-bold text-[#fff4e0] text-base">1. Acceptance of Terms</h4>
              <p>
                By accessing or registering with INDUS CODE, manufacturers, wholesalers, distributors, retailers and buyers agree to comply with these platform terms.
              </p>

              <h4 className="font-bold text-[#fff4e0] text-base">2. Product Identification &amp; Canonical Catalog</h4>
              <p>
                Indus Code assigns unique, immutable product codes. Requesters must not submit fraudulent, duplicate or deceptive specifications. Canonical codes remain the property of the platform registry.
              </p>

              <h4 className="font-bold text-[#fff4e0] text-base">3. Supplier Obligations &amp; Listing Accuracy</h4>
              <p>
                Suppliers are solely responsible for fulfilling commercial orders, honoring indicated stock availability, maintaining pricing veracity, and delivering products conforming to the standardized specifications.
              </p>

              <h4 className="font-bold text-[#fff4e0] text-base">4. Platform Verification &amp; Badges</h4>
              <p>
                Verification badges indicate administrative review of business documentation. They do not constitute a performance guarantee, insurance or financial endorsement.
              </p>
            </>
          ) : (
            <>
              <h4 className="font-bold text-[#fff4e0] text-base">1. Information Collection</h4>
              <p>
                INDUS CODE collects business registration details, business contact information, public product listings, and technical specifications provided by users.
              </p>

              <h4 className="font-bold text-[#fff4e0] text-base">2. Use of Business Data</h4>
              <p>
                Business names, service cities, districts, states, PIN codes and authorized public contact numbers are displayed in the supplier discovery directory to facilitate B2B trade.
              </p>

              <h4 className="font-bold text-[#fff4e0] text-base">3. Security &amp; Access Controls</h4>
              <p>
                Sensitive business documents, identity proofs, and audit trails are stored in restricted cloud storage with attribute-based access control (ABAC). We do not sell user data to advertising brokers.
              </p>

              <h4 className="font-bold text-[#fff4e0] text-base">4. Location Privacy</h4>
              <p>
                Location queries operate by declared city, district and PIN code. The platform does not track or store continuous background GPS coordinates of users.
              </p>
            </>
          )}
        </div>

        <div className="bg-[#1b0d05] px-6 py-3 border-t-2 border-[#43230e] flex justify-end">
          <button
            onClick={onClose}
            className="brass-plate px-6 py-2 text-sm font-black rounded-xl transition-all shadow-md active:scale-95"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
