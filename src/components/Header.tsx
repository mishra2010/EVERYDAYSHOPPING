import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { BrandLogo } from './BrandLogo';
import { Search, Heart, ShoppingBag, User, Menu, X, Sparkles, Compass } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    setIsAuthOpen,
    isLoggedIn,
    user,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; view: 'home' | 'categories' | 'deals' | 'gallery'; icon?: React.ReactNode }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Categories', view: 'categories' },
    { label: 'Deals & Offers', view: 'deals' },
    {
      label: 'Artisanal Gallery',
      view: 'gallery',
      icon: <Sparkles className="w-3.5 h-3.5 text-blue-500" />,
    },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-md shadow-slate-900/5 py-3 border-b border-slate-200/80'
            : 'bg-white/90 backdrop-blur-md py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile Menu Toggle & Logo */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <button
                onClick={() => {
                  setActiveView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
              >
                <BrandLogo size="md" />
              </button>
            </div>

            {/* Middle: Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
              {navItems.map((item) => {
                const isActive = activeView === item.view;
                return (
                  <button
                    key={item.view}
                    onClick={() => {
                      setActiveView(item.view);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right: Actions (Search, Wishlist, Cart, Account) */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Search Bar / Button Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-500 bg-slate-100/90 hover:bg-slate-200/80 rounded-full transition-colors group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Search catalog"
              >
                <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                <span className="hidden sm:inline text-xs font-medium text-slate-500 group-hover:text-slate-700">
                  Search 2,000+ items...
                </span>
                <kbd className="hidden lg:inline-block text-[10px] font-semibold bg-white text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
                  ⌘K
                </kbd>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => {
                  setActiveView('wishlist');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative p-2.5 rounded-full transition-colors ${
                  activeView === 'wishlist'
                    ? 'bg-rose-50 text-rose-600'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-rose-600'
                }`}
                title="Wishlist"
                aria-label="View Wishlist"
              >
                <Heart
                  className={`w-5 h-5 transition-transform active:scale-125 ${
                    wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''
                  }`}
                />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-all duration-200 shadow-sm active:scale-95"
                title="Shopping Bag"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="text-xs font-bold">{cartCount}</span>
                {cartCount > 0 && (
                  <span className="hidden sm:inline-block text-xs font-medium text-slate-300 border-l border-slate-700 pl-2">
                    Cart
                  </span>
                )}
              </button>

              {/* Account Button */}
              <button
                onClick={() => {
                  if (isLoggedIn) {
                    setActiveView('account');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    setIsAuthOpen(true);
                  }
                }}
                className={`p-2 rounded-full transition-colors ${
                  activeView === 'account'
                    ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-500'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
                title="Account"
                aria-label="User Account"
              >
                {isLoggedIn && user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col z-10 animate-in slide-in-from-left duration-250">
            <div className="flex items-center justify-between pb-5 border-b border-slate-100">
              <BrandLogo size="md" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-2 py-6">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => {
                    setActiveView(item.view);
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-colors text-left ${
                    activeView === item.view
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.icon || <Compass className="w-4 h-4 text-slate-400" />}
                  <span>{item.label}</span>
                </button>
              ))}

              <button
                onClick={() => {
                  setActiveView('wishlist');
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors text-left ${
                  activeView === 'wishlist'
                    ? 'bg-rose-50 text-rose-600'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>My Wishlist</span>
                </div>
                {wishlist.length > 0 && (
                  <span className="text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveView('account');
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-colors text-left ${
                  activeView === 'account'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <User className="w-4 h-4 text-blue-500" />
                <span>My Account</span>
              </button>
            </div>

            {/* Bottom info */}
            <div className="mt-auto pt-6 border-t border-slate-100 text-xs text-slate-500 space-y-2">
              <p className="font-semibold text-slate-800">Everyday Shopping Guarantee</p>
              <p>Free 30-Day Returns · Carbon Neutral Delivery · 100% Verified Quality</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
