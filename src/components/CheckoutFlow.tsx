import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Address, Order } from '../types';
import confetti from 'canvas-confetti';
import {
  Check,
  ShoppingBag,
  MapPin,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Lock,
  Sparkles,
  Download,
  Copy,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CheckoutFlow: React.FC = () => {
  const {
    cart,
    subtotal,
    discountAmount,
    shippingCost,
    finalTotal,
    appliedCoupon,
    addresses,
    createOrder,
    lastCreatedOrder,
    setActiveView,
    addToast,
  } = useShop();

  // 1: Cart Review, 2: Address, 3: Payment, 4: Review Order, 5: Confirmation
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Address Selection
  const [selectedAddress, setSelectedAddress] = useState<Address>(addresses[0]);

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'klarna' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('883');
  const [cardName, setCardName] = useState(addresses[0]?.fullName || 'Pooja Panchal');

  // Shipping Speed
  const [shippingSpeed, setShippingSpeed] = useState<'standard' | 'express'>('express');

  // Newly placed order holder
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Trigger Confetti on Confirmation Step
  useEffect(() => {
    if (currentStep === 5) {
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563EB', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
        });
      } catch (e) {
        // ignore
      }
    }
  }, [currentStep]);

  const handlePlaceOrder = () => {
    const paymentLabel =
      paymentMethod === 'card'
        ? `Visa (•••• ${cardNumber.slice(-4)})`
        : paymentMethod === 'apple'
        ? 'Apple Pay / 1-Click'
        : paymentMethod === 'klarna'
        ? 'Klarna 4-Pay'
        : 'Cash on Delivery';

    const order = createOrder(selectedAddress, paymentLabel);
    setPlacedOrder(order);
    setCurrentStep(5);
  };

  const steps = [
    { num: 1, label: 'Cart' },
    { num: 2, label: 'Delivery' },
    { num: 3, label: 'Payment' },
    { num: 4, label: 'Review' },
    { num: 5, label: 'Complete' },
  ];

  if (cart.length === 0 && currentStep !== 5) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 font-outfit">Your Bag is Empty</h2>
        <p className="text-xs text-slate-500 mt-2">
          You don’t have any items in your checkout session. Add some artisanal goods to begin!
        </p>
        <button
          onClick={() => setActiveView('home')}
          className="mt-6 px-6 py-2.5 rounded-full bg-blue-600 text-white font-bold text-xs hover:bg-blue-700"
        >
          Browse Collections
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-16 bg-[#F8FAFC] min-h-[85vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Progression Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 w-full z-0" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-blue-600 transition-all duration-500 z-0"
              style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            />

            {steps.map((s) => {
              const isCompleted = currentStep > s.num;
              const isCurrent = currentStep === s.num;

              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isCompleted
                        ? 'bg-blue-600 text-white'
                        : isCurrent
                        ? 'bg-slate-900 text-white ring-4 ring-blue-100'
                        : 'bg-white border-2 border-slate-200 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`text-[11px] font-semibold mt-2 hidden sm:block ${
                      isCurrent ? 'text-slate-900 font-bold' : 'text-slate-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 1: CART REVIEW */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900 font-outfit">
                1. Review Items in Bag ({cart.length})
              </h2>
              <span className="text-xs text-slate-500">Free 30-Day Returns</span>
            </div>

            <div className="divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.product.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover bg-slate-100"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.product.name}</h4>
                      <p className="text-xs text-slate-400">{item.product.category}</p>
                      <p className="text-xs font-semibold text-slate-600 mt-1">
                        Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-slate-900 font-outfit">
                    ${(item.quantity * item.product.price).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setActiveView('home')}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Add More Products</span>
              </button>

              <button
                onClick={() => setCurrentStep(2)}
                className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-2"
              >
                <span>Continue to Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DELIVERY ADDRESS */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900 font-outfit">2. Shipping Address</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Where should we dispatch your artisanal package?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((addr) => {
                const isSelected = selectedAddress.id === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-slate-900">{addr.fullName}</span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600">{addr.street}</p>
                    <p className="text-xs text-slate-600">
                      {addr.city}, {addr.state} {addr.zipCode}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 font-medium">{addr.phone}</p>
                  </div>
                );
              })}
            </div>

            {/* Delivery Speed Options */}
            <div className="pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-900 block mb-3">
                Select Shipping Speed
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div
                  onClick={() => setShippingSpeed('express')}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center justify-between ${
                    shippingSpeed === 'express'
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-bold text-slate-900">Priority Express (2-3 Days)</div>
                      <div className="text-[11px] text-slate-500">Safe insulated packaging</div>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>

                <div
                  onClick={() => setShippingSpeed('standard')}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center justify-between ${
                    shippingSpeed === 'standard'
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-slate-200'
                  }`}
                >
                  <div>
                    <div className="font-bold text-slate-900">Standard Eco Ground (4-5 Days)</div>
                    <div className="text-[11px] text-slate-500">100% Carbon Neutral</div>
                  </div>
                  <span className="font-bold text-slate-600">Included</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setCurrentStep(3)}
                className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-2"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PAYMENT METHOD */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-outfit">
                  3. Select Payment Method
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Transactions are encrypted with SSL 256-bit security
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                <Lock className="w-3.5 h-3.5" />
                <span>Secure Checkout</span>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { id: 'card', label: 'Credit Card', icon: CreditCard },
                { id: 'apple', label: 'Apple Pay', icon: Sparkles },
                { id: 'klarna', label: 'Klarna 4-Pay', icon: ShoppingBag },
                { id: 'cod', label: 'Cash on Delivery', icon: Truck },
              ].map((p) => {
                const Icon = p.icon;
                const isSelected = paymentMethod === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPaymentMethod(p.id as any)}
                    className={`p-3 rounded-xl border-2 font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 text-blue-700'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Card Inputs Form */}
            {paymentMethod === 'card' && (
              <div className="space-y-4 pt-2">
                {/* Visual Card Preview */}
                <div className="max-w-sm mx-auto bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
                  <div className="flex justify-between items-center text-xs tracking-wider opacity-80 font-bold">
                    <span>EVERYDAY SHOPPING VAULT</span>
                    <span>VISA</span>
                  </div>
                  <div className="my-5 text-base font-mono tracking-widest font-bold">
                    {cardNumber}
                  </div>
                  <div className="flex justify-between text-xs text-slate-200">
                    <div>
                      <div className="text-[9px] uppercase tracking-wider opacity-70">Cardholder</div>
                      <div className="font-bold">{cardName}</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider opacity-70">Expires</div>
                      <div className="font-bold">{cardExp}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Name on Card</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Security Code (CVV)</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="•••"
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'apple' && (
              <div className="p-8 text-center bg-slate-50 rounded-2xl">
                <Sparkles className="w-8 h-8 text-slate-900 mx-auto mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">Apple Pay Instant Express</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Authenticate with Touch ID or Face ID on the next confirmation step.
                </p>
              </div>
            )}

            {paymentMethod === 'klarna' && (
              <div className="p-6 bg-pink-50/70 border border-pink-200 rounded-2xl text-xs space-y-2">
                <div className="font-bold text-pink-950 text-sm">Pay in 4 interest-free installments</div>
                <p className="text-pink-900">
                  4 payments of <span className="font-bold">${(finalTotal / 4).toFixed(2)}</span> billed every 2 weeks. Zero interest.
                </p>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-6 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs">
                <div className="font-bold text-amber-950 text-sm">Cash on Delivery</div>
                <p className="text-amber-900 mt-1">
                  Pay with exact cash or card terminal upon courier arrival.
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setCurrentStep(4)}
                className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-2"
              >
                <span>Review Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW ORDER */}
        {currentStep === 4 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900 font-outfit">
                4. Final Order Verification
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Please double-check your items and delivery destination before placing order.
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
                <div className="flex justify-between font-bold text-slate-900 mb-1">
                  <span>Shipping Destination</span>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <p className="font-semibold text-slate-800">{selectedAddress.fullName}</p>
                <p className="text-slate-600">{selectedAddress.street}</p>
                <p className="text-slate-600">
                  {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}
                </p>
                <p className="text-slate-500 mt-1">{selectedAddress.phone}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
                <div className="flex justify-between font-bold text-slate-900 mb-1">
                  <span>Payment Method</span>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <p className="font-semibold text-slate-800 capitalize">
                  {paymentMethod === 'card'
                    ? 'Credit Card'
                    : paymentMethod === 'apple'
                    ? 'Apple Pay'
                    : paymentMethod === 'klarna'
                    ? 'Klarna 4-Installments'
                    : 'Cash on Delivery'}
                </p>
                {paymentMethod === 'card' && (
                  <p className="text-slate-600 font-mono">Visa ending in {cardNumber.slice(-4)}</p>
                )}
                <p className="text-emerald-600 font-semibold mt-1">✓ Buyer Protection Enabled</p>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="p-5 bg-blue-50/50 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between text-slate-700">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Savings ({appliedCoupon?.code})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-700">
                <span>Shipping ({shippingSpeed === 'express' ? 'Express' : 'Standard'})</span>
                <span className="font-bold text-emerald-600">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-blue-200/60 font-outfit">
                <span>Total Due</span>
                <span className="text-xl text-blue-600">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(3)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={handlePlaceOrder}
                className="py-3.5 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-xl shadow-blue-600/25 flex items-center gap-2 transform active:scale-95 transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Place Order (${finalTotal.toFixed(2)})</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: ORDER CONFIRMATION */}
        {currentStep === 5 && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-400">
            {/* Celebration Icon */}
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-600/10">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                Payment Authorized & Verified
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-1 font-outfit">
                Thank You for Your Order!
              </h2>
              <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                We’ve received your order and our artisan fulfillment team has begun carefully preparing your package.
              </p>
            </div>

            {/* Order Details Banner */}
            <div className="max-w-lg mx-auto bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-left space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="font-semibold text-slate-500">Order Number:</span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {placedOrder?.id || lastCreatedOrder?.id || 'ORD-98241'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="font-semibold text-slate-500">Tracking Code:</span>
                <span className="font-mono font-bold text-blue-600">
                  {placedOrder?.trackingNumber || lastCreatedOrder?.trackingNumber || 'TRK-9812401-US'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="font-semibold text-slate-500">Estimated Delivery:</span>
                <span className="font-bold text-slate-800">
                  2–3 business days via Express Courier
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-500">Total Paid:</span>
                <span className="font-black text-slate-900 text-sm font-outfit">
                  ${(placedOrder?.total || lastCreatedOrder?.total || finalTotal).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  setActiveView('account');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Track in My Orders</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  addToast({
                    title: 'Receipt Downloaded',
                    message: 'PDF copy saved to your downloads folder.',
                    type: 'success',
                  });
                }}
                className="py-3 px-5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs shadow-2xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Invoice PDF</span>
              </button>

              <button
                onClick={() => {
                  setActiveView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-3 px-5 rounded-xl text-blue-600 font-bold text-xs hover:underline cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
