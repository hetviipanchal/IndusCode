import React, { useState, useEffect } from 'react';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Building2,
  PackageCheck,
  Sparkles,
  ExternalLink,
  MapPin,
  Wrench,
  Boxes,
  CircleDot,
} from 'lucide-react';
import { Product, Category } from '../types';
import { dbStore } from '../services/dbStore';
import { IndusCodeBadge } from '../components/common/IndusCodeBadge';
import { HardwareProductImage } from '../components/common/HardwareProductImage';

interface HomePageProps {
  onNavigate: (tab: string, state?: any) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      await dbStore.initialize();
      const cats = await dbStore.getCategories();
      const prods = await dbStore.getProducts();
      setCategories(cats);
      setFeaturedProducts(prods.slice(0, 8));
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('search', { query: searchQuery.trim() });
    } else {
      onNavigate('search');
    }
  };

  const sampleSearchQueries = [
    { label: 'Wood Screw 3x12', query: 'Wood Screw' },
    { label: 'Hex Nut M3', query: 'Hex Nut' },
    { label: 'Padlock 20mm', query: 'Padlock' },
    { label: 'PVC Pipe', query: 'PVC Pipe' },
    { label: 'Epoxy Adhesive', query: 'Epoxy' },
    { label: 'IDC-SCW-000001', query: 'IDC-SCW-000001' },
  ];

  return (
    <div className="space-y-16 pb-16 text-[#f5eedc]">
      {/* Hero Section: Illuminated Woodworking Studio Ambient Backdrop */}
      <section className="relative bg-gradient-to-b from-[#1e0f06] via-[#2c160b] to-[#160c05] text-[#fcefdc] overflow-hidden py-16 lg:py-24 border-b-4 border-[#3e1e0b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#fdf6ec] max-w-4xl mx-auto leading-tight drop-shadow-md">
            Find Any Hardware Specification. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffe4b5] via-[#dfa856] to-[#ffbe5b]">
              Identify It. Source It.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-[#d4b596] max-w-2xl mx-auto leading-relaxed">
            Eliminate naming ambiguity across Indian industrial workshops, contractors, and factories.
            Every hardware item receives a permanent <strong>Indus Code</strong> cataloged in our national cabinet registry.
          </p>

          {/* Prominent Beveled Dark Timber Frame Search Bar */}
          <div className="mt-8 max-w-3xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center bg-[#1c0e05] rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8)] p-2 border-2 border-[#6c3b17] focus-within:border-[#a85922] focus-within:ring-4 focus-within:ring-[#dfa856]/20 transition-all gap-2"
            >
              <div className="pl-3 text-[#dfa856]">
                <Search className="w-6 h-6 text-[#dfa856]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by Indus Code (e.g. IDC-SCW-000001), item name, size, or material..."
                className="w-full bg-[#120803] text-[#fcefdc] placeholder-[#9a785d] text-sm sm:text-base font-medium focus:outline-none px-3 py-2.5 rounded-xl border border-[#3b1d0a]"
                aria-label="Search hardware products by Indus Code or specifications"
              />
              <button
                type="submit"
                className="brass-plate font-black text-[#1a0f00] hover:brightness-110 px-5 sm:px-8 py-3 rounded-xl text-sm sm:text-base transition-all shrink-0 shadow-md flex items-center gap-2"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Example Queries as Timber Blocks */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-[#cbb094]">
              <span className="text-[#a17e60] font-semibold">Cabinet Quick Queries:</span>
              {sampleSearchQueries.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(item.query);
                    onNavigate('search', { query: item.query });
                  }}
                  className="bg-[#241208] hover:bg-[#3d1f0d] text-[#eed4bc] hover:text-[#fff] px-3 py-1 rounded-md border border-[#4a2610] hover:border-[#dfa856] transition-colors font-mono shadow-2xs"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('search')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black px-7 py-3 rounded-xl text-sm transition-all shadow-xl border border-amber-400 flex items-center gap-2 hover:scale-102 active:scale-98"
            >
              <PackageCheck className="w-4 h-4 text-stone-950" />
              <span>Explore Master Cabinet Catalog</span>
            </button>
            <button
              onClick={() => onNavigate('supplier-register')}
              className="bg-[#3b1c09] text-[#ffd899] border-2 border-[#623213] hover:bg-[#4d240d] hover:border-[#8f4a1f] font-bold px-7 py-3 rounded-xl text-sm transition-all shadow-lg flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-[#dfa856]" />
              <span>Register as a Verified Supplier</span>
            </button>
          </div>
        </div>
      </section>

      {/* How Indus Code Works: Open Wooden Organizer Shelf Bays */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#dfa856] font-bold text-xs uppercase tracking-wider font-mono">
            Standardization Framework
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#fdf5ea] mt-1 drop-shadow-sm">
            How Indus Code Works
          </h2>
          <p className="text-[#c5a687] text-sm mt-2">
            A three-tier digital identity framework resolving part duplication and connecting Indian hardware supply chains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 Shelf Bay */}
          <div className="bg-wood-panel p-6 rounded-2xl relative border-2 border-[#5a3014] shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl brass-plate font-black text-xl flex items-center justify-center mb-4 shadow-md text-[#1a0f00]">
                1
              </div>
              <h3 className="font-bold text-lg text-[#fdf5ea]">1. Search or Identify</h3>
              <p className="text-[#cfb090] text-sm mt-2 leading-relaxed">
                Look up hardware by permanent Indus Code (`IDC-SCW-000001`), vernacular trade synonyms (&quot;gala bolt&quot;, &quot;matha nut&quot;), or raw MPN codes.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#4f280e] text-xs font-mono text-[#f5c879] flex items-center justify-between">
              <span>Canonical Identifier</span>
              <span className="brass-screw" />
            </div>
          </div>

          {/* Step 2 Shelf Bay */}
          <div className="bg-wood-panel p-6 rounded-2xl relative border-2 border-[#5a3014] shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl brass-plate font-black text-xl flex items-center justify-center mb-4 shadow-md text-[#1a0f00]">
                2
              </div>
              <h3 className="font-bold text-lg text-[#fdf5ea]">2. Match Specifications</h3>
              <p className="text-[#cfb090] text-sm mt-2 leading-relaxed">
                Verify standardized attributes: thread pitch, nominal diameter, material finish, storage bin locations, and national IS/ISO/DIN standards.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#4f280e] text-xs font-mono text-[#f5c879] flex items-center justify-between">
              <span>Zero-Duplicate Guardrail</span>
              <span className="brass-screw" />
            </div>
          </div>

          {/* Step 3 Shelf Bay */}
          <div className="bg-wood-panel p-6 rounded-2xl relative border-2 border-[#5a3014] shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl brass-plate font-black text-xl flex items-center justify-center mb-4 shadow-md text-[#1a0f00]">
                3
              </div>
              <h3 className="font-bold text-lg text-[#fdf5ea]">3. Discover Suppliers Across India</h3>
              <p className="text-[#cfb090] text-sm mt-2 leading-relaxed">
                Connect directly with verified manufacturing clusters in Rajkot, Ludhiana, Coimbatore, Mumbai, and Chennai listing against the canonical item.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#4f280e] text-xs font-mono text-[#f5c879] flex items-center justify-between">
              <span>Multi-Supplier One Code</span>
              <span className="brass-screw" />
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid: Pull-Out Drawer Faces with Vertical Fluted Wood Slats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-[#41210d]">
          <div>
            <h2 className="text-2xl font-extrabold text-[#fdf6ec]">
              Browse Hardware Cabinet Categories
            </h2>
            <p className="text-[#c5a687] text-sm mt-1">
              Select a workshop drawer to view verified canonical stock items.
            </p>
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="text-sm font-bold text-[#f5c879] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>Open All Drawers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map(category => (
            <div
              key={category.id}
              onClick={() => onNavigate('search', { categoryId: category.id })}
              className="group bg-[#2a1408] rounded-2xl border-2 border-[#5a2e12] hover:border-[#a85922] transition-all duration-200 cursor-pointer overflow-hidden shadow-xl hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Face Header: Ribbed Slats with Brass Handle */}
              <div className="bg-wood-slats p-4 border-b border-[#3e1e0a] relative">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black px-2.5 py-1 rounded brass-plate tracking-wider shadow-sm">
                    {category.codePrefix}
                  </span>
                  <div className="w-10 h-2 rounded-full bg-[#180a03] border border-[#5a2e12] shadow-inner" title="Drawer Handle" />
                </div>
              </div>

              {/* Drawer Content */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#241106] to-[#1c0d04]">
                <div>
                  <h3 className="font-bold text-base text-[#fcefdc] group-hover:text-[#ffd899] transition-colors leading-snug">
                    {category.name}
                  </h3>
                  <p className="text-xs text-[#b89574] mt-2 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#3b1d09] flex items-center justify-between text-xs text-[#dfa856] font-semibold">
                  <span>Pull Drawer &rarr;</span>
                  <span className="text-[11px] font-mono text-[#a88260]">10 Specs</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Verified Products: Timber Display Cubbies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-[#41210d]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-600/50 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Catalog Ingested Items</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#fdf5ea]">Featured Canonical Hardware</h2>
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="text-sm font-bold text-[#f5c879] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>Browse Full Cabinet</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="bg-[#241308] rounded-2xl border-2 border-[#482510] hover:border-[#85471d] hover:shadow-2xl transition-all cursor-pointer overflow-hidden flex flex-col justify-between group shadow-lg"
            >
              {/* Product Image / Blueprint Cubby */}
              <div className="h-44 bg-[#160a04] relative overflow-hidden border-b border-[#3b1e0d]">
                <HardwareProductImage
                  src={product.primaryImageUrl}
                  alt={product.canonicalName}
                  indusCode={product.indusCode}
                  canonicalName={product.canonicalName}
                  categoryId={product.categoryId}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 z-10">
                  <IndusCodeBadge code={product.indusCode} size="sm" showCopy={false} />
                </div>
              </div>

              {/* Product Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-gradient-to-b from-[#241308] to-[#1c0d04]">
                <div>
                  <h4 className="font-bold text-sm text-[#fdf5ea] line-clamp-2 leading-snug group-hover:text-[#ffd899] transition-colors">
                    {product.canonicalName}
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-1 text-[11px]">
                    {Object.entries(product.specifications || {}).slice(0, 2).map(([k, v]) => (
                      <span key={k} className="bg-[#180c05] text-[#dec2a2] px-2 py-0.5 rounded border border-[#3b1d0a] font-mono">
                        {String(v)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#3d1f0d] flex items-center justify-between text-xs font-semibold text-[#dfa856]">
                  <span className="group-hover:underline">
                    Inspect Specifications &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner: Craftsman Workbench Foundation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#2c1508] via-[#3d1e0c] to-[#241005] rounded-3xl p-8 sm:p-12 text-[#fcefdc] shadow-2xl relative overflow-hidden border-2 border-[#633315]">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-[#f5c879] text-xs font-mono font-bold uppercase tracking-wider bg-[#1c0c04] px-2.5 py-1 rounded border border-[#522b12]">
              For Manufacturers, Wholesalers &amp; Stockists
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#fdf5ea]">
              List Your Hardware Inventory Across India
            </h2>
            <p className="text-[#d8ba9c] text-sm sm:text-base leading-relaxed">
              Don’t create fragmented duplicate listings. Link your factory to verified canonical Indus Codes or submit new hardware specifications for official digital identity assignment.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('supplier-register')}
                className="brass-plate font-black px-6 py-3 rounded-xl text-sm transition-all shadow-xl hover:brightness-110 flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-stone-950" />
                <span>Register Your Business</span>
              </button>
              <button
                onClick={() => onNavigate('request')}
                className="bg-[#3b1b08] hover:bg-[#4d240d] text-[#ffd899] font-bold px-6 py-3 rounded-xl text-sm transition-colors border border-[#6b3815] shadow-md"
              >
                <span>Request New Indus Code</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
