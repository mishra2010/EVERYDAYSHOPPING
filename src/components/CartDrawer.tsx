import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Heart,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  Truck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    subtotal,
    discountAmount,
    shippingCost,
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    toggleWishlist,
    setActiveView,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 100;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 font-outfit">
                Your Shopping Bag
              </h2>
              <span className="text-xs text-slate-500">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-5 py-3 bg-blue-50/70 border-b border-blue-100/80">
          <div className="flex items-center justify-between text-xs font-semibold text-blue-900 mb-1.5">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-blue-600" />
              <span>
                {progressToFreeShipping >= 100 || appliedCoupon?.isFreeShipping
                  ? '🎉 You unlocked FREE Express Shipping!'
                  : `Add $${amountNeededForFreeShipping.toFixed(2)} more for FREE shipping`}
              </span>
            </div>
            <span className="font-bold">{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="h-1.5 w-full bg-blue-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{
                width: `${appliedCoupon?.isFreeShipping ? 100 : progressToFreeShipping}%`,
              }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Your bag is empty</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Discover everyday artisan homeware, electronics, and lifestyle pieces.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-5 px-5 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex gap-3.5 p-3 rounded-2xl bg-slate-50/80 border border-slate-200/70"
                >
                  {/* Product Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-white shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 transition-colors shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {item.product.category}
                      </div>

                      <div className="text-xs font-black text-slate-900 mt-1 font-outfit">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Quantity controls & Save for later */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50">
                      {/* Plus Minus */}
                      <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2 py-0.5 shadow-2xs">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="text-slate-500 hover:text-slate-900 p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="text-slate-500 hover:text-slate-900 p-0.5"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Save for later */}
                      <button
                        onClick={() => {
                          toggleWishlist(item.product);
                          removeFromCart(item.product.id);
                        }}
                        className="text-[11px] font-semibold text-slate-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
                      >
                        <Heart className="w-3 h-3" />
                        <span>Save for later</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer with Calculation & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-white space-y-3.5">
            {/* Coupon Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="font-bold text-emerald-900">{appliedCoupon.code}</span>
                      <span className="text-emerald-700 ml-1.5">
                        ({appliedCoupon.discountPercent > 0 ? `${appliedCoupon.discountPercent}% OFF` : 'Free Shipping'})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-700 hover:text-emerald-900 font-bold text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value.toUpperCase());
                        setCouponError('');
                      }}
                      placeholder="Promo code (try WELCOME20)"
                      className="w-full pl-3 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase font-mono font-bold focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-500 font-medium mt-1">{couponError}</p>
              )}
            </div>

            {/* Financial Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-slate-900">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600 font-bold uppercase">FREE</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-100">
                <span>Total</span>
                <span className="text-base text-blue-600 font-outfit">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/20 transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
