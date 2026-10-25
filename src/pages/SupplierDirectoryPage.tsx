import React, { useState, useEffect, useMemo } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Search,
  Filter,
  Layers,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  PackageCheck,
  ChevronRight,
  X,
  ShieldCheck,
} from 'lucide-react';
import { Supplier, SupplierListing, Product } from '../types';
import { dbStore } from '../services/dbStore';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { IndusCodeBadge } from '../components/common/IndusCodeBadge';

interface SupplierDirectoryPageProps {
  onSelectProduct: (product: Product) => void;
  onRegisterSupplierClick: () => void;
}

export const SupplierDirectoryPage: React.FC<SupplierDirectoryPageProps> = ({
  onSelectProduct,
  onRegisterSupplierClick,
}) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [activeSupplierProfile, setActiveSupplierProfile] = useState<{
    supplier: Supplier;
    listings: { listing: SupplierListing; product: Product }[];
  } | null>(null);

  useEffect(() => {
    async function loadSuppliers() {
      await dbStore.initialize();
      const list = await dbStore.getSuppliers();
      setSuppliers(list);
      setLoading(false);
    }
    loadSuppliers();
  }, []);

  const openSupplierModal = async (sup: Supplier) => {
    const listings = await dbStore.getListingsForSupplier(sup.id);
    setActiveSupplierProfile({ supplier: sup, listings });
  };

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(s => {
      if (selectedType && s.businessType !== selectedType) return false;
      if (selectedState && s.state.toLowerCase() !== selectedState.toLowerCase()) return false;
      if (selectedCity && !s.city.toLowerCase().includes(selectedCity.toLowerCase())) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const inName = s.businessName.toLowerCase().includes(q);
        const inCity = s.city.toLowerCase().includes(q);
        const inDesc = s.description.toLowerCase().includes(q);
        const inPin = s.pinCode.includes(q);
        if (!inName && !inCity && !inDesc && !inPin) return false;
      }
      return true;
    });
  }, [suppliers, searchQuery, selectedState, selectedCity, selectedType]);

  const states = Array.from(new Set(suppliers.map(s => s.state))).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#f5eedc]">
      {/* Directory Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-[#41210d]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#dfa856] bg-[#2e1709] px-3 py-1 rounded-full border border-[#5a2e12] mb-2 shadow-inner">
            <Building2 className="w-3.5 h-3.5 text-[#dfa856]" />
            <span>Master Wooden Card Catalog Cabinet</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#fdf5ea] tracking-tight drop-shadow-sm">
            Hardware Manufacturers &amp; Suppliers Directory
          </h1>
          <p className="text-sm text-[#caa380] mt-1">
            Discover verified industrial manufacturing factories, cold-forging units, wholesalers, and stockists across India.
          </p>
        </div>

        <button
          onClick={onRegisterSupplierClick}
          className="brass-plate font-black inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs shadow-xl hover:brightness-110 transition-all shrink-0"
        >
          <Building2 className="w-4 h-4 text-stone-950" />
          <span>Register as a Supplier</span>
        </button>
      </div>

      {/* Filter Bar in Routed Dark Oak Tray */}
      <div className="bg-[#201006] p-4 rounded-2xl border-2 border-[#41210c] shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8a684f] absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search supplier, city, PIN..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#130903] border border-[#3b1d0a] text-[#fcefdc] placeholder-[#8a684f] rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div>
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="w-full py-2 px-3 text-xs bg-[#130903] border border-[#3b1d0a] text-[#fcefdc] rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          >
            <option value="">All Business Types</option>
            <option value="manufacturer">Manufacturers</option>
            <option value="wholesaler">Wholesalers</option>
            <option value="distributor">Distributors</option>
            <option value="retailer">Retailers</option>
          </select>
        </div>

        <div>
          <select
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            className="w-full py-2 px-3 text-xs bg-[#130903] border border-[#3b1d0a] text-[#fcefdc] rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          >
            <option value="">All States</option>
            {states.map(st => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="text"
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
            placeholder="Filter by city (e.g. Rajkot)..."
            className="w-full px-3 py-2 text-xs bg-[#130903] border border-[#3b1d0a] text-[#fcefdc] placeholder-[#8a684f] rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Supplier Cards Grid: Pull-Out Catalog Drawers */}
      {loading ? (
        <div className="text-center py-16 text-[#aa8565] text-sm">
          Loading master wooden card catalog...
        </div>
      ) : filteredSuppliers.length === 0 ? (
        <div className="bg-[#201006] rounded-2xl border-2 border-[#41210c] p-12 text-center space-y-3">
          <Building2 className="w-10 h-10 text-[#7a573d] mx-auto" />
          <h3 className="font-bold text-[#fdf5ea] text-base">No Matching Suppliers in Drawer</h3>
          <p className="text-xs text-[#a68262] max-w-sm mx-auto">
            Try adjusting your search query, state, or business type filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map(sup => (
            <div
              key={sup.id}
              className="bg-[#241308] rounded-2xl border-2 border-[#54290e] hover:border-[#964f1d] hover:shadow-2xl transition-all duration-200 p-5 flex flex-col justify-between space-y-4 shadow-xl text-[#fcefdc]"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-[#3d1f0d] text-[#ffd899] border border-[#6b3815] shadow-inner">
                    {sup.businessType}
                  </span>
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600/50 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified B2B Partner</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base text-[#fdf5ea] line-clamp-1">
                    {sup.businessName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#caa380] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#dfa856] shrink-0" />
                    <span>
                      {sup.city}, {sup.state} &bull; {sup.pinCode}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#caa380] line-clamp-2 leading-relaxed">
                  {sup.description}
                </p>

                {/* Service areas */}
                {sup.serviceAreas && sup.serviceAreas.length > 0 && (
                  <div className="pt-2 border-t border-[#3b1d09] flex flex-wrap gap-1 text-[10px] text-[#bda084]">
                    <span className="font-semibold text-[#f5c879]">Coverage:</span>
                    {sup.serviceAreas.map((area, idx) => (
                      <span key={idx} className="bg-[#180a03] text-[#dec2a2] px-1.5 py-0.5 rounded border border-[#3b1d09]">
                        {area}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#3b1d09] flex items-center justify-between text-xs">
                <div className="text-[11px] text-[#a88260]">
                  GST: <span className="font-mono text-[#f5c879]">{sup.gstNumber || 'Active'}</span>
                </div>

                <button
                  onClick={() => openSupplierModal(sup)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#dfa856] hover:text-white transition-colors"
                >
                  <span>View Catalog &amp; Contact</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Supplier Profile Modal: Open Oak Ledger Inspection Dossier */}
      {activeSupplierProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in text-[#fcefdc]">
          <div className="bg-[#241308] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border-2 border-[#5a2e12] overflow-hidden">
            {/* Modal Header: Dark Walnut with Brass Trim */}
            <div className="bg-[#1b0d04] text-[#fdf5ea] px-6 py-4 flex items-center justify-between border-b-2 border-[#41210d]">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#dfa856]" />
                <h3 className="font-black text-base truncate max-w-md">
                  {activeSupplierProfile.supplier.businessName}
                </h3>
              </div>
              <button
                onClick={() => setActiveSupplierProfile(null)}
                className="text-[#aa8464] hover:text-white p-1 rounded-lg hover:bg-[#3d1f0d] transition-colors"
                aria-label="Close supplier profile"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#eed8c0]">
              {/* Profile Card in Recessed Timber */}
              <div className="bg-[#180a03] p-4 rounded-xl border border-[#3b1d09] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="capitalize font-black text-sm text-[#f5c879]">
                    {activeSupplierProfile.supplier.businessType}
                  </span>
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600/50">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified B2B Partner</span>
                  </div>
                </div>

                <p className="text-[#c5a687] leading-relaxed text-xs">
                  {activeSupplierProfile.supplier.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#331707] text-[#fcefdc]">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#dfa856]" />
                    <span className="font-mono text-[#f5c879]">{activeSupplierProfile.supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#dfa856]" />
                    <span className="font-mono text-[#f5c879]">{activeSupplierProfile.supplier.email}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-[#caa380]" />
                    <span>
                      {activeSupplierProfile.supplier.address}, {activeSupplierProfile.supplier.city},{' '}
                      {activeSupplierProfile.supplier.state} - {activeSupplierProfile.supplier.pinCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Products Listed on Indus Code */}
              <div>
                <h4 className="font-bold text-sm text-[#fdf5ea] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-[#dfa856]" />
                  <span>Standardized Products Listed ({activeSupplierProfile.listings.length})</span>
                </h4>

                {activeSupplierProfile.listings.length === 0 ? (
                  <p className="text-[#a88260] text-xs italic">
                    This supplier has not yet linked active inventory to an Indus Code.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {activeSupplierProfile.listings.map(({ listing, product }) => (
                      <div
                        key={listing.id}
                        onClick={() => {
                          setActiveSupplierProfile(null);
                          onSelectProduct(product);
                        }}
                        className="p-3 bg-[#1e0e05] border border-[#482510] hover:border-[#a85922] rounded-xl cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group shadow-md"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <IndusCodeBadge code={product.indusCode} size="sm" showCopy={false} />
                            <span className="text-[11px] font-semibold text-[#a88260] uppercase">
                              {product.categoryId}
                            </span>
                          </div>
                          <h5 className="font-bold text-xs text-[#fdf5ea] group-hover:text-[#ffd899] transition-colors">
                            {product.canonicalName}
                          </h5>
                          {listing.sellerProductName && (
                            <p className="text-[11px] text-[#caa380]">
                              Seller Title: {listing.sellerProductName}
                            </p>
                          )}
                        </div>

                        <div className="text-right shrink-0">
                          {listing.price ? (
                            <div className="font-mono font-bold text-[#f5c879] text-sm">
                              ₹{listing.price.toFixed(2)}
                              <span className="text-[10px] text-[#aa8464] font-normal ml-0.5">/ {listing.unitOfSale}</span>
                            </div>
                          ) : (
                            <span className="text-[#a88260] italic">Inquire for price</span>
                          )}
                          <div className="text-[10px] text-emerald-400 font-medium">
                            MOQ: {listing.minimumOrderQuantity || 1}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#1b0d04] px-6 py-3 border-t border-[#3b1d09] flex justify-end">
              <button
                onClick={() => setActiveSupplierProfile(null)}
                className="px-4 py-2 bg-[#3d1f0d] hover:bg-[#522911] text-[#ffd899] rounded-lg text-xs font-bold border border-[#6b3815] transition-colors"
              >
                Close Ledger
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
