import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles, Star, ShieldCheck, Heart, ShoppingBag, Flame, Clock } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { setActiveView, addToCart, toggleWishlist, isInWishlist } = useShop();

  const heroProduct = PRODUCTS[0]; // Aura Fluted Ceramic Vase
  const secondaryProduct = PRODUCTS[1]; // Nordic Cast Brass Table Lamp

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-white via-blue-50/30 to-[#F8FAFC]">
      {/* Subtle background ambient glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[400px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Limited Time Offer Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-xs border border-blue-100/80 mb-6 group cursor-pointer hover:border-blue-300 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-xs font-bold text-blue-900 tracking-wide">
                Artisanal Living & Home Design Edition
              </span>
              <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                Up to 25% OFF
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] font-outfit">
              Everything You Need,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">
                Every Day.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              Discover products you love at prices you'll love. From handcrafted artisanal home goods and interior collections to everyday tech and lifestyle essentials.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => {
                  const el = document.getElementById('products-discovery');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setActiveView('categories');
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveView('deals');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Explore Deals</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 pt-8 border-t border-slate-200/70 grid grid-cols-3 gap-6 sm:gap-8 w-full max-w-xl">
              <div>
                <div className="text-2xl font-black text-slate-900 font-outfit">16+</div>
                <div className="text-xs text-slate-500 mt-0.5">Curated Categories</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 font-outfit">4.9 ★</div>
                <div className="text-xs text-slate-500 mt-0.5">Customer Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 font-outfit">FREE</div>
                <div className="text-xs text-slate-500 mt-0.5">Express 2-Day Delivery</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase with Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Main Featured Showcase Card */}
            <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl shadow-blue-900/10 border border-slate-200/70 p-4 group">
              {/* Product photo container */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                {/* Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Curator’s Choice</span>
                </div>

                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(heroProduct)}
                  className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-rose-600 shadow-sm transition-all active:scale-90"
                  aria-label="Save to wishlist"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isInWishlist(heroProduct.id) ? 'fill-rose-500 text-rose-500' : ''
                    }`}
                  />
                </button>

                {/* Quick info over image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-semibold text-blue-200 uppercase tracking-wider">
                    Artisanal Stoneware
                  </span>
                  <h3 className="text-lg font-bold leading-tight">{heroProduct.name}</h3>
                </div>
              </div>

              {/* Bottom Card Controls */}
              <div className="mt-4 flex items-center justify-between gap-4 px-1 pb-1">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-slate-900 font-outfit">
                      ${heroProduct.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      ${heroProduct.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      -{heroProduct.discountPercent}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-slate-700">{heroProduct.rating}</span>
                    <span>({heroProduct.reviewCount} reviews)</span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(heroProduct, 1)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-transform active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>

            {/* Floating Top Floating Card - Nordic Brass Lamp */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: [0, -8, 0], opacity: 1 }}
              transition={{
                y: { repeat: Infinity, duration: 5, ease: 'easeInOut' },
                opacity: { duration: 0.6, delay: 0.3 },
              }}
              className="absolute -top-6 -left-6 sm:-left-10 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl shadow-slate-900/10 border border-slate-200/80 hidden sm:flex items-center gap-3 max-w-[240px] z-10"
            >
              <img
                src={secondaryProduct.image}
                alt={secondaryProduct.name}
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                  Interior Design Pick
                </div>
                <div className="text-xs font-bold text-slate-900 truncate">
                  {secondaryProduct.name}
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-0.5">
                  ${secondaryProduct.price.toFixed(2)}
                </div>
              </div>
            </motion.div>

            {/* Floating Bottom Floating Card - Fast Checkout Guarantee */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: [0, 8, 0], opacity: 1 }}
              transition={{
                y: { repeat: Infinity, duration: 6, ease: 'easeInOut' },
                opacity: { duration: 0.6, delay: 0.4 },
              }}
              className="absolute -bottom-6 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl shadow-slate-900/10 border border-slate-200/80 hidden sm:flex items-center gap-3 z-10"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">100% Certified Quality</div>
                <div className="text-[11px] text-slate-500">Everyday Buyer Protection Included</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
