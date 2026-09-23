import React, { useState, useEffect } from 'react';
import { COUPONS } from '../data/coupons';
import { useShop } from '../context/ShopContext';
import { Copy, Check, Clock, Flame, Tag, ArrowRight, Sparkles, Percent } from 'lucide-react';

export const DealsSection: React.FC = () => {
  const { applyCoupon, setActiveView, setSelectedCategory, addToast } = useShop();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Live countdown timer state (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 13,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const handleShopOffer = (code: string) => {
    applyCoupon(code);
    if (code === 'FLASH25') {
      setSelectedCategory('Home & Living');
    }
    const el = document.getElementById('products-discovery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveView('home');
    }
  };

  return (
    <section id="deals-section" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Live Countdown */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Limited Time Seasonal Savings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-outfit">
              Deals & Exclusive Coupons
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl">
              Apply verified promo codes at checkout for instant discounts on everyday artisanal goods, tech, and homeware.
            </p>
          </div>

          {/* Flash Countdown Clock Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:px-6 sm:py-3.5 shadow-lg shadow-slate-900/10 flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold uppercase tracking-wider">
              <Clock className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>Flash Ends In:</span>
            </div>
            <div className="flex items-center gap-1.5 font-outfit font-black text-lg sm:text-xl">
              <span className="bg-slate-800 px-2.5 py-1 rounded-lg min-w-[38px] text-center text-blue-400">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-slate-500">:</span>
              <span className="bg-slate-800 px-2.5 py-1 rounded-lg min-w-[38px] text-center text-blue-400">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-slate-500">:</span>
              <span className="bg-slate-800 px-2.5 py-1 rounded-lg min-w-[38px] text-center text-blue-400">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COUPONS.map((coupon) => {
            const isCopied = copiedCode === coupon.code;

            return (
              <div
                key={coupon.code}
                className="relative bg-gradient-to-b from-white to-slate-50 rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Coupon Cutout Notch aesthetics */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-r border-slate-200" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-l border-slate-200" />

                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-2xl font-black text-blue-600 font-outfit">
                      {coupon.discountPercent > 0 ? `${coupon.discountPercent}% OFF` : 'FREE SHIP'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                      Min ${coupon.minOrder}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {coupon.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {coupon.description}
                  </p>

                  {/* Progress Indicator */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mb-1">
                      <span>Claimed</span>
                      <span className="font-bold text-slate-700">{coupon.claimedPercent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${coupon.claimedPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Coupon Code Block & Action Buttons */}
                <div className="mt-6 pt-4 border-t border-dashed border-slate-200 flex flex-col gap-2.5">
                  {/* Voucher Code Capsule */}
                  <div className="flex items-center justify-between bg-white border-2 border-dashed border-blue-300 rounded-xl px-3 py-2">
                    <span className="font-mono font-black text-sm text-blue-700 tracking-wider">
                      {coupon.code}
                    </span>
                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                      title="Copy promo code"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Action CTA */}
                  <button
                    onClick={() => handleShopOffer(coupon.code)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm active:scale-98 cursor-pointer"
                  >
                    <span>{isCopied ? 'Code Applied · Shop Now' : 'Shop Offer'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
