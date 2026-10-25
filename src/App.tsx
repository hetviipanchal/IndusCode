import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SupplierDirectoryPage } from './pages/SupplierDirectoryPage';
import { SupplierDashboardPage } from './pages/SupplierDashboardPage';
import { SupplierRegistrationPage } from './pages/SupplierRegistrationPage';
import { RequestIndusCodePage } from './pages/RequestIndusCodePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { TermsPrivacyModal } from './components/modals/TermsPrivacyModal';
import { ChatbotWidget } from './components/chat/ChatbotWidget';
import { Product, Supplier } from './types';
import { dbStore } from './services/dbStore';

function AppContent() {
  const { userProfile, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchCategoryId, setSearchCategoryId] = useState<string>('');
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);

  // Initialize DB store early
  useEffect(() => {
    dbStore.initialize();
  }, []);

  const handleNavigate = (tab: string, state?: any) => {
    if (state?.query) {
      setSearchQuery(state.query);
    }
    if (state?.categoryId) {
      setSearchCategoryId(state.categoryId);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSupplierClick = (supplier: Supplier) => {
    // Navigate to suppliers directory with search query or open
    setActiveTab('suppliers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#16120e] text-[#f5eedc] selection:bg-[#c27803] selection:text-white font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenSearch={q => handleNavigate('search', { query: q })}
      />

      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activeTab === 'search' && (
          <SearchPage
            initialQuery={searchQuery}
            initialCategoryId={searchCategoryId}
            onSelectProduct={handleSelectProduct}
            onRequestNewCode={() => handleNavigate('request')}
          />
        )}

        {activeTab === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => handleNavigate('search')}
            onSupplierClick={handleSupplierClick}
            onAddListingForProduct={prod => {
              setSelectedProduct(prod);
              handleNavigate('supplier-portal');
            }}
          />
        )}

        {activeTab === 'suppliers' && (
          <SupplierDirectoryPage
            onSelectProduct={handleSelectProduct}
            onRegisterSupplierClick={() => handleNavigate('supplier-register')}
          />
        )}

        {activeTab === 'supplier-register' && (
          <SupplierRegistrationPage
            onSuccess={() => handleNavigate('supplier-portal')}
            onOpenTerms={() => setModalType('terms')}
          />
        )}

        {activeTab === 'supplier-portal' && (
          <SupplierDashboardPage
            onNavigateToRequest={() => handleNavigate('request')}
            onSelectProduct={handleSelectProduct}
            preSelectedProduct={selectedProduct}
          />
        )}

        {activeTab === 'request' && (
          <RequestIndusCodePage
            onSuccess={requestId => handleNavigate(isAdmin ? 'admin' : 'supplier-portal')}
            onSelectExistingProduct={handleSelectProduct}
          />
        )}

        {activeTab === 'admin' && <AdminDashboardPage />}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={slug => handleNavigate('search', { categoryId: slug })}
      />

      <ChatbotWidget
        onSelectProduct={handleSelectProduct}
        onNavigate={handleNavigate}
      />

      {modalType && (
        <TermsPrivacyModal
          isOpen={!!modalType}
          onClose={() => setModalType(null)}
          type={modalType}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
