import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { Flame, Award, Sparkles, ThumbsUp, Tag, History, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type DiscoveryTab =
  | 'trending'
  | 'best-sellers'
  | 'new-arrivals'
  | 'recommended'
  | 'top-deals'
  | 'recently-viewed';

export const ProductDiscovery: React.FC = () => {
  const { selectedCategory, setSelectedCategory, recentlyViewed } = useShop();

  const [activeTab, setActiveTab] = useState<DiscoveryTab>('trending');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const tabs: { id: DiscoveryTab; label: string; icon: React.ReactNode }[] = [
    { id: 'trending', label: 'Trending Now', icon: <Flame className="w-4 h-4 text-blue-500" /> },
    { id: 'best-sellers', label: 'Best Sellers', icon: <Award className="w-4 h-4 text-amber-500" /> },
    { id: 'new-arrivals', label: 'New Arrivals', icon: <Sparkles className="w-4 h-4 text-purple-500" /> },
    { id: 'recommended', label: 'Recommended For You', icon: <ThumbsUp className="w-4 h-4 text-emerald-500" /> },
    { id: 'top-deals', label: 'Top Deals', icon: <Tag className="w-4 h-4 text-rose-500" /> },
    { id: 'recently-viewed', label: 'Recently Viewed', icon: <History className="w-4 h-4 text-slate-500" /> },
  ];

  // Base filtering by tab
  let filtered = [...PRODUCTS];

  if (activeTab === 'trending') {
    filtered = PRODUCTS.filter((p) => p.badge === 'Trending' || p.rating >= 4.9);
  } else if (activeTab === 'best-sellers') {
    filtered = PRODUCTS.filter((p) => p.badge === 'Best Seller' || p.reviewCount >= 150);
  } else if (activeTab === 'new-arrivals') {
    filtered = PRODUCTS.filter((p) => p.badge === 'New' || p.isArtisanal);
  } else if (activeTab === 'recommended') {
    filtered = PRODUCTS.filter((p) => p.rating >= 4.85);
  } else if (activeTab === 'top-deals') {
    filtered = PRODUCTS.filter((p) => p.discountPercent >= 22);
  } else if (activeTab === 'recently-viewed') {
    filtered = recentlyViewed.length > 0 ? recentlyViewed : PRODUCTS.slice(0, 4);
  }

  // Category filter
  if (selectedCategory && selectedCategory !== 'all') {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  // Sort
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <section id="products-discovery" className="py-14 sm:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-1 font-outfit">
              Curated Discovery
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-outfit">
              Find What Inspires You
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">
              Showing {filtered.length} products curated for quality, design, and longevity
            </p>
          </div>

          {/* Controls: Category Clear & Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            {selectedCategory !== 'all' && (
              <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                <span>Filtering: {selectedCategory}</span>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="hover:text-blue-900 font-bold ml-1"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200/80 shadow-2xs text-xs font-medium text-slate-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="sort-select" className="sr-only">Sort products</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-semibold focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured / Relevant</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated (★)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Discovery Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-102'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
            <p className="text-base font-semibold text-slate-700">
              No products found for this specific filter combination.
            </p>
            <p className="text-xs text-slate-400 mt-1">Try resetting the category filter.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 px-5 py-2 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};
