import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Heart, ShoppingBag, Trash2, Bell, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const {
    wishlist,
    toggleWishlist,
    moveToCartFromWishlist,
    addToCart,
    setActiveView,
    notifyOnSale,
    setNotifyOnSale,
    addToast,
  } = useShop();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    wishlistedProducts.forEach((p) => addToCart(p, 1));
    addToast({
      title: 'Moved to Cart',
      message: `All ${wishlistedProducts.length} items moved to your shopping bag.`,
      type: 'success',
    });
  };

  return (
    <div className="py-12 sm:py-16 bg-[#F8FAFC] min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-6">
          <button
            onClick={() => setActiveView('home')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Shopping</span>
          </button>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-outfit">
                My Saved Wishlist
              </h1>
            </div>
            <p className="text-sm text-slate-500">
              {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'} saved for later inspiration
            </p>
          </div>

          {/* Sale Alert Toggle & Move All Button */}
          {wishlistedProducts.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              {/* Sale Notification Toggle */}
              <div
                onClick={() => {
                  setNotifyOnSale(!notifyOnSale);
                  addToast({
                    title: notifyOnSale ? 'Notifications Paused' : 'Sale Alerts Activated! 🔔',
                    message: notifyOnSale
                      ? 'You will not receive instant price-drop alerts.'
                      : 'We will notify you immediately when items drop in price.',
                    type: 'info',
                  });
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer border transition-colors ${
                  notifyOnSale
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Bell className={`w-3.5 h-3.5 ${notifyOnSale ? 'fill-blue-600 text-blue-600' : ''}`} />
                <span>{notifyOnSale ? 'Price-Drop Alerts Active' : 'Notify Me on Sale'}</span>
              </div>

              {/* Move All to Bag */}
              <button
                onClick={handleMoveAllToCart}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move All to Bag</span>
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Items List / Empty State */}
        {wishlistedProducts.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Your wishlist is currently empty</h3>
            <p className="text-sm text-slate-500 mt-2">
              Discover something you love? Tap the heart icon on any product card or artisanal piece to save it here.
            </p>
            <button
              onClick={() => setActiveView('home')}
              className="mt-6 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors"
            >
              Start Exploring Products
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-slate-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.discountPercent > 0 && (
                    <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      Save {product.discountPercent}%
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-rose-500 hover:bg-white transition-colors shadow-xs"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4 text-slate-400 hover:text-rose-600" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mt-0.5">
                      {product.name}
                    </h4>

                    {/* Price with drop calculation */}
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-lg font-black text-slate-900 font-outfit">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-slate-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-xs text-emerald-600 font-bold ml-auto">
                        In Stock
                      </span>
                    </div>

                    {/* Price change badge */}
                    <div className="mt-2 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md flex items-center gap-1 font-medium">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>Dropped ${(product.originalPrice - product.price).toFixed(2)} since saved</span>
                    </div>
                  </div>

                  {/* Move to Cart Action */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => moveToCartFromWishlist(product)}
                      className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
