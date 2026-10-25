import React, { useState } from 'react';
import { X, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { dbStore } from '../../services/dbStore';
import { useAuth } from '../../context/AuthContext';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: 'product' | 'supplier' | 'listing';
  targetId: string;
  targetName: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetName,
}) => {
  const { userProfile } = useAuth();
  const [reportType, setReportType] = useState<'incorrect_specs' | 'duplicate_record' | 'suspicious_supplier' | 'misleading_listing'>('incorrect_specs');
  const [explanation, setExplanation] = useState('');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!explanation.trim()) return;

    setSubmitting(true);
    try {
      await dbStore.submitReport({
        reportType,
        targetType,
        targetId,
        targetName,
        reporterId: userProfile?.uid,
        reporterEmail: email,
        explanation: explanation.trim(),
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setExplanation('');
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Submit report error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#241308] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-w-lg w-full border-2 border-[#6c3b17] overflow-hidden text-[#f7ecd5]">
        <div className="bg-[#1b0d05] px-6 py-4 flex items-center justify-between text-[#fff4e0] border-b-2 border-[#43230e]">
          <div className="flex items-center gap-2.5">
            <AlertOctagon className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-base tracking-wide">Report Record or Information</h3>
          </div>
          <button onClick={onClose} className="text-[#a47a55] hover:text-white transition-colors" aria-label="Close modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-[#fff4e0]">Report Submitted</h4>
            <p className="text-sm text-[#c8a88a]">
              Thank you. The platform integrity team will review your report and verify the specifications against physical standard documents.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="text-xs font-bold text-[#ffd899] uppercase tracking-wider block mb-1.5">
                Target Record
              </label>
              <div className="text-sm font-semibold text-[#fff4e0] bg-[#180c05] p-3 rounded-xl border border-[#43230e]">
                <span className="capitalize font-mono text-xs text-amber-400 mr-2">[{targetType}]</span>
                {targetName}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#dec2a2] block mb-1.5">Reason for Report *</label>
              <select
                value={reportType}
                onChange={e => setReportType(e.target.value as any)}
                className="w-full bg-[#150a04] border border-[#3d1f0d] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#fbebd8] focus:outline-none focus:border-amber-500 font-medium"
              >
                <option value="incorrect_specs" className="bg-[#1c0d05]">Incorrect Dimensions, Thread or Technical Specifications</option>
                <option value="duplicate_record" className="bg-[#1c0d05]">Duplicate of Another Existing Indus Code</option>
                <option value="suspicious_supplier" className="bg-[#1c0d05]">Inaccurate Supplier Information or Fraudulent Contact</option>
                <option value="misleading_listing" className="bg-[#1c0d05]">Misleading Pricing, Fake Stock or Inaccurate Unit</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#dec2a2] block mb-1.5">
                Explanation &amp; Documented Evidence *
              </label>
              <textarea
                required
                rows={4}
                value={explanation}
                onChange={e => setExplanation(e.target.value)}
                placeholder="Explain the inaccuracy in detail (e.g., standard DIN 933 pitch should be 1.5mm, or refer to IS 1364 part 2)..."
                className="w-full bg-[#150a04] border border-[#3d1f0d] rounded-xl p-3 text-xs sm:text-sm text-[#fbebd8] placeholder-[#875d38] focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#dec2a2] block mb-1.5">Your Contact Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@business.com"
                className="w-full bg-[#150a04] border border-[#3d1f0d] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#fbebd8] placeholder-[#875d38] focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#43230e]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm text-[#c8a88a] hover:text-white font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !explanation.trim()}
                className="brass-plate px-6 py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all shadow-md disabled:opacity-50 active:scale-95"
              >
                {submitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
