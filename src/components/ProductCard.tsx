import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'compact';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  layout = 'grid',
}) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-blue-200 shadow-2xs hover:shadow-xl hover:shadow-slate-900/6 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.badge && (
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-2xs ${
                product.badge === 'Trending'
                  ? 'bg-blue-600 text-white'
                  : product.badge === 'Best Seller'
                  ? 'bg-amber-500 text-slate-950 font-extrabold'
                  : product.badge === 'Top Deal'
                  ? 'bg-rose-500 text-white'
                  : product.badge === 'Artisanal'
                  ? 'bg-slate-900 text-amber-200'
                  : 'bg-indigo-600 text-white'
              }`}
            >
              {product.badge}
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-md text-slate-600 hover:text-rose-600 shadow-sm transition-transform active:scale-90 z-10"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-all duration-200 ${
              isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : 'group-hover:scale-105'
            }`}
          />
        </button>

        {/* Hover Quick View Overlay Button */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={handleQuickView}
            className="w-full py-2 px-3 rounded-xl bg-white/95 backdrop-blur-md hover:bg-slate-900 hover:text-white text-slate-900 text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Quiet Category Metadata */}
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 mb-1">
            <span>{product.category}</span>
            {product.isArtisanal && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-blue-600 font-semibold">Artisanal</span>
              </>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="font-bold text-slate-700">{product.rating}</span>
            <span className="text-slate-400 text-[11px]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-slate-900 font-outfit">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 active:scale-95 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white'
            }`}
            title="Add to Shopping Cart"
            aria-label="Add to cart"
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
