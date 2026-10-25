import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Building2,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Package,
  Layers,
  Flag,
  Share2,
  ExternalLink,
  PlusCircle,
} from 'lucide-react';
import { Product, Supplier, SupplierListing } from '../types';
import { dbStore } from '../services/dbStore';
import { IndusCodeBadge } from '../components/common/IndusCodeBadge';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { HardwareProductImage } from '../components/common/HardwareProductImage';
import { ReportModal } from '../components/modals/ReportModal';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onSupplierClick: (supplier: Supplier) => void;
  onAddListingForProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onSupplierClick,
  onAddListingForProduct,
}) => {
  const [supplierOffers, setSupplierOffers] = useState<{ listing: SupplierListing; supplier: Supplier }[]>([]);
  const [aliases, setAliases] = useState<string[]>([]);
  const [loadingListings, setLoadingListings] = useState(true);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedOfferForContact, setSelectedOfferForContact] = useState<{ listing: SupplierListing; supplier: Supplier } | null>(null);

  useEffect(() => {
    async function loadProductData() {
      setLoadingListings(true);
      try {
        const offers = await dbStore.getListingsForProduct(product.id);
        setSupplierOffers(offers);
      } catch (err) {
        console.error('Failed loading supplier listings:', err);
      } finally {
        setLoadingListings(false);
      }
    }
    loadProductData();
  }, [product.id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#ffd899] bg-[#2a1408] border border-[#522910] px-4 py-2 rounded-xl shadow-md hover:bg-[#3d1f0d] hover:border-amber-600/60 transition-all group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Catalog</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setReportModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c8a88a] hover:text-red-400 bg-[#221006] border border-[#44210c] px-3.5 py-2 rounded-xl hover:border-red-600/40 transition-colors shadow-sm"
            title="Report inaccurate specifications or errors"
          >
            <Flag className="w-3.5 h-3.5 text-red-400" />
            <span>Report Discrepancy</span>
          </button>

          <button
            onClick={() => onAddListingForProduct(product)}
            className="brass-plate inline-flex items-center gap-1.5 text-xs font-extrabold px-4 py-2 rounded-xl transition-all hover:brightness-110 active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-[#1a0f00]" />
            <span>Sell This Product</span>
          </button>
        </div>
      </div>

      {/* Main Canonical Product Card - Hardwood Workshop Inspection Desk */}
      <div className="bg-wood-panel rounded-2xl border-2 border-[#54290e] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Canonical Header Banner */}
        <div className="bg-[#1b0d05] px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#43230e]">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-extrabold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Standardized Hardware Identity
            </span>
            <span className="text-[#5a3014]">•</span>
            <IndusCodeBadge code={product.indusCode} size="md" />
          </div>

          <div className="flex items-center gap-2 text-xs text-[#d6b48c] font-medium bg-[#281308] px-3 py-1 rounded-lg border border-[#4e2710]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Catalog Approved Specification</span>
          </div>
        </div>

        <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Col 1: Images in Dark Timber Inset Cubby */}
          <div className="lg:col-span-5 space-y-4">
            <div className="aspect-4/3 bg-[#120803] rounded-xl overflow-hidden border-2 border-[#4a2610] shadow-[inset_0_4px_12px_rgba(0,0,0,0.9)] p-2">
              <HardwareProductImage
                src={product.primaryImageUrl}
                alt={product.canonicalName}
                indusCode={product.indusCode}
                canonicalName={product.canonicalName}
                categoryId={product.categoryId}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            {product.additionalImages && product.additionalImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {product.additionalImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square bg-[#120803] rounded-lg overflow-hidden border border-[#4a2610] p-1 shadow-inner hover:border-amber-600 transition-colors"
                  >
                    <HardwareProductImage
                      src={img}
                      alt={`${product.canonicalName} view ${idx + 1}`}
                      indusCode={product.indusCode}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="p-4 bg-[#1a0d05] rounded-xl border border-[#44210c] text-xs text-[#c8a88a] space-y-1">
              <p className="font-bold text-[#ffd899] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                Standardized Identity Rule:
              </p>
              <p className="leading-relaxed text-[#b59578]">
                This canonical identity represents physical engineering items manufactured strictly to the stated dimensional tolerances, irrespective of individual seller brand or packaging.
              </p>
            </div>
          </div>

          {/* Col 2: Canonical Details & Spec Table */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-400/90 bg-[#351a09] px-2.5 py-1 rounded-md border border-[#5a2c10]">
                Category: {product.categoryId.replace('-', ' ')}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#fff4e0] tracking-tight mt-3">
                {product.canonicalName}
              </h1>
              <p className="text-sm text-[#d4b99f] mt-2.5 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Standards & References */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#180c05] p-4 rounded-xl border border-[#43230e] text-xs">
              <div>
                <span className="text-[#a47a55] font-bold block uppercase tracking-wider text-[10px]">
                  Documented Standards
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5 font-mono font-medium">
                  {product.standards && product.standards.length > 0
                    ? product.standards.map((s, idx) => (
                        <span key={idx} className="bg-[#291408] text-[#ffd899] px-2.5 py-1 rounded-md border border-[#522910]">
                          {s}
                        </span>
                      ))
                    : (
                      <span className="bg-[#291408] text-[#ffd899] px-2.5 py-1 rounded-md border border-[#522910]">
                        Standard Industrial Tolerances (IS / ISO)
                      </span>
                    )}
                </div>
              </div>

              <div>
                <span className="text-[#a47a55] font-bold block uppercase tracking-wider text-[10px]">
                  Manufacturer Part Number (MPN)
                </span>
                <span className="mt-2 inline-block font-mono font-semibold text-[#ffd899] bg-[#291408] px-2.5 py-1 rounded-md border border-[#522910]">
                  {product.manufacturerPartNumber || 'Generic Standard Part'}
                </span>
              </div>
            </div>

            {/* Specifications Matrix Table - Contrasting Oak & Mahogany Zebra Striping */}
            <div>
              <h3 className="text-sm font-bold text-[#ffd899] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>Technical Specifications Matrix</span>
              </h3>

              <div className="border border-[#4c260f] rounded-xl overflow-hidden shadow-lg">
                <table className="w-full text-xs text-left">
                  <tbody className="divide-y divide-[#3d1e0c]">
                    {Object.entries(product.specifications || {}).map(([key, val], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-[#251307]' : 'bg-[#1b0d05]'}>
                        <td className="px-4 py-2.5 font-bold text-[#dec2a2] capitalize w-1/3 border-r border-[#3d1e0c]">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </td>
                        <td className="px-4 py-2.5 text-[#fcefdc] font-semibold font-mono">
                          {String(val)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supplier Discovery & Commercial Offers Comparison */}
      <section className="bg-wood-panel rounded-2xl border-2 border-[#54290e] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#43230e]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ffd899] bg-[#3a1d0b] px-3 py-1 rounded-full mb-1 border border-[#5a2c10]">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Multi-Supplier Marketplace</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#fff4e0]">
              Suppliers Listing this Indus Code ({product.indusCode})
            </h2>
            <p className="text-xs text-[#c8a88a] mt-1">
              Compare registered manufacturers, wholesalers, distributors, and stockists fulfilling this exact specification across India.
            </p>
          </div>

          <button
            onClick={() => onAddListingForProduct(product)}
            className="brass-plate inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-black rounded-xl shadow-md hover:brightness-110 transition-all shrink-0 active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-[#1a0f00]" />
            <span>List as a Supplier</span>
          </button>
        </div>

        {/* Loading Suppliers */}
        {loadingListings && (
          <div className="text-center py-12 text-[#c8a88a] text-sm animate-pulse">
            Loading supplier pricing and stock availability from master registry...
          </div>
        )}

        {/* Empty Suppliers */}
        {!loadingListings && supplierOffers.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-[#4d2710] bg-[#1a0d05]/60 rounded-xl space-y-3">
            <Package className="w-10 h-10 text-[#7a4e28] mx-auto" />
            <h4 className="font-bold text-sm text-[#ffd899]">No Approved Supplier Listings Yet</h4>
            <p className="text-xs text-[#b59578] max-w-md mx-auto">
              Be the first registered manufacturer, wholesaler or distributor in India to list inventory against this standardized Indus Code.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onAddListingForProduct(product)}
                className="px-4 py-2 text-xs font-bold text-[#ffd899] bg-[#331808] hover:bg-[#45220d] rounded-lg transition-colors border border-[#623213]"
              >
                Create First Listing for this Code
              </button>
            </div>
          </div>
        )}

        {/* Supplier Offers Matrix Table */}
        {!loadingListings && supplierOffers.length > 0 && (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-[#4c260f] rounded-xl overflow-hidden shadow-lg">
                <thead className="bg-[#180c05] text-[#dec2a2] uppercase font-bold text-[11px] border-b-2 border-[#43230e]">
                  <tr>
                    <th className="px-4 py-3.5">Supplier &amp; Location</th>
                    <th className="px-4 py-3.5">Business Type</th>
                    <th className="px-4 py-3.5">Verification</th>
                    <th className="px-4 py-3.5">Price (₹ / Unit)</th>
                    <th className="px-4 py-3.5">Min. Order (MOQ)</th>
                    <th className="px-4 py-3.5">Stock Status</th>
                    <th className="px-4 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3d1e0c]">
                  {supplierOffers.map(({ listing, supplier }, idx) => (
                    <tr
                      key={listing.id}
                      className={`${idx % 2 === 0 ? 'bg-[#221106]' : 'bg-[#1c0d05]'} hover:bg-[#32190a] transition-colors`}
                    >
                      {/* Supplier */}
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => onSupplierClick(supplier)}
                          className="font-bold text-[#fff4e0] hover:text-amber-400 text-left block"
                        >
                          {supplier.businessName}
                        </button>
                        <div className="flex items-center gap-1 text-[#a47a55] text-[11px] mt-0.5">
                          <MapPin className="w-3 h-3 text-amber-500/70" />
                          <span>{supplier.city}, {supplier.state} ({supplier.pinCode})</span>
                        </div>
                      </td>

                      {/* Business Type */}
                      <td className="px-4 py-3.5 capitalize font-semibold text-[#dec2a2]">
                        {supplier.businessType}
                      </td>

                      {/* Verification Status */}
                      <td className="px-4 py-3.5">
                        <VerificationBadge status={supplier.verificationStatus} />
                      </td>

                      {/* Price */}
                      <td className="px-4 py-3.5">
                        {listing.price ? (
                          <div className="font-extrabold text-amber-400 font-mono text-sm">
                            ₹{listing.price.toFixed(2)}
                            <span className="text-[10px] text-[#a47a55] font-normal ml-1">/ {listing.unitOfSale}</span>
                          </div>
                        ) : (
                          <span className="text-[#875d38] italic">Quote on request</span>
                        )}
                      </td>

                      {/* MOQ */}
                      <td className="px-4 py-3.5 font-semibold text-[#dec2a2]">
                        {listing.minimumOrderQuantity ? `${listing.minimumOrderQuantity.toLocaleString()} ${listing.unitOfSale}s` : 'Negotiable'}
                      </td>

                      {/* Stock Status */}
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          listing.stockStatus === 'in_stock'
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/50'
                            : listing.stockStatus === 'limited_stock'
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-600/50'
                            : 'bg-[#291408] text-[#c8a88a] border border-[#4d2810]'
                        }`}>
                          {listing.stockStatus === 'in_stock' && 'In Stock'}
                          {listing.stockStatus === 'limited_stock' && 'Limited Stock'}
                          {listing.stockStatus === 'out_of_stock' && 'Out of Stock'}
                          {listing.stockStatus === 'contact_supplier' && 'Check Lead Time'}
                        </span>
                        {listing.packagingDetails && (
                          <p className="text-[10px] text-[#a47a55] mt-1 max-w-xs truncate" title={listing.packagingDetails}>
                            {listing.packagingDetails}
                          </p>
                        )}
                      </td>

                      {/* Contact Action */}
                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => setSelectedOfferForContact({ listing, supplier })}
                          className="brass-plate px-3.5 py-1.5 font-bold text-xs rounded-lg transition-all hover:brightness-110 inline-flex items-center gap-1 shadow-sm active:scale-95"
                        >
                          <Phone className="w-3 h-3 text-[#1a0f00]" />
                          <span>Contact</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Supplier Contact Dialog - Workshop Inspection Dossier */}
      {selectedOfferForContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#241308] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-w-md w-full border-2 border-[#6c3b17] overflow-hidden">
            <div className="bg-[#1b0d05] px-6 py-4 flex items-center justify-between text-[#fff4e0] border-b-2 border-[#43230e]">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-base tracking-wide">Direct Supplier Contact</h3>
              </div>
              <button
                onClick={() => setSelectedOfferForContact(null)}
                className="text-[#a47a55] hover:text-white text-xl font-bold"
                aria-label="Close contact dialog"
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-[#e8d5be]">
              <div>
                <span className="font-extrabold text-base text-[#fff4e0] block">
                  {selectedOfferForContact.supplier.businessName}
                </span>
                <span className="text-[#c8a88a] capitalize">{selectedOfferForContact.supplier.businessType}</span>
                <div className="mt-1.5">
                  <VerificationBadge status={selectedOfferForContact.supplier.verificationStatus} />
                </div>
              </div>

              <div className="bg-[#180c05] p-4 rounded-xl border border-[#43230e] space-y-2.5">
                <div className="flex items-center gap-2.5 text-[#fff4e0]">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-mono font-bold text-sm">{selectedOfferForContact.supplier.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#fff4e0]">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-mono">{selectedOfferForContact.supplier.email}</span>
                </div>
                <div className="flex items-start gap-2.5 text-[#c8a88a] pt-2 border-t border-[#3d1e0c]">
                  <MapPin className="w-4 h-4 text-amber-500/70 shrink-0 mt-0.5" />
                  <span>
                    {selectedOfferForContact.supplier.address}, {selectedOfferForContact.supplier.city}, {selectedOfferForContact.supplier.state} - {selectedOfferForContact.supplier.pinCode}
                  </span>
                </div>
              </div>

              <div className="bg-[#361a09] p-3.5 rounded-xl border border-amber-600/40 text-[#ffd899] text-[11px] leading-relaxed">
                <strong className="text-white">Standardized Reference:</strong> When calling or emailing, mention Indus Code <strong className="font-mono text-amber-300 font-bold">{product.indusCode}</strong> so the supplier immediately references the identical dimensions, thread pitch, and material specs.
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedOfferForContact(null)}
                  className="px-5 py-2 bg-[#3b1d09] text-[#ffd899] border border-[#623213] rounded-xl font-bold hover:bg-[#4d260d] transition-colors"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        targetType="product"
        targetId={product.id}
        targetName={`${product.canonicalName} (${product.indusCode})`}
      />
    </div>
  );
};
