import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  X,
  Building2,
  ChevronRight,
  Layers,
  MapPin,
  Tag,
  AlertCircle,
  RefreshCw,
  PlusCircle,
} from 'lucide-react';
import { Product, Category } from '../types';
import { dbStore } from '../services/dbStore';
import { IndusCodeBadge } from '../components/common/IndusCodeBadge';
import { HardwareProductImage } from '../components/common/HardwareProductImage';

interface SearchPageProps {
  initialQuery?: string;
  initialCategoryId?: string;
  onSelectProduct: (product: Product) => void;
  onRequestNewCode: () => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  initialQuery = '',
  initialCategoryId = '',
  onSelectProduct,
  onRequestNewCode,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [sortBy, setSortBy] = useState<'relevance' | 'name' | 'suppliers'>('relevance');

  const [categories, setCategories] = useState<Category[]>([]);
  const [results, setResults] = useState<
    { product: Product; matchingListingsCount: number; minPrice?: number; maxPrice?: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // States and cities in India
  const indianStates = [
    'Gujarat',
    'Maharashtra',
    'Punjab',
    'Tamil Nadu',
    'Karnataka',
    'Delhi',
    'Haryana',
    'Uttar Pradesh',
    'West Bengal',
    'Rajasthan',
  ];

  const commonMaterials = [
    'Carbon Steel',
    'Stainless Steel',
    'Medium Carbon Steel',
    'Mild Steel',
    'Polyvinyl Chloride',
    'Brass',
  ];

  const commonGrades = ['Grade 8.8', 'Grade 8', 'Grade 4.8', 'Grade 10.9', 'SS 304', 'SS 316'];

  const executeSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      await dbStore.initialize();
      const res = await dbStore.searchProducts({
        query: query.trim(),
        categoryId: selectedCategory || undefined,
        material: selectedMaterial || undefined,
        grade: selectedGrade || undefined,
        state: selectedState || undefined,
        city: selectedCity || undefined,
      });
      setResults(res);
    } catch (err: any) {
      console.error('Search error:', err);
      setError('Unable to perform search query. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function loadInitial() {
      const cats = await dbStore.getCategories();
      setCategories(cats);
      await executeSearch();
    }
    loadInitial();
  }, []);

  // Re-run search when filters change
  useEffect(() => {
    executeSearch();
  }, [selectedCategory, selectedMaterial, selectedGrade, selectedState, selectedCity]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch();
  };

  const clearAllFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setSelectedMaterial('');
    setSelectedGrade('');
    setSelectedState('');
    setSelectedCity('');
  };

  const sortedResults = useMemo(() => {
    const list = [...results];
    if (sortBy === 'name') {
      list.sort((a, b) => a.product.canonicalName.localeCompare(b.product.canonicalName));
    } else if (sortBy === 'suppliers') {
      list.sort((a, b) => b.matchingListingsCount - a.matchingListingsCount);
    }
    return list;
  }, [results, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header & Main Search Bar */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">
          Hardware Product Registry &amp; Discovery
        </h1>
        <p className="text-sm text-white/90 mt-1">
          Search canonical hardware items by Indus Code, generic engineering title, vernacular names, or technical dimensions.
        </p>

        <form onSubmit={handleSearchSubmit} className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by Indus Code (IDC-FST-000001), name (Hex Bolt), standard (DIN 933), or MPN..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-2xs"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                }}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors shadow-2xs shrink-0 flex items-center gap-1.5"
          >
            <span>Search</span>
          </button>
        </form>
      </div>

      {/* Main Grid: Filters Sidebar + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Filters Sidebar */}
        <aside className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Specification Filters</span>
            </div>
            {(selectedCategory || selectedMaterial || selectedGrade || selectedState || selectedCity || query) && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-lg p-2 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  [{cat.codePrefix}] {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Material Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
              Material
            </label>
            <select
              value={selectedMaterial}
              onChange={e => setSelectedMaterial(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-lg p-2 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Materials</option>
              {commonMaterials.map(mat => (
                <option key={mat} value={mat}>
                  {mat}
                </option>
              ))}
            </select>
          </div>

          {/* Grade / Strength Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
              Grade / Property Class
            </label>
            <select
              value={selectedGrade}
              onChange={e => setSelectedGrade(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-lg p-2 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Grades</option>
              {commonGrades.map(grd => (
                <option key={grd} value={grd}>
                  {grd}
                </option>
              ))}
            </select>
          </div>

          {/* Location State Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
              Supplier State
            </label>
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded-lg p-2 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All India</option>
              {indianStates.map(st => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* City / Industrial Hub */}
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
              City / Hub Filter
            </label>
            <input
              type="text"
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              placeholder="e.g. Rajkot, Ludhiana, Mumbai..."
              className="w-full text-xs border border-slate-300 rounded-lg p-2 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
            />
          </div>

          {/* Missing Product CTA */}
          <div className="pt-4 border-t border-slate-100 bg-amber-50/50 -mx-5 -mb-5 p-5 rounded-b-xl border-dashed">
            <h4 className="text-xs font-bold text-amber-900">Can&apos;t find this product?</h4>
            <p className="text-[11px] text-amber-800 mt-1 leading-snug">
              Request a new permanent Indus Code with technical specifications.
            </p>
            <button
              onClick={onRequestNewCode}
              className="mt-3 w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Request New Code</span>
            </button>
          </div>
        </aside>

        {/* Results Area */}
        <main className="lg:col-span-3 space-y-4">
          {/* Results Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-600 font-medium">
              Showing <span className="font-bold text-slate-900">{sortedResults.length}</span> standardized hardware product{sortedResults.length === 1 ? '' : 's'}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="text-xs border border-slate-200 rounded-md py-1 px-2.5 text-slate-800 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="relevance">Relevance</option>
                <option value="name">Product Name (A-Z)</option>
                <option value="suppliers">Most Suppliers First</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
              <p className="text-sm font-medium text-slate-600">
                Searching verified hardware catalog...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
              <p className="text-sm font-medium text-red-800">{error}</p>
              <button
                onClick={executeSearch}
                className="px-4 py-1.5 text-xs font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Retry Search
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && sortedResults.length === 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">No Matching Hardware Products</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
                  We couldn&apos;t find an existing canonical product matching your query. Check for typos or request a new standardized Indus Code for this item.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onRequestNewCode}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-2xs"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Request New Indus Code Identity</span>
                </button>
              </div>
            </div>
          )}

          {/* Results List */}
          {!loading && !error && sortedResults.length > 0 && (
            <div className="space-y-4">
              {sortedResults.map(({ product, matchingListingsCount, minPrice, maxPrice }) => (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer p-4 sm:p-5 flex flex-col sm:flex-row gap-5"
                >
                  {/* Thumbnail */}
                  <div className="w-full sm:w-44 h-36 bg-slate-100 rounded-lg overflow-hidden shrink-0 relative">
                    <HardwareProductImage
                      src={product.primaryImageUrl}
                      alt={product.canonicalName}
                      indusCode={product.indusCode}
                      canonicalName={product.canonicalName}
                      categoryId={product.categoryId}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <IndusCodeBadge code={product.indusCode} size="sm" />
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          {categories.find(c => c.id === product.categoryId)?.name || product.categoryId}
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                        {product.canonicalName}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Technical Specs Pills */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {Object.entries(product.specifications || {}).slice(0, 4).map(([key, value]) => (
                          <span
                            key={key}
                            className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                          >
                            <span className="font-semibold capitalize text-slate-500">{key}:</span>
                            <span className="font-medium">{String(value)}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Status & Supplier Pricing */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                          <Building2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>
                            {matchingListingsCount > 0
                              ? `${matchingListingsCount} Approved Supplier${matchingListingsCount === 1 ? '' : 's'}`
                              : 'No Suppliers Listed Yet'}
                          </span>
                        </span>

                        {minPrice !== undefined && (
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            From ₹{minPrice.toFixed(2)}
                            {maxPrice && maxPrice > minPrice ? ` - ₹${maxPrice.toFixed(2)}` : ''}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform">
                        <span>View Specifications</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
