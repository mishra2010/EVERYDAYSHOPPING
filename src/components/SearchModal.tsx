import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { Product } from '../types';
import {
  Search,
  Mic,
  MicOff,
  X,
  Star,
  SlidersHorizontal,
  ArrowRight,
  TrendingUp,
  History,
  ShoppingBag,
} from 'lucide-react';
import { ProductCard } from './ProductCard';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct } = useShop();

  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [priceMax, setPriceMax] = useState<number>(500);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('popularity');
  const [isListening, setIsListening] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Popular and recent search terms
  const popularSearches = [
    'Ceramic Vase',
    'Brass Lamp',
    'Wireless Headphones',
    'Mechanical Keyboard',
    'Linen Duvet',
    'Matcha Set',
  ];

  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Stoneware',
    'Travel Luggage',
    'Minimalist Watch',
  ]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
      setIsListening(false);
    }
  }, [isSearchOpen]);

  // Voice Search Simulation / Web Speech API
  const toggleVoiceSearch = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    // Check if SpeechRecognition is available
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        setIsListening(true);

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setQuery(transcript);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch (err) {
        // fallback to simulation below
      }
    }

    // Interactive Voice search simulation if browser mic permissions or API unavailable
    setIsListening(true);
    const phrases = ['Ceramic Vase', 'Brass Table Lamp', 'Wireless Headphones', 'French Linen'];
    const chosen = phrases[Math.floor(Math.random() * phrases.length)];

    setTimeout(() => {
      setQuery(chosen);
      setIsListening(false);
    }, 1800);
  };

  if (!isSearchOpen) return null;

  // Filter products dynamically
  let results = PRODUCTS.filter((p) => {
    // text query match
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchMat = p.material?.toLowerCase().includes(q) || false;
      if (!matchName && !matchCat && !matchDesc && !matchMat) return false;
    }

    // category
    if (selectedCat !== 'all' && p.category.toLowerCase() !== selectedCat.toLowerCase()) {
      return false;
    }

    // price
    if (p.price > priceMax) return false;

    // rating
    if (p.rating < minRating) return false;

    return true;
  });

  // Sorting
  if (sortBy === 'price-asc') {
    results.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    results.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    results.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'newest') {
    results.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0));
  } else {
    // popularity
    results.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  const handleSelectTerm = (term: string) => {
    setQuery(term);
    if (!recentSearches.includes(term)) {
      setRecentSearches([term, ...recentSearches.slice(0, 4)]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-0 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-white rounded-none sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col min-h-screen sm:min-h-0 max-h-[92vh]">
        {/* Search Header Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-200/80 bg-white">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, artisanal ceramics, lighting, tech..."
                className="w-full pl-12 pr-24 py-3.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-base sm:text-lg font-medium text-slate-900 rounded-2xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
              />

              {/* Clear button if query present */}
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-12 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Voice Search Button */}
              <button
                type="button"
                onClick={toggleVoiceSearch}
                className={`absolute right-3 p-2 rounded-xl transition-all duration-200 ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
                }`}
                title={isListening ? 'Listening...' : 'Voice Search'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3.5 rounded-2xl border transition-colors flex items-center gap-2 text-sm font-semibold cursor-pointer ${
                showFilters
                  ? 'bg-blue-50 text-blue-600 border-blue-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>

            {/* Close Modal Button */}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Voice Search Feedback Indicator */}
          {isListening && (
            <div className="mt-3 flex items-center justify-center gap-2 py-2 bg-rose-50 rounded-xl text-rose-700 text-xs font-semibold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              <span>Listening to your voice query... Speak now</span>
            </div>
          )}

          {/* Filter Options Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* Category Filter */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Department</label>
                <select
                  value={selectedCat}
                  onChange={(e) => setSelectedCat(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Departments</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1.5">
                  <span>Max Price:</span>
                  <span className="text-blue-600">${priceMax}</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="500"
                  step="10"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Min Rating */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Customer Rating</label>
                <div className="flex gap-1">
                  {[0, 4.5, 4.8, 4.9].map((ratingVal) => (
                    <button
                      key={ratingVal}
                      type="button"
                      onClick={() => setMinRating(ratingVal)}
                      className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors ${
                        minRating === ratingVal
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {ratingVal === 0 ? 'All' : `${ratingVal}★+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Sort Results By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-none focus:border-blue-500"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>
          )}

          {/* Quick Tags: Recent & Popular */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-blue-500" /> Popular:
            </span>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => handleSelectTerm(term)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-700">
              {results.length} {results.length === 1 ? 'Product' : 'Products'} Found
            </h3>
            {(query || selectedCat !== 'all' || minRating > 0 || priceMax < 500) && (
              <button
                onClick={() => {
                  setQuery('');
                  setSelectedCat('all');
                  setMinRating(0);
                  setPriceMax(500);
                }}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800">No matching products found</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try using more general keywords like "lamp", "ceramic", "audio", or clear your active price filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
