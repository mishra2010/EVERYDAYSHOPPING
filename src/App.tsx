import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { PromotionalBanner } from './components/PromotionalBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { ArtisanalGallery } from './components/ArtisanalGallery';
import { ProductDiscovery } from './components/ProductDiscovery';
import { DealsSection } from './components/DealsSection';
import { WishlistPage } from './components/WishlistPage';
import { AccountView } from './components/AccountView';
import { CheckoutFlow } from './components/CheckoutFlow';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { activeView } = useShop();

  return (
    <main className="min-h-screen flex flex-col">
      {/* Dynamic View Switching */}
      {activeView === 'home' && (
        <>
          <Hero />
          <ArtisanalGallery />
          <CategoryGrid />
          <ProductDiscovery />
          <DealsSection />
        </>
      )}

      {activeView === 'categories' && (
        <>
          <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold font-outfit">
              All 16 Departments & Collections
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
              Choose a category below to explore verified artisan goods, electronics, fashion, and home design.
            </p>
          </div>
          <CategoryGrid />
          <ProductDiscovery />
        </>
      )}

      {activeView === 'deals' && (
        <>
          <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white py-12 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold font-outfit">
              Seasonal Markdowns & Verified Coupons
            </h1>
            <p className="text-blue-200 text-sm mt-2 max-w-xl mx-auto">
              Copy promo codes to save up to 25% off or claim free priority shipping on every order.
            </p>
          </div>
          <DealsSection />
          <ProductDiscovery />
        </>
      )}

      {activeView === 'gallery' && (
        <>
          <ArtisanalGallery />
          <ProductDiscovery />
        </>
      )}

      {activeView === 'wishlist' && <WishlistPage />}

      {activeView === 'account' && <AccountView />}

      {activeView === 'checkout' && <CheckoutFlow />}
    </main>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
        {/* Top Promotional Banner */}
        <PromotionalBanner />

        {/* Sticky Header Navigation */}
        <Header />

        {/* Main Content Area */}
        <div className="flex-1">
          <MainContent />
        </div>

        {/* Professional Footer */}
        <Footer />

        {/* Slide-in Cart Drawer */}
        <CartDrawer />

        {/* Search Modal */}
        <SearchModal />

        {/* Quick View Modal */}
        <QuickViewModal />

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </ShopProvider>
  );
}
