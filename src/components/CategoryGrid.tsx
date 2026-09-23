import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { useShop } from '../context/ShopContext';
import {
  Home,
  Utensils,
  Laptop,
  Smartphone,
  Shirt,
  Footprints,
  Watch,
  Sparkles,
  HeartPulse,
  ShoppingBag,
  Activity,
  BookOpen,
  Gamepad2,
  Compass,
  Cat,
  Car,
  ArrowRight,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Home,
  Utensils,
  Laptop,
  Smartphone,
  Shirt,
  Footprints,
  Watch,
  Sparkles,
  HeartPulse,
  ShoppingBag,
  Activity,
  BookOpen,
  Gamepad2,
  Compass,
  Cat,
  Car,
};

export const CategoryGrid: React.FC = () => {
  const { setSelectedCategory, setActiveView } = useShop();
  const [showAll, setShowAll] = useState(false);

  // Show 8 initially or all 16 on toggle / mobile scroll
  const displayedCategories = showAll ? CATEGORIES : CATEGORIES.slice(0, 16);

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const el = document.getElementById('products-discovery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories-section" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-1 font-outfit">
              Browse by Department
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-outfit">
              Explore 16 Curated Categories
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl">
              From design-led interior collections and artisanal homeware to personal tech and daily essentials.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedCategory('all');
                const el = document.getElementById('products-discovery');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors group cursor-pointer"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 16 Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedCategories.map((cat) => {
            const IconComponent = ICON_MAP[cat.iconName] || ShoppingBag;

            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCategory(cat.name)}
                className="group relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 hover:border-blue-200 cursor-pointer flex flex-col justify-between min-h-[160px] sm:min-h-[180px]"
              >
                {/* Background image preview with soft gradient overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover opacity-15 group-hover:opacity-25 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
                </div>

                {/* Top: Icon & Count Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-white shadow-xs border border-slate-200/60 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
                    {cat.count}+ items
                  </span>
                </div>

                {/* Bottom: Name & Description */}
                <div className="relative z-10 mt-6">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                    <span>{cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {cat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
