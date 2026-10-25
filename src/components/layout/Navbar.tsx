import React, { useState, useEffect } from 'react';
import {
  Search,
  Building2,
  PlusCircle,
  Shield,
  User,
  ChevronDown,
  Layers,
  Menu,
  X,
  FileCheck,
  Sparkles,
  Command,
  ArrowRight,
  Database,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../modals/AuthModal';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: (query?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
}) => {
  const { userProfile, isAdmin, isSupplier, switchPersona } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearchInput, setNavSearchInput] = useState('');

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearchInput.trim()) {
      onOpenSearch(navSearchInput.trim());
      setNavSearchInput('');
      setMobileMenuOpen(false);
    } else {
      setActiveTab('search');
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#1c0e06] border-b-2 border-[#3e1f0c] shadow-[0_6px_25px_rgba(0,0,0,0.85)] backdrop-blur-md">
        {/* Top Notice & Quick Persona Bar */}
        <div className="bg-[#100703] text-[#a88464] text-xs px-3 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between border-b border-[#291307] select-none">
          {/* Left: Standard platform notice */}
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="font-semibold text-[#dec2a2] text-[11px] sm:text-xs truncate">
              National Hardware Product Identity Platform
            </span>
            <span className="hidden md:inline text-[#8a684f] text-[11px]">
              • Standardized Workshop Cabinet Registry for India
            </span>
          </div>

          {/* Right: Quick Status & Persona Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-[#ffd899] bg-[#241208] px-2 py-0.5 rounded border border-[#48240f]">
              <Database className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Catalog Active</span>
            </div>

            {/* Persona Switcher Quick Button */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#dec2a2] hover:text-[#fff4e0] bg-[#241208] hover:bg-[#361a0b] px-2 sm:px-2.5 py-0.5 rounded-md transition-colors border border-[#48240f]"
              title="Click to switch persona or manage credentials"
              aria-label="User role switcher"
            >
              <User className="w-3 h-3 text-[#dfa856] shrink-0" />
              <span className="hidden xs:inline text-[#8a684f]">Role:</span>
              <span className="font-bold text-[#ffd899] capitalize">
                {userProfile?.role || 'Guest'}
              </span>
              <ChevronDown className="w-3 h-3 text-[#8a684f] shrink-0" />
            </button>
          </div>
        </div>

        {/* Main Polished Hardwood Cornice Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
            {/* Brand Logo with Dark Mahogany Backing */}
            <div
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none shrink-0 group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#45220d] via-[#2f1507] to-[#1a0a03] flex items-center justify-center border-2 border-[#783e18] shadow-md relative overflow-hidden group-hover:border-[#a85922] transition-colors">
                <div className="relative font-mono font-black text-[#f5c879] tracking-tighter text-sm sm:text-base leading-none drop-shadow">
                  IDC
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="font-black text-lg sm:text-xl tracking-tight text-[#fcefdc] leading-none drop-shadow-sm">
                    INDUS
                  </span>
                  <span className="font-black text-lg sm:text-xl tracking-tight text-[#dfa856] leading-none drop-shadow-sm">
                    CODE
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#aa8464] font-medium tracking-tight -mt-0.5 hidden md:block">
                  Every Product. One Identity.
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              <button
                onClick={() => setActiveTab('search')}
                className={`px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-lg text-xs xl:text-sm font-medium transition-all flex items-center gap-1.5 ${activeTab === 'search'
                  ? 'text-[#ffd899] bg-[#43230e] border border-[#6b3815] font-semibold shadow-inner'
                  : 'text-[#dec2a2] hover:text-white hover:bg-[#321708]'
                  }`}
              >
                <Search className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#dfa856] shrink-0" />
                <span className="hidden xl:inline">Search Products</span>
                <span className="xl:hidden">Search</span>
              </button>

              <button
                onClick={() => setActiveTab('suppliers')}
                className={`px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-lg text-xs xl:text-sm font-medium transition-all flex items-center gap-1.5 ${activeTab === 'suppliers'
                  ? 'text-[#ffd899] bg-[#43230e] border border-[#6b3815] font-semibold shadow-inner'
                  : 'text-[#dec2a2] hover:text-white hover:bg-[#321708]'
                  }`}
              >
                <Building2 className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#dfa856] shrink-0" />
                <span className="hidden xl:inline">Supplier Directory</span>
                <span className="xl:hidden">Suppliers</span>
              </button>

              <button
                onClick={() => setActiveTab('request')}
                className={`px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-lg text-xs xl:text-sm font-medium transition-all flex items-center gap-1.5 ${activeTab === 'request'
                  ? 'text-[#ffd899] bg-[#43230e] border border-[#6b3815] font-semibold shadow-inner'
                  : 'text-[#dec2a2] hover:text-white hover:bg-[#321708]'
                  }`}
              >
                <PlusCircle className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#dfa856] shrink-0" />
                <span className="hidden xl:inline">Request Indus Code</span>
                <span className="xl:hidden">Request Code</span>
              </button>

              <button
                onClick={() => setActiveTab('supplier-portal')}
                className={`px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-lg text-xs xl:text-sm font-medium transition-all flex items-center gap-1.5 ${activeTab === 'supplier-portal'
                  ? 'text-[#ffd899] bg-[#43230e] border border-[#6b3815] font-semibold shadow-inner'
                  : 'text-[#dec2a2] hover:text-white hover:bg-[#321708]'
                  }`}
              >
                <Layers className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#dfa856] shrink-0" />
                <span>Supplier Portal</span>
              </button>

              {isAdmin && (
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-lg text-xs xl:text-sm font-medium transition-all flex items-center gap-1.5 ${activeTab === 'admin'
                    ? 'text-[#ffd899] bg-[#4a240d] border border-[#783e18] font-semibold shadow-inner'
                    : 'text-amber-400/90 hover:text-amber-300 hover:bg-[#361a09]'
                    }`}
                >
                  <Shield className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-amber-400 shrink-0" />
                  <span>Admin Panel</span>
                  <span className="bg-[#783d16] text-[#ffd899] border border-[#9c5120] text-[9px] px-1 py-0.2 rounded font-bold">
                    HQ
                  </span>
                </button>
              )}
            </nav>

            {/* Right Action Bar */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Quick Search Action Pill on Tablet/Mobile */}
              <button
                onClick={() => onOpenSearch()}
                className="lg:hidden p-2 rounded-lg text-[#dec2a2] hover:text-[#ffd899] hover:bg-[#2b1509] transition-colors"
                title="Search hardware products"
                aria-label="Open search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Desktop Quick Register CTA (Brushed Brass) */}
              <button
                onClick={() => setActiveTab('supplier-register')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 xl:px-3.5 py-1.5 xl:py-2 text-xs xl:text-sm brass-plate font-black rounded-lg transition-all shadow-md hover:brightness-110 shrink-0"
              >
                <FileCheck className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 text-[#1a0f00]" />
                <span className="hidden xl:inline">Register as Supplier</span>
                <span className="xl:hidden">Register</span>
              </button>

              {/* User Avatar & Account Pill */}
              <button
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-[#fcefdc] bg-[#2b1509] hover:bg-[#3d1e0c] rounded-lg transition-colors border border-[#522910] shrink-0"
                title="Switch persona or manage credentials"
                aria-label="User account"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#dfa856] to-[#a46d22] text-[#1a0f00] flex items-center justify-center text-xs font-black shrink-0 shadow-sm">
                  {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="hidden md:inline max-w-[90px] xl:max-w-[120px] truncate text-xs font-semibold text-[#dec2a2]">
                  {userProfile?.displayName?.split(' ')[0] || 'User'}
                </span>
              </button>

              {/* Mobile / Tablet Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#dec2a2] hover:text-[#fff4e0] hover:bg-[#2b1509] focus:outline-none transition-colors"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#ffd899]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Mobile & Tablet Slide-Down Drawer (Dark Cedar & Brass Theme) */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-auto bg-[#1a0e06] border-b-2 border-[#43230e] shadow-[0_25px_50px_rgba(0,0,0,0.95)] max-h-[calc(100vh-5rem)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 z-50">
            {/* Mobile Quick Search Input */}
            <div className="p-3 border-b border-[#3d1e0c] bg-[#140a04]">
              <form onSubmit={handleNavSearchSubmit} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#8a684f] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={navSearchInput}
                    onChange={e => setNavSearchInput(e.target.value)}
                    placeholder="Search 100+ hardware items, codes..."
                    className="w-full bg-[#100702] text-[#fff4e0] placeholder-[#875d38] text-xs sm:text-sm pl-9 pr-3 py-2 rounded-lg border border-[#43230e] focus:outline-none focus:border-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 brass-plate font-bold text-xs rounded-lg transition-all hover:brightness-110 shrink-0"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Navigation Buttons List */}
            <div className="p-3 space-y-1">
              <button
                onClick={() => {
                  setActiveTab('search');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${activeTab === 'search'
                  ? 'text-[#ffd899] bg-[#3d1f0d] border border-[#6b3815] font-semibold'
                  : 'text-[#dec2a2] hover:bg-[#281307]'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2b1509] border border-[#48240f] text-[#dfa856] flex items-center justify-center shrink-0">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[#fff4e0] font-semibold">Search Catalog</span>
                    <span className="block text-[11px] text-[#aa8464]">
                      Explore 100 standardized specifications
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8a684f]" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('suppliers');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${activeTab === 'suppliers'
                  ? 'text-[#ffd899] bg-[#3d1f0d] border border-[#6b3815] font-semibold'
                  : 'text-[#dec2a2] hover:bg-[#281307]'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2b1509] border border-[#48240f] text-[#dfa856] flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[#fff4e0] font-semibold">Supplier Directory</span>
                    <span className="block text-[11px] text-[#aa8464]">
                      Discover verified factories &amp; stockists
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8a684f]" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('request');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${activeTab === 'request'
                  ? 'text-[#ffd899] bg-[#3d1f0d] border border-[#6b3815] font-semibold'
                  : 'text-[#dec2a2] hover:bg-[#281307]'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2b1509] border border-[#48240f] text-[#dfa856] flex items-center justify-center shrink-0">
                    <PlusCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[#fff4e0] font-semibold">Request Indus Code</span>
                    <span className="block text-[11px] text-[#aa8464]">
                      Propose a new item for canonical assignment
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8a684f]" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('supplier-portal');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${activeTab === 'supplier-portal'
                  ? 'text-[#ffd899] bg-[#3d1f0d] border border-[#6b3815] font-semibold'
                  : 'text-[#dec2a2] hover:bg-[#281307]'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2b1509] border border-[#48240f] text-[#dfa856] flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[#fff4e0] font-semibold">Supplier Portal</span>
                    <span className="block text-[11px] text-[#aa8464]">
                      Manage price offers, MOQ, and inventory
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8a684f]" />
              </button>

              {isAdmin && (
                <button
                  onClick={() => {
                    setActiveTab('admin');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${activeTab === 'admin'
                    ? 'text-[#ffd899] bg-[#3d1f0d] border border-[#6b3815] font-semibold'
                    : 'text-[#dec2a2] hover:bg-[#281307]'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#2b1509] border border-[#48240f] text-amber-400 flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[#fff4e0] font-semibold">
                        Admin Review Panel (HQ)
                      </span>
                      <span className="block text-[11px] text-[#aa8464]">
                        Code allocation, verification &amp; governance
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8a684f]" />
                </button>
              )}
            </div>

            {/* Mobile Footer CTAs */}
            <div className="p-3 border-t border-[#3b1d0b] bg-[#120803] space-y-2">
              <button
                onClick={() => {
                  setActiveTab('supplier-register');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl brass-plate font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:brightness-110 transition-all"
              >
                <FileCheck className="w-4 h-4" />
                <span>Register as Verified Supplier</span>
              </button>

              <button
                onClick={() => {
                  setAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 rounded-lg border border-[#482510] hover:bg-[#241208] text-[#dec2a2] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-[#dfa856]" />
                <span>
                  Switch Persona (Current: <strong className="capitalize text-white">{userProfile?.role || 'Guest'}</strong>)
                </span>
              </button>
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};
