import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  FileCheck,
  AlertCircle,
} from 'lucide-react';
import { dbStore } from '../services/dbStore';
import { useAuth } from '../context/AuthContext';
import { BusinessType } from '../types';

interface SupplierRegistrationPageProps {
  onSuccess: () => void;
  onOpenTerms: () => void;
}

export const SupplierRegistrationPage: React.FC<SupplierRegistrationPageProps> = ({
  onSuccess,
  onOpenTerms,
}) => {
  const { userProfile, updateLocalProfile } = useAuth();

  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState<BusinessType>('manufacturer');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('Gujarat');
  const [pinCode, setPinCode] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [serviceAreas, setServiceAreas] = useState('All India');
  const [consentTerms, setConsentTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const indianStates = [
    'Andhra Pradesh',
    'Delhi NCR',
    'Gujarat',
    'Haryana',
    'Karnataka',
    'Maharashtra',
    'Punjab',
    'Rajasthan',
    'Tamil Nadu',
    'Telangana',
    'Uttar Pradesh',
    'West Bengal',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentTerms) {
      setErrorMessage('You must consent to the platform terms and standardized identity rules.');
      return;
    }

    if (!pinCode.match(/^[1-9][0-9]{5}$/)) {
      setErrorMessage('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const newSup = await dbStore.registerSupplier({
        ownerUserId: userProfile?.uid || 'user_sup_reg',
        businessName: businessName.trim(),
        businessType,
        description: description.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        district: district.trim() || city.trim(),
        state,
        pinCode: pinCode.trim(),
        gstNumber: gstNumber.trim() || undefined,
        serviceAreas: serviceAreas.split(',').map(s => s.trim()).filter(Boolean),
      });

      updateLocalProfile({
        supplierId: newSup.id,
        role: 'supplier',
        accountType: 'supplier',
      });

      setRegistered(true);
    } catch (err: any) {
      console.error('Registration error:', err);
      setErrorMessage('Failed to submit supplier registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-wood-panel rounded-2xl border-2 border-[#54290e] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Banner */}
        <div className="bg-[#1b0d05] text-[#fff4e0] px-6 sm:px-8 py-6 border-b-2 border-[#43230e]">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ffd899] bg-[#3a1d0b] px-3 py-1 rounded-full border border-[#5a2c10] mb-2">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Commercial Supplier Onboarding</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#fff4e0]">Register Your Hardware Business</h1>
          <p className="text-xs sm:text-sm text-[#c8a88a] mt-1.5 leading-relaxed">
            Connect your factory, wholesale unit or retail outlet with verified Indus Code buyers across India.
          </p>
        </div>

        {registered ? (
          <div className="p-8 sm:p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-[#180c05] border-2 border-[#522910] rounded-full flex items-center justify-center text-emerald-400 mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-[#fff4e0]">Registration Submitted</h2>
            <p className="text-sm text-[#d4b99f] max-w-lg mx-auto leading-relaxed">
              Your supplier profile has been created with status <strong className="text-amber-400">Verification Pending</strong>. An administrator will review your business credentials. You can now access your Supplier Portal and begin linking product listings to existing Indus Codes.
            </p>

            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={onSuccess}
                className="brass-plate px-8 py-3 font-black text-sm rounded-xl transition-all shadow-md active:scale-95"
              >
                Go to Supplier Portal
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {errorMessage && (
              <div className="p-4 bg-red-950/80 border border-red-700/60 rounded-xl text-xs text-red-200 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Business Details */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-[#ffd899] uppercase tracking-wider pb-2 border-b border-[#43230e] flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-500" />
                <span>1. Business Identity</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-[#dec2a2] block mb-1.5">
                    Registered Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    placeholder="e.g. Mahavir Fasteners & Hardware Works"
                    className="w-full text-xs sm:text-sm bg-[#150a04] border border-[#3d1f0d] rounded-xl p-3 text-[#fbebd8] placeholder-[#875d38] focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#dec2a2] block mb-1.5">
                    Business Type *
                  </label>
                  <select
                    value={businessType}
                    onChange={e => setBusinessType(e.target.value as BusinessType)}
                    className="w-full text-xs sm:text-sm bg-[#150a04] border border-[#3d1f0d] rounded-xl p-3 text-[#fbebd8] focus:outline-none focus:border-amber-500 font-medium"
                  >
                    <option value="manufacturer" className="bg-[#1c0d05]">Manufacturer (OEM / Cold-forging / Production)</option>
                    <option value="wholesaler" className="bg-[#1c0d05]">Wholesaler / Stockist</option>
                    <option value="distributor" className="bg-[#1c0d05]">Regional Distributor / C&amp;F Agent</option>
                    <option value="retailer" className="bg-[#1c0d05]">Retailer / Hardware Store</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#dec2a2] block mb-1.5">
                    GSTIN (Optional)
                  </label>
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={e => setGstNumber(e.target.value)}
                    placeholder="24AAAAA0000A1Z5"
                    className="w-full text-xs sm:text-sm bg-[#150a04] border border-[#3d1f0d] rounded-xl p-3 text-[#fbebd8] placeholder-[#875d38] font-mono uppercase focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-[#dec2a2] block mb-1.5">
                    Business Description &amp; Specialization *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Describe your manufacturing capacity, products handled (e.g. M8 to M24 high tensile bolts, SS 304 fasteners, Class 3 pipes)..."
                    className="w-full text-xs sm:text-sm bg-[#150a04] border border-[#3d1f0d] rounded-xl p-3 text-[#fbebd8] placeholder-[#875d38] focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-[#ffd899] uppercase tracking-wider pb-2 border-b border-[#43230e] flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500" />
                <span>2. Official Contact</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#dec2a2] block mb-1.5">
                    Commercial Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="sales@yourcompany.com"
                    className="w-full text-xs sm:text-sm bg-[#150a04] border border-[#3d1f0d] rounded-xl p-3 text-[#fbebd8] placeholder-[#875d38] focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#dec2a2] block mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs sm:text-sm bg-[#150a04] border border-[#3d1f0d] rounded-xl p-3 text-[#fbebd8] placeholder-[#875d38] font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Location & Address */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-[#ffd899] uppercase tracking-wider pb-2 border-b border-[#43230e] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>3. Factory / Warehouse Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3">
                  <label className="text-xs font-semibold text-[#dec2a2] block mb-1.5">
                    Street Address / Plot / Industrial Area *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Plot 42, GIDC Phase II, Shapar"
                    className="w-full text-xs sm:text-sm bg-[#150a04] border border-[#3d1f0d] rounded-xl p-3 text-[#fbebd8] placeholder-[#875d38] focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#dec2a2] block mb-1.5">City / Industrial Hub *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="e.g. Rajkot"
                    className="w-full text-xs sm:text-sm bg-[#150a04] border border-[#3d1f0d] rounded-xl p-3 text-[#fbebd8] placeholder-[#875d38] focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#dec2a2] block mb-1.5">State *</label>
                  <select
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-[#150a04] border border-[#3d1f0d] rounded-xl p-3 text-[#fbebd8] focus:outline-none focus:border-amber-500 font-medium"
                  >
                    {indianStates.map(st => (
                      <option key={st} value={st} className="bg-[#1c0d05]">
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#dec2a2] block mb-1.5">PIN Code (6 digits) *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pinCode}
                    onChange={e => setPinCode(e.target.value)}
                    placeholder="360024"
                    className="w-full text-xs sm:text-sm bg-[#150a04] border border-[#3d1f0d] rounded-xl p-3 text-[#fbebd8] placeholder-[#875d38] font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="text-xs font-semibold text-[#dec2a2] block mb-1.5">
                    Service Areas (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={serviceAreas}
                    onChange={e => setServiceAreas(e.target.value)}
                    placeholder="e.g. All India, Gujarat, Maharashtra, Rajasthan"
                    className="w-full text-xs sm:text-sm bg-[#150a04] border border-[#3d1f0d] rounded-xl p-3 text-[#fbebd8] placeholder-[#875d38] focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Agreement & Consent */}
            <div className="pt-4 border-t border-[#43230e] space-y-3">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={consentTerms}
                  onChange={e => setConsentTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-amber-500 rounded border-[#522910] bg-[#150a04] focus:ring-amber-500"
                />
                <span className="text-xs text-[#c8a88a] leading-normal">
                  I confirm that all product listings created by my business will adhere strictly to standardized specifications of assigned Indus Codes. I agree to the{' '}
                  <button
                    type="button"
                    onClick={onOpenTerms}
                    className="text-amber-400 underline font-semibold hover:text-amber-300"
                  >
                    Platform Terms of Service &amp; Supplier Integrity Code
                  </button>
                  .
                </span>
              </label>

              <div className="bg-[#361a09] p-3.5 rounded-xl border border-amber-600/40 text-[11px] text-[#ffd899]">
                <strong className="text-white">Platform Review Policy:</strong> New profiles start in &quot;Pending Verification&quot; state until documented business credentials are authenticated by administrators.
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="brass-plate px-8 py-3.5 font-black text-sm rounded-xl transition-all shadow-md disabled:opacity-50 active:scale-95"
              >
                {submitting ? 'Submitting Registration...' : 'Submit Supplier Registration'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
