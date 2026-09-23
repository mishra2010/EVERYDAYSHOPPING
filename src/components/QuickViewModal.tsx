import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Plus,
  Minus,
} from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToast,
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = isInWishlist(product.id);
  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200 flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors z-20 shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Imagery */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-slate-50">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-2xs">
            <img
              src={galleryImages[selectedImgIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
                Save {product.discountPercent}%
              </span>
            )}
          </div>

          {/* Thumbnail Gallery Row */}
          {galleryImages.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImgIndex === idx
                      ? 'border-blue-600 ring-2 ring-blue-100'
                      : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details & Controls */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Department / Category */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>{product.category}</span>
              {product.isArtisanal && (
                <>
                  <span>·</span>
                  <span className="text-blue-600 font-bold">Artisanal Masterwork</span>
                </>
              )}
            </div>

            {/* Product Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 font-outfit leading-tight">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <span className="font-bold text-xs text-slate-800">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviewCount} reviews)</span>
              <span className="text-slate-300 mx-1">·</span>
              <span className="text-xs text-emerald-600 font-bold">In Stock</span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-2.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Material & Specs */}
            {product.material && (
              <div className="mt-4 p-3 bg-slate-50 rounded-xl text-[11px] space-y-1 text-slate-600 border border-slate-100">
                <div>
                  <span className="font-bold text-slate-800">Materials: </span>
                  {product.material}
                </div>
                {product.dimensions && (
                  <div>
                    <span className="font-bold text-slate-800">Dimensions: </span>
                    {product.dimensions}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity Picker */}
              <div className="flex items-center border border-slate-200 rounded-xl px-2.5 py-2 bg-slate-50 shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-slate-500 hover:text-slate-900 p-1"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center font-bold text-xs text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-slate-500 hover:text-slate-900 p-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 cursor-pointer shadow-md ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'border-rose-200 bg-rose-50 text-rose-600'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Quick trust guarantee */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-blue-500" /> Fast 2-Day Delivery
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" /> 30-Day Easy Returns
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
