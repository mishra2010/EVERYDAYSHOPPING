import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Truck, Tag, Flame, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const PromotionalBanner: React.FC = () => {
  const { setActiveView } = useShop();

  const promotions = [
    {
      icon: <Truck className="w-3.5 h-3.5 text-blue-400" />,
      text: 'Free Express Shipping on orders over $100 or with code FREESHIP',
      badge: 'Limited Offer',
      action: 'Explore Deals',
      view: 'deals' as const,
    },
    {
      icon: <Flame className="w-3.5 h-3.5 text-amber-400" />,
      text: 'Weekend Mega Sale: Up to 25% Off Handcrafted Living & Interior Collections',
      badge: 'Flash Sale',
      action: 'Shop Now',
      view: 'gallery' as const,
    },
    {
      icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" />,
      text: 'New Arrivals: Japandi Ceramic Homeware & Studio Audio Gear in Stock',
      badge: 'New Season',
      action: 'View Arrivals',
      view: 'home' as const,
    },
    {
      icon: <Tag className="w-3.5 h-3.5 text-emerald-400" />,
      text: 'First Time Here? Use code WELCOME20 at checkout for 20% off your bag',
      badge: 'Welcome Gift',
      action: 'Claim 20%',
      view: 'deals' as const,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promotions.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, promotions.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % promotions.length);
  };

  const current = promotions[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white text-xs font-medium py-2 px-4 relative overflow-hidden transition-all border-b border-blue-900/40"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Navigation arrow left */}
        <button
          onClick={prevSlide}
          className="text-slate-400 hover:text-white p-1 rounded-md transition-colors hidden sm:block"
          aria-label="Previous promotion"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center gap-2.5 text-center px-2">
          <div className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            {current.badge}
          </div>
          <span className="flex items-center gap-1.5 text-slate-200">
            {current.icon}
            <span className="line-clamp-1">{current.text}</span>
          </span>
          <button
            onClick={() => {
              setActiveView(current.view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hidden md:inline-flex items-center text-blue-300 hover:text-white font-bold ml-2 underline underline-offset-2 transition-colors cursor-pointer"
          >
            {current.action} →
          </button>
        </div>

        {/* Navigation arrow right */}
        <button
          onClick={nextSlide}
          className="text-slate-400 hover:text-white p-1 rounded-md transition-colors hidden sm:block"
          aria-label="Next promotion"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
