import React, { useState, useEffect } from 'react';
import {
  Building2,
  Package,
  PlusCircle,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  Layers,
  MapPin,
  TrendingUp,
  AlertCircle,
  Eye,
  Search,
  ExternalLink,
} from 'lucide-react';
import { Supplier, SupplierListing, Product, StockStatus } from '../types';
import { dbStore } from '../services/dbStore';
import { useAuth } from '../context/AuthContext';
import { IndusCodeBadge } from '../components/common/IndusCodeBadge';
import { VerificationBadge } from '../components/common/VerificationBadge';

interface SupplierDashboardPageProps {
  onNavigateToRequest: () => void;
  onSelectProduct: (product: Product) => void;
  preSelectedProduct?: Product | null;
}

export const SupplierDashboardPage: React.FC<SupplierDashboardPageProps> = ({
  onNavigateToRequest,
  onSelectProduct,
  preSelectedProduct,
}) => {
  const { userProfile } = useAuth();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [listings, setListings] = useState<{ listing: SupplierListing; product: Product }[]>([]);
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Add listing modal state
  const [addModalOpen, setAddModalOpen] = useState(!!preSelectedProduct);
  const [selectedProductId, setSelectedProductId] = useState(preSelectedProduct?.id || '');
  const [productSearch, setProductSearch] = useState('');
  const [sellerProductName, setSellerProductName] = useState('');
  const [price, setPrice] = useState<number>(preSelectedProduct ? 5.0 : 0);
  const [unitOfSale, setUnitOfSale] = useState('piece');
  const [moq, setMoq] = useState<number>(100);
  const [stockStatus, setStockStatus] = useState<StockStatus>('in_stock');
  const [stockQuantity, setStockQuantity] = useState<number>(5000);
  const [packagingDetails, setPackagingDetails] = useState('');
  const [submittingListing, setSubmittingListing] = useState(false);

  useEffect(() => {
    async function loadData() {
      await dbStore.initialize();
      const allProds = await dbStore.getProducts();
      setCatalogProducts(allProds);

      // Find current user's supplier profile or default to demo supplier
      let sup = null;
      if (userProfile?.supplierId) {
        sup = await dbStore.getSupplierById(userProfile.supplierId);
      }
      if (!sup && userProfile?.uid) {
        sup = await dbStore.getSupplierByUserId(userProfile.uid);
      }
      if (!sup) {
        // Fallback to sample supplier for seamless interactive exploration
        sup = (await dbStore.getSuppliers())[0] || null;
      }
      setSupplier(sup);

      if (sup) {
        const userListings = await dbStore.getListingsForSupplier(sup.id);
        setListings(userListings);
      }
      setLoading(false);
    }
    loadData();
  }, [userProfile?.supplierId, userProfile?.uid]);

  const handleStockStatusChange = async (listingId: string, newStatus: StockStatus) => {
    try {
      await dbStore.updateListing(listingId, {
        stockStatus: newStatus,
        lastStockUpdatedAt: new Date().toISOString(),
      });
      setListings(prev =>
        prev.map(item =>
          item.listing.id === listingId
            ? { ...item, listing: { ...item.listing, stockStatus: newStatus } }
            : item
        )
      );
    } catch (err) {
      console.error('Failed to update listing status:', err);
    }
  };

  const handleDeleteListing = async (listingId: string) => {
    if (!window.confirm('Are you sure you want to remove this product listing?')) return;
    try {
      await dbStore.deleteListing(listingId);
      setListings(prev => prev.filter(item => item.listing.id !== listingId));
    } catch (err) {
      console.error('Failed to delete listing:', err);
    }
  };

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || !supplier) return;

    setSubmittingListing(true);
    try {
      const newListing = await dbStore.createListing({
        supplierId: supplier.id,
        productId: selectedProductId,
        sellerProductName: sellerProductName.trim() || undefined,
        price: Number(price),
        currency: 'INR',
        unitOfSale,
        minimumOrderQuantity: Number(moq),
        stockStatus,
        stockQuantity: Number(stockQuantity),
        packagingDetails: packagingDetails.trim() || undefined,
      });

      const prod = catalogProducts.find(p => p.id === selectedProductId);
      if (prod) {
        setListings(prev => [{ listing: newListing, product: prod }, ...prev]);
      }

      setAddModalOpen(false);
      setSelectedProductId('');
      setSellerProductName('');
      setPrice(0);
      setPackagingDetails('');
    } catch (err) {
      console.error('Failed creating listing:', err);
    } finally {
      setSubmittingListing(false);
    }
  };

  // Metrics
  const activeCount = listings.filter(l => l.listing.listingStatus === 'approved').length;
  const inStockCount = listings.filter(l => l.listing.stockStatus === 'in_stock').length;

  const filteredCatalogProducts = catalogProducts.filter(p => {
    if (!productSearch.trim()) return true;
    const q = productSearch.toLowerCase();
    return (
      p.canonicalName.toLowerCase().includes(q) ||
      p.indusCode.toLowerCase().includes(q) ||
      p.categoryId.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Profile Bar - Craftsman Workshop Chassis */}
      <div className="bg-wood-panel rounded-2xl border-2 border-[#54290e] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#180c05] text-amber-400 border-2 border-[#522910] flex items-center justify-center font-bold text-2xl shadow-inner shrink-0">
            <Building2 className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#fff4e0] tracking-tight">
                {supplier?.businessName || 'Supplier Portal'}
              </h1>
              {supplier && <VerificationBadge status={supplier.verificationStatus} />}
            </div>

            <p className="text-xs text-[#d4b99f] line-clamp-1 max-w-xl">
              {supplier?.description || 'Commercial Hardware Supplier & Stockist'}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#a47a55] pt-1">
              <span className="flex items-center gap-1.5 text-[#dec2a2]">
                <MapPin className="w-3.5 h-3.5 text-amber-500/80" />
                {supplier?.city}, {supplier?.state} ({supplier?.pinCode})
              </span>
              <span className="text-[#522910]">•</span>
              <span className="capitalize font-semibold text-[#ffd899]">
                Type: {supplier?.businessType}
              </span>
              <span className="text-[#522910]">•</span>
              <span className="font-mono text-[#c8a88a]">
                GST: {supplier?.gstNumber || 'Active'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setAddModalOpen(true)}
            className="brass-plate px-4 py-2.5 font-black text-xs rounded-xl transition-all hover:brightness-110 flex items-center gap-1.5 shadow-md active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-[#1a0f00]" />
            <span>Add Product Listing</span>
          </button>

          <button
            onClick={onNavigateToRequest}
            className="px-4 py-2.5 bg-[#3b1c09] text-[#ffd899] border border-[#623213] hover:bg-[#4d240d] font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 active:scale-95"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Request New Indus Code</span>
          </button>
        </div>
      </div>

      {/* Real Computed Metrics - Solid Oak Stat Blocks with Etched Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#241308] p-6 rounded-2xl border-2 border-[#4d2810] shadow-lg space-y-1.5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>
          <div className="text-[11px] font-extrabold text-[#dec2a2] uppercase tracking-wider">
            Total Active Listings
          </div>
          <div className="text-3xl sm:text-4xl font-black text-[#fff4e0] font-mono">{activeCount}</div>
          <div className="text-[11px] text-[#a47a55]">
            Standardized items listed on Indus Code
          </div>
        </div>

        <div className="bg-[#241308] p-6 rounded-2xl border-2 border-[#4d2810] shadow-lg space-y-1.5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none"></div>
          <div className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider">
            In-Stock Inventory
          </div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-300 font-mono">{inStockCount}</div>
          <div className="text-[11px] text-[#a47a55]">
            Ready for instant dispatch &amp; transport
          </div>
        </div>

        <div className="bg-[#241308] p-6 rounded-2xl border-2 border-[#4d2810] shadow-lg space-y-1.5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none"></div>
          <div className="text-[11px] font-extrabold text-[#ffd899] uppercase tracking-wider">
            Registry Verification
          </div>
          <div className="text-sm font-bold text-[#fff4e0] pt-2 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{supplier?.verificationStatus === 'verified' ? 'Credentials Verified' : 'Verification Pending'}</span>
          </div>
          <div className="text-[11px] text-[#a47a55]">
            Administrative trust level
          </div>
        </div>
      </div>

      {/* Product Listings Table - Tool Chest Drawer Divider */}
      <div className="bg-wood-panel rounded-2xl border-2 border-[#54290e] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#43230e]">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#fff4e0]">
              My Hardware Catalog Listings ({listings.length})
            </h2>
            <p className="text-xs text-[#c8a88a] mt-1">
              Each listing connects your commercial pricing and stock to a permanent canonical Indus Code.
            </p>
          </div>

          <button
            onClick={() => setAddModalOpen(true)}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 bg-[#291408] px-3 py-1.5 rounded-lg border border-[#522910] hover:bg-[#3d1f0d] transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Link Another Product</span>
          </button>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-[#4d2710] bg-[#1a0d05]/60 rounded-xl space-y-3">
            <Package className="w-10 h-10 text-[#7a4e28] mx-auto" />
            <h4 className="font-bold text-sm text-[#ffd899]">No Listings Added Yet</h4>
            <p className="text-xs text-[#b59578] max-w-sm mx-auto">
              Select existing standardized items like M10 Hex Bolts, PVC Pipes, or Ball Bearings to start receiving buyer inquiries.
            </p>
            <button
              onClick={() => setAddModalOpen(true)}
              className="brass-plate mt-2 px-5 py-2 font-black text-xs rounded-xl shadow-md"
            >
              Add Your First Listing
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#4c260f] rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-[#180c05] text-[#dec2a2] uppercase font-bold text-[11px] border-b-2 border-[#43230e]">
                <tr>
                  <th className="px-4 py-3.5">Indus Code</th>
                  <th className="px-4 py-3.5">Canonical Product Title</th>
                  <th className="px-4 py-3.5">Your Price</th>
                  <th className="px-4 py-3.5">Min. Order</th>
                  <th className="px-4 py-3.5">Stock Status</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3d1e0c]">
                {listings.map(({ listing, product }, idx) => (
                  <tr
                    key={listing.id}
                    className={`${idx % 2 === 0 ? 'bg-[#221106]' : 'bg-[#1c0d05]'} hover:bg-[#32190a] transition-colors`}
                  >
                    {/* Indus Code */}
                    <td className="px-4 py-3.5">
                      <IndusCodeBadge code={product.indusCode} size="sm" />
                    </td>

                    {/* Canonical Product */}
                    <td className="px-4 py-3.5 max-w-xs">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="font-bold text-[#fff4e0] hover:text-amber-400 text-left line-clamp-1 block transition-colors"
                      >
                        {product.canonicalName}
                      </button>
                      {listing.sellerProductName && (
                        <p className="text-[11px] text-[#a47a55] truncate mt-0.5">
                          Seller Ref: {listing.sellerProductName}
                        </p>
                      )}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3.5 font-mono font-bold text-amber-400">
                      {listing.price ? `₹${listing.price.toFixed(2)} / ${listing.unitOfSale}` : 'Negotiable'}
                    </td>

                    {/* MOQ */}
                    <td className="px-4 py-3.5 font-semibold text-[#dec2a2]">
                      {listing.minimumOrderQuantity} {listing.unitOfSale}s
                    </td>

                    {/* Quick Stock Toggle */}
                    <td className="px-4 py-3.5">
                      <select
                        value={listing.stockStatus}
                        onChange={e => handleStockStatusChange(listing.id, e.target.value as StockStatus)}
                        className="text-xs border border-[#5a2c10] rounded-lg py-1.5 px-2.5 text-[#ffd899] bg-[#160b04] focus:outline-none focus:border-amber-500 font-medium"
                      >
                        <option value="in_stock">In Stock</option>
                        <option value="limited_stock">Limited Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                        <option value="contact_supplier">Lead Time Required</option>
                      </select>
                    </td>

                    {/* Approval Status */}
                    <td className="px-4 py-3.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-600/50">
                        {listing.listingStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right space-x-2">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="text-[#a47a55] hover:text-amber-400 p-1.5 transition-colors"
                        title="View Public Product Page"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteListing(listing.id)}
                        className="text-[#875d38] hover:text-red-400 p-1.5 transition-colors"
                        title="Delete this listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Product Listing Modal - Workshop Registry Ledger */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#241308] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-w-xl w-full max-h-[85vh] flex flex-col border-2 border-[#6c3b17] overflow-hidden">
            <div className="bg-[#1b0d05] text-[#fff4e0] px-6 py-4 flex items-center justify-between border-b-2 border-[#43230e]">
              <div className="flex items-center gap-2.5">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-base tracking-wide">Add Product Listing to Existing Indus Code</h3>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                className="text-[#a47a55] hover:text-white text-xl font-bold"
                aria-label="Close add listing modal"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="p-6 overflow-y-auto space-y-4 text-xs text-[#e8d5be]">
              {/* Step 1: Select Canonical Product */}
              <div>
                <label className="font-bold block text-[#ffd899] uppercase tracking-wider text-[11px] mb-1.5">
                  1. Select Canonical Product by Indus Code *
                </label>
                <div className="relative mb-2">
                  <Search className="w-4 h-4 text-amber-500/70 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={e => setProductSearch(e.target.value)}
                    placeholder="Search existing products (e.g. Hex Bolt, 6205, PVC)..."
                    className="w-full pl-9 pr-3 py-2 bg-[#150a04] border border-[#4d2810] rounded-xl text-xs text-[#fff4e0] placeholder-[#875d38] focus:outline-none focus:border-amber-500"
                  />
                </div>

                <select
                  required
                  value={selectedProductId}
                  onChange={e => setSelectedProductId(e.target.value)}
                  className="w-full p-2.5 bg-[#150a04] border border-[#4d2810] rounded-xl text-xs text-[#fff4e0] font-medium focus:outline-none focus:border-amber-500"
                >
                  <option value="">-- Choose Canonical Hardware Product --</option>
                  {filteredCatalogProducts.map(p => (
                    <option key={p.id} value={p.id} className="bg-[#1c0d05] text-[#fff4e0]">
                      [{p.indusCode}] {p.canonicalName}
                    </option>
                  ))}
                </select>
                <div className="mt-2 text-[11px] text-[#a47a55] flex items-center justify-between">
                  <span>Product not found in master catalog?</span>
                  <button
                    type="button"
                    onClick={() => {
                      setAddModalOpen(false);
                      onNavigateToRequest();
                    }}
                    className="text-amber-400 font-bold hover:underline"
                  >
                    Request New Indus Code &rarr;
                  </button>
                </div>
              </div>

              {/* Step 2: Commercial Pricing & Packaging */}
              <div className="pt-3 border-t border-[#43230e] space-y-3">
                <label className="font-bold block text-[#ffd899] uppercase tracking-wider text-[11px]">
                  2. Commercial Offer &amp; Stock Terms
                </label>

                <div>
                  <label className="text-[11px] font-semibold text-[#dec2a2] block mb-1">
                    Your Internal Trade / Catalog Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={sellerProductName}
                    onChange={e => setSellerProductName(e.target.value)}
                    placeholder="e.g. 10x50 High-Tensile Batch 2026 Black Finish"
                    className="w-full p-2.5 bg-[#150a04] border border-[#4d2810] rounded-xl text-xs text-[#fff4e0] placeholder-[#875d38] focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#dec2a2] block mb-1">
                      Selling Price (₹ INR) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      min="0.01"
                      value={price || ''}
                      onChange={e => setPrice(parseFloat(e.target.value) || 0)}
                      placeholder="e.g. 5.50"
                      className="w-full p-2.5 bg-[#150a04] border border-[#4d2810] rounded-xl text-xs font-mono text-amber-400 placeholder-[#875d38] focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#dec2a2] block mb-1">
                      Unit of Sale *
                    </label>
                    <select
                      value={unitOfSale}
                      onChange={e => setUnitOfSale(e.target.value)}
                      className="w-full p-2.5 bg-[#150a04] border border-[#4d2810] rounded-xl text-xs text-[#fff4e0] focus:outline-none focus:border-amber-500"
                    >
                      <option value="piece" className="bg-[#1c0d05]">Piece (pc)</option>
                      <option value="box" className="bg-[#1c0d05]">Box (100 / 500 pcs)</option>
                      <option value="kg" className="bg-[#1c0d05]">Kilogram (kg)</option>
                      <option value="metre" className="bg-[#1c0d05]">Metre (m)</option>
                      <option value="pack" className="bg-[#1c0d05]">Pack / Bundle</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#dec2a2] block mb-1">
                      Minimum Order Qty (MOQ) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={moq || ''}
                      onChange={e => setMoq(parseInt(e.target.value, 10) || 1)}
                      placeholder="e.g. 200"
                      className="w-full p-2.5 bg-[#150a04] border border-[#4d2810] rounded-xl text-xs font-mono text-[#fff4e0] placeholder-[#875d38] focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#dec2a2] block mb-1">
                      Stock Status *
                    </label>
                    <select
                      value={stockStatus}
                      onChange={e => setStockStatus(e.target.value as StockStatus)}
                      className="w-full p-2.5 bg-[#150a04] border border-[#4d2810] rounded-xl text-xs text-[#fff4e0] focus:outline-none focus:border-amber-500"
                    >
                      <option value="in_stock" className="bg-[#1c0d05]">In Stock (Immediate Dispatch)</option>
                      <option value="limited_stock" className="bg-[#1c0d05]">Limited Stock</option>
                      <option value="out_of_stock" className="bg-[#1c0d05]">Out of Stock</option>
                      <option value="contact_supplier" className="bg-[#1c0d05]">Lead Time / Made to Order</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#dec2a2] block mb-1">
                    Packaging Details (Carton size, bundles, bags)
                  </label>
                  <input
                    type="text"
                    value={packagingDetails}
                    onChange={e => setPackagingDetails(e.target.value)}
                    placeholder="e.g. Carton of 500 pcs in heavy polybags with IS standard label"
                    className="w-full p-2.5 bg-[#150a04] border border-[#4d2810] rounded-xl text-xs text-[#fff4e0] placeholder-[#875d38] focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#43230e] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-5 py-2 text-[#c8a88a] hover:text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingListing || !selectedProductId}
                  className="brass-plate px-6 py-2.5 font-black rounded-xl transition-all shadow-md disabled:opacity-50 active:scale-95"
                >
                  {submittingListing ? 'Publishing...' : 'Publish Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
