import React, { useState, useEffect } from 'react';
import {
  Layers,
  AlertTriangle,
  CheckCircle2,
  Search,
  ExternalLink,
  ShieldCheck,
  PlusCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { Category, Product } from '../types';
import { dbStore } from '../services/dbStore';
import { useAuth } from '../context/AuthContext';
import { IndusCodeBadge } from '../components/common/IndusCodeBadge';
import { MatchResult } from '../utils/matchingLogic';

interface RequestIndusCodePageProps {
  onSuccess: (requestId: string) => void;
  onSelectExistingProduct: (product: Product) => void;
}

export const RequestIndusCodePage: React.FC<RequestIndusCodePageProps> = ({
  onSuccess,
  onSelectExistingProduct,
}) => {
  const { userProfile } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [proposedName, setProposedName] = useState('');
  const [categoryId, setCategoryId] = useState('fasteners');
  const [description, setDescription] = useState('');
  const [mpn, setMpn] = useState('');
  const [standards, setStandards] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Structured specifications
  const [specKey1, setSpecKey1] = useState('nominalDiameter');
  const [specVal1, setSpecVal1] = useState('');
  const [specKey2, setSpecKey2] = useState('material');
  const [specVal2, setSpecVal2] = useState('');
  const [specKey3, setSpecKey3] = useState('grade');
  const [specVal3, setSpecVal3] = useState('');

  // Duplicate candidates
  const [duplicateMatches, setDuplicateMatches] = useState<MatchResult[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRequestId, setSubmittedRequestId] = useState<string | null>(null);

  useEffect(() => {
    async function loadCats() {
      await dbStore.initialize();
      const list = await dbStore.getCategories();
      setCategories(list);
    }
    loadCats();
  }, []);

  // Real-time duplicate detection as user types
  useEffect(() => {
    if (!proposedName.trim() || proposedName.trim().length < 3) {
      setDuplicateMatches([]);
      return;
    }

    const timer = setTimeout(() => {
      const specs: Record<string, any> = {};
      if (specVal1) specs[specKey1] = specVal1;
      if (specVal2) specs[specKey2] = specVal2;
      if (specVal3) specs[specKey3] = specVal3;

      const matches = dbStore.checkDuplicates({
        name: proposedName,
        categoryId,
        specifications: specs,
        mpn: mpn || undefined,
      });

      setDuplicateMatches(matches);
    }, 300);

    return () => clearTimeout(timer);
  }, [proposedName, categoryId, mpn, specVal1, specVal2, specVal3, specKey1, specKey2, specKey3]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposedName.trim()) return;

    setSubmitting(true);
    try {
      const specs: Record<string, any> = {};
      if (specVal1) specs[specKey1] = specVal1.trim();
      if (specVal2) specs[specKey2] = specVal2.trim();
      if (specVal3) specs[specKey3] = specVal3.trim();
      if (standards.trim()) specs['standards'] = standards.trim();

      const newReq = await dbStore.createProductRequest({
        requestedBy: userProfile?.uid || 'guest_requester',
        requesterEmail: userProfile?.email || 'supplier@hardware.in',
        proposedName: proposedName.trim(),
        description: description.trim(),
        categoryId,
        proposedSpecifications: specs,
        manufacturerPartNumber: mpn.trim() || undefined,
        imageUrls: imageUrl.trim() ? [imageUrl.trim()] : undefined,
        possibleMatches: duplicateMatches.slice(0, 3).map(m => ({
          indusCode: m.candidate.indusCode,
          canonicalName: m.candidate.canonicalName,
          similarityScore: m.score,
        })),
      });

      setSubmittedRequestId(newReq.id);
    } catch (err) {
      console.error('Request creation error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ffd899] bg-[#3a1d0b] px-3 py-1 rounded-full border border-[#5a2c10] mb-2">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>Catalog Standardization Registry</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#fff4e0] tracking-tight">
          Request a New Indus Code Identity
        </h1>
        <p className="text-sm text-[#c8a88a] mt-1.5 max-w-2xl leading-relaxed">
          If an existing hardware product does not have an assigned permanent Indus Code, submit its standardized technical specifications for administrative review.
        </p>
      </div>

      {submittedRequestId ? (
        <div className="bg-wood-panel rounded-2xl border-2 border-[#54290e] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-8 sm:p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-[#180c05] border-2 border-[#522910] rounded-full flex items-center justify-center text-emerald-400 mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-[#fff4e0]">Product Request Submitted</h2>
          <p className="text-sm text-[#d4b99f] max-w-lg mx-auto leading-relaxed">
            Your proposal for <strong className="text-white">&quot;{proposedName}&quot;</strong> has been recorded in the platform review queue. Our technical integrity team will inspect dimensions and assign a permanent, immutable code format (<code className="font-mono text-xs bg-[#180c05] text-[#ffd899] px-2 py-0.5 rounded border border-[#4d2810]">IDC-[CAT]-00000X</code>).
          </p>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => onSuccess(submittedRequestId)}
              className="brass-plate px-8 py-3 font-black text-sm rounded-xl transition-all shadow-md active:scale-95"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form - Rich Dark Cedar Container */}
          <div className="lg:col-span-7 bg-[#241208] rounded-2xl border-2 border-[#48240f] shadow-[0_15px_35px_rgba(0,0,0,0.8)] p-6 sm:p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Category */}
              <div>
                <label className="text-xs font-bold text-[#ffd899] uppercase tracking-wider block mb-1.5">
                  Hardware Category *
                </label>
                <select
                  required
                  value={categoryId}
                  onChange={e => setCategoryId(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-[#150a04] border border-[#3d1f0d] rounded-xl p-3 text-[#fbebd8] focus:outline-none focus:border-amber-500 font-medium"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id} className="bg-[#1c0d05] text-[#fff4e0]">
                      [{c.codePrefix}] {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Proposed Canonical Name */}
              <div>
                <label className="text-xs font-bold text-[#ffd899] uppercase tracking-wider block mb-1.5">
                  Proposed Canonical Name *
                </label>
                <input
                  type="text"
                  required
                  value={proposedName}
                  onChange={e => setProposedName(e.target.value)}
                  placeholder="e.g. Hex Head Bolt M12 x 75mm Grade 8.8 Full Thread"
                  className="w-full text-xs sm:text-sm bg-[#150a04] border border-[#3d1f0d] rounded-xl p-3 text-[#fbebd8] placeholder-[#875d38] focus:outline-none focus:border-amber-500 font-medium"
                />
                <p className="text-[11px] text-[#a47a55] mt-1.5">
                  Include primary size, diameter, length, and material grade in the title.
                </p>
              </div>

              {/* MPN / Model */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#dec2a2] block mb-1.5">
                    Manufacturer Part Number (MPN)
                  </label>
                  <input
                    type="text"
                    value={mpn}
                    onChange={e => setMpn(e.target.value)}
                    placeholder="e.g. HB-M12-75-88"
                    className="w-full text-xs sm:text-sm bg-[#150a04] border border-[#3d1f0d] rounded-xl p-3 text-[#fbebd8] placeholder-[#875d38] font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#dec2a2] block mb-1.5">
                    Applicable Standards (IS / ISO / DIN)
                  </label>
                  <input
                    type="text"
                    value={standards}
                    onChange={e => setStandards(e.target.value)}
                    placeholder="e.g. IS 1364, ISO 4017, DIN 933"
                    className="w-full text-xs sm:text-sm bg-[#150a04] border border-[#3d1f0d] rounded-xl p-3 text-[#fbebd8] placeholder-[#875d38] focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="pt-3 border-t border-[#43230e] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#ffd899] uppercase tracking-wider">
                    Key Specifications &amp; Dimensions
                  </label>
                  <span className="text-[11px] text-[#a47a55]">Structured Attributes</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-[#a47a55] uppercase font-bold">Nominal Size / Diameter</label>
                    <input
                      type="text"
                      value={specVal1}
                      onChange={e => setSpecVal1(e.target.value)}
                      placeholder="e.g. M12 or 75mm"
                      className="w-full text-xs bg-[#150a04] border border-[#3d1f0d] rounded-lg p-2.5 text-[#fbebd8] placeholder-[#875d38] focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#a47a55] uppercase font-bold">Material</label>
                    <input
                      type="text"
                      value={specVal2}
                      onChange={e => setSpecVal2(e.target.value)}
                      placeholder="e.g. High Tensile / Carbon Steel"
                      className="w-full text-xs bg-[#150a04] border border-[#3d1f0d] rounded-lg p-2.5 text-[#fbebd8] placeholder-[#875d38] focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#a47a55] uppercase font-bold">Grade / Rating</label>
                    <input
                      type="text"
                      value={specVal3}
                      onChange={e => setSpecVal3(e.target.value)}
                      placeholder="e.g. Grade 8.8 / Class 3"
                      className="w-full text-xs bg-[#150a04] border border-[#3d1f0d] rounded-lg p-2.5 text-[#fbebd8] placeholder-[#875d38] focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#a47a55] uppercase font-bold">Image URL (Optional)</label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={e => setImageUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full text-xs bg-[#150a04] border border-[#3d1f0d] rounded-lg p-2.5 text-[#fbebd8] placeholder-[#875d38] focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-[#dec2a2] block mb-1.5">
                  Intended Application &amp; Use Notes
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Explain structural application, machine tolerance, or recommended pairing..."
                  className="w-full text-xs sm:text-sm bg-[#150a04] border border-[#3d1f0d] rounded-xl p-3 text-[#fbebd8] placeholder-[#875d38] focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-4 border-t border-[#43230e] flex justify-end">
                <button
                  type="submit"
                  disabled={submitting || !proposedName.trim()}
                  className="brass-plate px-7 py-3 font-black text-xs sm:text-sm rounded-xl transition-all shadow-md disabled:opacity-50 active:scale-95"
                >
                  {submitting ? 'Checking & Submitting...' : 'Submit Request for Code Allocation'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Live Duplicate Detection Monitor - Recessed Workbench Monitor */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#180c05] text-[#fff4e0] p-6 rounded-2xl border-2 border-[#4a2610] shadow-[inset_0_4px_12px_rgba(0,0,0,0.9)] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#3d1e0c]">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span className="font-extrabold text-sm tracking-wide">Real-Time Duplicate Detector</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-600/50">
                  Active
                </span>
              </div>

              <p className="text-xs text-[#c8a88a] leading-relaxed">
                Indus Code prevents fragmented catalogs. As you type, our algorithm compares names, token distance, MPN numbers, and physical dimensions against existing canonical items.
              </p>

              {duplicateMatches.length === 0 ? (
                <div className="p-5 bg-[#120803] rounded-xl border border-[#3d1e0c] text-center text-xs text-[#a47a55]">
                  {proposedName.length >= 3
                    ? 'No high-probability duplicates detected in database.'
                    : 'Type a product title to begin duplicate similarity analysis.'}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    <span>Candidate Matches Found ({duplicateMatches.length})</span>
                  </div>

                  {duplicateMatches.map(match => (
                    <div
                      key={match.candidate.id}
                      className="bg-[#241308] p-4 rounded-xl border-2 border-[#522910] space-y-2.5 shadow-md"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <IndusCodeBadge code={match.candidate.indusCode} size="sm" showCopy={false} />
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            match.score >= 70
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-600/50'
                              : 'bg-[#331808] text-[#dec2a2]'
                          }`}
                        >
                          {match.score}% Similarity
                        </span>
                      </div>

                      <h5 className="font-bold text-xs text-[#fff4e0]">
                        {match.candidate.canonicalName}
                      </h5>

                      <div className="flex flex-wrap gap-1 text-[10px] text-[#dec2a2]">
                        {match.matchedFields.map((field, idx) => (
                          <span key={idx} className="bg-[#180c05] px-2 py-0.5 rounded border border-[#43230e]">
                            {field}
                          </span>
                        ))}
                      </div>

                      <p className="text-[11px] text-[#a47a55]">
                        {match.explanation}
                      </p>

                      <div className="pt-2 border-t border-[#3d1e0c] flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            const prod = {
                              id: match.candidate.id,
                              indusCode: match.candidate.indusCode,
                              canonicalName: match.candidate.canonicalName,
                              description: '',
                              categoryId: match.candidate.categoryId,
                              specifications: match.candidate.specifications || {},
                              status: 'approved' as const,
                              createdAt: '',
                              updatedAt: '',
                            };
                            onSelectExistingProduct(prod);
                          }}
                          className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                        >
                          <span>This matches my product &rarr; List under this code</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
