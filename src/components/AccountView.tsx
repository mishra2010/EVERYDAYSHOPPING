import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  Truck,
  Plus,
  ArrowRight,
  ShieldCheck,
  Heart,
  ChevronRight,
} from 'lucide-react';

export const AccountView: React.FC = () => {
  const {
    isLoggedIn,
    user,
    login,
    logout,
    addresses,
    addAddress,
    orders,
    setActiveView,
    wishlist,
    addToast,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'payments' | 'settings'>('orders');

  // Auth Form states
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  // New Address Form Modal
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newZip, setNewZip] = useState('');

  // Payment Cards
  const [savedCards, setSavedCards] = useState([
    { id: 'c1', type: 'Visa', last4: '4242', exp: '08/28', isDefault: true },
    { id: 'c2', type: 'Mastercard', last4: '8819', exp: '11/27', isDefault: false },
  ]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'forgot') {
      setForgotSent(true);
      return;
    }
    if (!email) return;
    login(email, name || undefined);
  };

  const handleGoogleAuth = () => {
    login('user.google@gmail.com', 'Everyday Shopper');
  };

  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newCity) return;
    addAddress({
      fullName: user?.name || 'Customer',
      street: newStreet,
      city: newCity,
      state: newState || 'CA',
      zipCode: newZip || '94103',
      country: 'United States',
      phone: user?.phone || '+1 (555) 019-2834',
      isDefault: false,
    });
    setNewStreet('');
    setNewCity('');
    setNewState('');
    setNewZip('');
    setShowAddAddressModal(false);
  };

  // If NOT logged in, show Auth Card
  if (!isLoggedIn) {
    return (
      <div className="py-16 sm:py-24 bg-[#F8FAFC] min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-200/80 p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 font-outfit">
              {authMode === 'signin'
                ? 'Welcome to Everyday Shopping'
                : authMode === 'signup'
                ? 'Create Your Account'
                : 'Reset Password'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {authMode === 'signin'
                ? 'Access your saved wishlist, track orders & faster checkout'
                : authMode === 'signup'
                ? 'Join thousands discovering curated artisanal products'
                : 'Enter your email to receive recovery instructions'}
            </p>
          </div>

          {/* Continue with Google */}
          {authMode !== 'forgot' && (
            <>
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-3 cursor-pointer mb-5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center gap-3 my-5">
                <div className="h-px bg-slate-200 flex-1" />
                <span className="text-[11px] font-bold text-slate-400 uppercase">Or with email</span>
                <div className="h-px bg-slate-200 flex-1" />
              </div>
            </>
          )}

          {/* Form */}
          {forgotSent ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-800">Check Your Inbox</h4>
              <p className="text-xs text-slate-500 mt-1">
                We sent a password reset link to <span className="font-bold text-slate-700">{email}</span>.
              </p>
              <button
                onClick={() => {
                  setForgotSent(false);
                  setAuthMode('signin');
                }}
                className="mt-6 text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                Return to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              {authMode !== 'forgot' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">Password</label>
                    {authMode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => setAuthMode('forgot')}
                        className="text-[11px] font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
              >
                {authMode === 'signin'
                  ? 'Sign In to Account'
                  : authMode === 'signup'
                  ? 'Create Account'
                  : 'Send Reset Link'}
              </button>
            </form>
          )}

          {/* Toggle between Sign In / Sign Up */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            {authMode === 'signin' ? (
              <p>
                Don’t have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="font-bold text-blue-600 hover:text-blue-700 ml-1"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className="font-bold text-blue-600 hover:text-blue-700 ml-1"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // LOGGED IN USER DASHBOARD
  return (
    <div className="py-12 sm:py-16 bg-[#F8FAFC] min-h-[80vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Greeting Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatarUrl}
              alt={user?.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-outfit">
                  Hello, {user?.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {user?.email} · {user?.joinedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('wishlist')}
              className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-600 text-xs font-bold border border-slate-200 transition-colors flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Wishlist ({wishlist.length})</span>
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-rose-100 hover:text-rose-700 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6 overflow-x-auto">
          {[
            { id: 'orders', label: 'Order History', icon: Package, count: orders.length },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin, count: addresses.length },
            { id: 'payments', label: 'Payment Methods', icon: CreditCard, count: savedCards.length },
            { id: 'settings', label: 'Account Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ORDER HISTORY */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No orders placed yet</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Once you order from Everyday Shopping, you can track packages in real-time here.
                </p>
                <button
                  onClick={() => setActiveView('home')}
                  className="mt-5 px-5 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-outfit font-black text-sm text-slate-900">
                          {order.id}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${
                            order.status === 'Delivered'
                              ? 'bg-emerald-50 text-emerald-700'
                              : order.status === 'Out for Delivery'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Placed on {order.date} · Tracking: {order.trackingNumber}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-black text-slate-900 font-outfit">
                        ${order.total.toFixed(2)}
                      </div>
                      <div className="text-xs text-slate-400">{order.paymentMethod}</div>
                    </div>
                  </div>

                  {/* Delivery Status Banner */}
                  <div className="p-3 bg-blue-50/60 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-blue-950 font-medium">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span>{order.estimatedDelivery}</span>
                    </div>
                    <span className="text-[11px] font-bold text-blue-600 cursor-pointer hover:underline">
                      Live Courier Map →
                    </span>
                  </div>

                  {/* Items list */}
                  <div className="divide-y divide-slate-100">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                              {item.product.name}
                            </h4>
                            <span className="text-[11px] text-slate-400">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-bold text-slate-800 font-outfit">
                          ${(item.quantity * item.price).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: ADDRESSES */}
        {activeTab === 'addresses' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Delivery Addresses</h3>
              <button
                onClick={() => setShowAddAddressModal(true)}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 relative shadow-2xs"
                >
                  {addr.isDefault && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                      Default Shipping
                    </span>
                  )}
                  <h4 className="text-sm font-bold text-slate-900">{addr.fullName}</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {addr.street} {addr.apt && `, ${addr.apt}`}
                  </p>
                  <p className="text-xs text-slate-600">
                    {addr.city}, {addr.state} {addr.zipCode}
                  </p>
                  <p className="text-xs text-slate-600">{addr.country}</p>
                  <p className="text-xs text-slate-500 mt-2 font-medium">{addr.phone}</p>
                </div>
              ))}
            </div>

            {/* Modal for adding address */}
            {showAddAddressModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
                  <h4 className="text-base font-bold text-slate-900 mb-4">Add Shipping Address</h4>
                  <form onSubmit={handleAddAddressSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Street Address</label>
                      <input
                        type="text"
                        required
                        value={newStreet}
                        onChange={(e) => setNewStreet(e.target.value)}
                        placeholder="e.g. 500 Market St"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          placeholder="City"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">State</label>
                        <input
                          type="text"
                          value={newState}
                          onChange={(e) => setNewState(e.target.value)}
                          placeholder="CA"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Zip</label>
                        <input
                          type="text"
                          value={newZip}
                          onChange={(e) => setNewZip(e.target.value)}
                          placeholder="94107"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowAddAddressModal(false)}
                        className="flex-1 py-2 rounded-xl bg-slate-100 font-bold text-slate-600 hover:bg-slate-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 rounded-xl bg-blue-600 font-bold text-white hover:bg-blue-700"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PAYMENT METHODS */}
        {activeTab === 'payments' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900">Saved Payment Methods</h3>
              <button
                onClick={() =>
                  addToast({
                    title: 'Add Payment Card',
                    message: 'Card vaulted securely with 256-bit encryption.',
                    type: 'info',
                  })
                }
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Card</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-6 rounded-2xl shadow-md relative overflow-hidden"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-bold tracking-wider">{card.type}</span>
                    {card.isDefault && (
                      <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="mt-6 text-lg font-mono tracking-widest">
                    •••• •••• •••• {card.last4}
                  </div>
                  <div className="mt-4 flex justify-between text-xs text-slate-300 font-medium">
                    <span>{user?.name?.toUpperCase()}</span>
                    <span>EXP {card.exp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-6">
            <h3 className="text-base font-bold text-slate-900">Account Preferences</h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-800">Order Updates via Email</h4>
                  <p className="text-slate-500">Receive tracking milestones and dispatch notices</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-blue-600 w-4 h-4 cursor-pointer" />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-800">Exclusive Flash Deals & Promo Codes</h4>
                  <p className="text-slate-500">Get early VIP access to seasonal markdowns</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-blue-600 w-4 h-4 cursor-pointer" />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-bold text-slate-800">Two-Factor Authentication (2FA)</h4>
                  <p className="text-slate-500">Secure your orders with authentication app</p>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                  Active
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
