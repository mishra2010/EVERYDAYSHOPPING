import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { Sparkles, Eye, ShoppingBag, Heart, Check, Compass, Layers, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ArtisanalGallery: React.FC = () => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();

  const [activeSpace, setActiveSpace] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');

  const spaces = [
    { id: 'all', label: 'All Curations' },
    { id: 'living', label: 'Living Room' },
    { id: 'dining', label: 'Dining & Tea' },
    { id: 'kitchen', label: 'Kitchen & Cook' },
    { id: 'bedroom', label: 'Restful Bedroom' },
    { id: 'workspace', label: 'Studio Workspace' },
  ];

  const materials = [
    'all',
    'Stoneware & Ceramic',
    'Solid Brass',
    'French Flax Linen',
    'Damascus Steel',
  ];

  const artisanalProducts = PRODUCTS.filter((p) => {
    const isArtisanal = p.isArtisanal || p.category === 'Home & Living' || p.category === 'Kitchen';
    if (!isArtisanal) return false;

    if (activeSpace !== 'all' && p.roomType !== activeSpace) return false;

    if (selectedMaterial !== 'all') {
      if (!p.material?.toLowerCase().includes(selectedMaterial.toLowerCase().split(' ')[0])) {
        return false;
      }
    }

    return true;
  });

  return (
    <section id="artisanal-gallery" className="py-16 sm:py-24 bg-[#FAF9F6] border-y border-slate-200/60 relative overflow-hidden">
      {/* Decorative subtle texture background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-xs border border-amber-200/60 mb-3 text-amber-900 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Curated Interior Design & Artisanal Collections</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-outfit">
            The Artisanal Home
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            Slow-crafted objects made by independent master potters, metalsmiths, and weavers. Designed for timeless serenity and tactile living spaces.
          </p>
        </div>

        {/* Space Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {spaces.map((space) => (
            <button
              key={space.id}
              onClick={() => setActiveSpace(space.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeSpace === space.id
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/15 scale-105'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-slate-200/70'
              }`}
            >
              {space.label}
            </button>
          ))}
        </div>

        {/* Material Tag Filters */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto py-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
            Material:
          </span>
          {materials.map((mat) => (
            <button
              key={mat}
              onClick={() => setSelectedMaterial(mat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer capitalize ${
                selectedMaterial === mat
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-white/80 text-slate-500 hover:text-slate-800 border border-slate-200/50'
              }`}
            >
              {mat === 'all' ? 'All Materials' : mat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {artisanalProducts.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-2xl hover:shadow-slate-900/8 transition-all duration-300 flex flex-col"
              >
                {/* Image Showcase */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-900 shadow-2xs">
                      Handcrafted
                    </span>
                    {item.roomType && (
                      <span className="bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-white capitalize shadow-2xs">
                        {item.roomType}
                      </span>
                    )}
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-rose-600 shadow-xs transition-all active:scale-90"
                    aria-label="Save to wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isInWishlist(item.id) ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>

                  {/* Quick View Hover Button */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => setQuickViewProduct(item)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold shadow-lg hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View & Details</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {item.material && (
                      <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800/80 mb-1">
                        {item.material}
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.subtitle || item.description}
                    </p>

                    {item.artisanNotes && (
                      <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] italic text-slate-500 flex items-start gap-1.5">
                        <Sparkles className="w-3 h-3 text-amber-500 mt-0.5 shrink-0" />
                        <span>{item.artisanNotes}</span>
                      </div>
                    )}
                  </div>

                  {/* Price & Action */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-slate-900 font-outfit">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-semibold">
                        Free delivery eligible
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(item, 1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
