import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Coupon, Order, Address, UserProfile, ToastNotification } from '../types';
import { PRODUCTS } from '../data/products';
import { COUPONS } from '../data/coupons';

interface ShopContextType {
  // Navigation & Modals
  activeView: 'home' | 'categories' | 'deals' | 'gallery' | 'wishlist' | 'account' | 'checkout';
  setActiveView: (view: 'home' | 'categories' | 'deals' | 'gallery' | 'wishlist' | 'account' | 'checkout') => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, options?: { color?: string; size?: string }) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  finalTotal: number;

  // Coupons
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product) => void;

  // Recently Viewed
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;

  // Toast System
  toasts: ToastNotification[];
  addToast: (toast: Omit<ToastNotification, 'id'>) => void;
  removeToast: (id: string) => void;

  // User & Orders
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  orders: Order[];
  createOrder: (shippingAddress: Address, paymentMethod: string) => Order;
  lastCreatedOrder: Order | null;
  notifyOnSale: boolean;
  setNotifyOnSale: (val: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const INITIAL_ADDRESS: Address = {
  id: 'addr-1',
  fullName: 'Pooja Panchal',
  street: '742 Evergreen Terrace',
  apt: 'Suite 4B',
  city: 'San Francisco',
  state: 'CA',
  zipCode: '94107',
  country: 'United States',
  phone: '+1 (555) 382-9011',
  isDefault: true,
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & UI States
  const [activeView, setActiveView] = useState<'home' | 'categories' | 'deals' | 'gallery' | 'wishlist' | 'account' | 'checkout'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('everyday_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default initial cart sample for delightful immediate preview
    return [
      { product: PRODUCTS[0], quantity: 1 },
      { product: PRODUCTS[1], quantity: 1 },
    ];
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('everyday_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [PRODUCTS[2].id, PRODUCTS[4].id];
  });

  // Recently viewed
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('everyday_recent');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [PRODUCTS[0], PRODUCTS[1], PRODUCTS[6]];
  });

  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => COUPONS[0]); // WELCOME20 applied by default as a warm welcome!

  // Toast notifications
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // User Profile
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile | null>({
    name: 'Pooja Panchal',
    email: 'panchalpooja068@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&auto=format&fit=crop',
    joinedDate: 'Member since Sept 2025',
    phone: '+1 (555) 382-9011',
  });

  const [addresses, setAddresses] = useState<Address[]>([INITIAL_ADDRESS]);
  const [notifyOnSale, setNotifyOnSale] = useState<boolean>(true);

  // Orders history
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-89421',
      date: '2026-09-18',
      items: [
        { product: PRODUCTS[2], quantity: 1, price: PRODUCTS[2].price },
        { product: PRODUCTS[14], quantity: 1, price: PRODUCTS[14].price },
      ],
      subtotal: 169.0,
      discount: 33.8,
      shipping: 0,
      total: 135.2,
      status: 'Out for Delivery',
      trackingNumber: 'TRK-9920148-US',
      estimatedDelivery: 'Expected today by 6:00 PM',
      shippingAddress: INITIAL_ADDRESS,
      paymentMethod: 'Apple Pay (•••• 4242)',
    },
    {
      id: 'ORD-87119',
      date: '2026-08-30',
      items: [
        { product: PRODUCTS[6], quantity: 1, price: PRODUCTS[6].price },
      ],
      subtotal: 249.0,
      discount: 37.35,
      shipping: 0,
      total: 211.65,
      status: 'Delivered',
      trackingNumber: 'TRK-8819034-US',
      estimatedDelivery: 'Delivered on Sept 3, 2026',
      shippingAddress: INITIAL_ADDRESS,
      paymentMethod: 'Visa ending in 4028',
    },
  ]);

  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('everyday_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('everyday_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Sync recent to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('everyday_recent', JSON.stringify(recentlyViewed));
    } catch {
      // ignore
    }
  }, [recentlyViewed]);

  // Toast Helpers
  const addToast = (t: Omit<ToastNotification, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastNotification = { ...t, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  // Cart Helpers
  const addToCart = (product: Product, quantity = 1, options?: { color?: string; size?: string }) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor: options?.color,
          selectedSize: options?.size,
        },
      ];
    });

    addToast({
      title: 'Added to Cart',
      message: `${quantity}× ${product.name}`,
      type: 'success',
      actionLabel: 'View Cart',
      onAction: () => setIsCartOpen(true),
    });

    addToRecentlyViewed(product);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast({
      title: 'Item Removed',
      message: 'Item has been removed from your shopping bag',
      type: 'info',
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Helpers
  const toggleWishlist = (product: Product) => {
    const isSaved = wishlist.includes(product.id);
    if (isSaved) {
      setWishlist((prev) => prev.filter((id) => id !== product.id));
      addToast({
        title: 'Removed from Wishlist',
        message: `${product.name} removed`,
        type: 'info',
      });
    } else {
      setWishlist((prev) => [...prev, product.id]);
      addToast({
        title: 'Saved to Wishlist ❤️',
        message: `${product.name} has been saved to your wishlist`,
        type: 'heart',
      });
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveToCartFromWishlist = (product: Product) => {
    addToCart(product, 1);
    setWishlist((prev) => prev.filter((id) => id !== product.id));
  };

  // Recently Viewed Helpers
  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  // Coupon application
  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    const found = COUPONS.find((c) => c.code === normalized);
    if (!found) {
      return { success: false, message: `Coupon code "${normalized}" is invalid or expired.` };
    }
    setAppliedCoupon(found);
    addToast({
      title: `Coupon ${found.code} Applied!`,
      message: found.description,
      type: 'success',
    });
    return { success: true, message: `Applied ${found.code}: ${found.title}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast({
      title: 'Coupon Removed',
      message: 'Promotion removed from order calculation',
      type: 'info',
    });
  };

  // Computed Cart Numbers
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent > 0) {
      discountAmount = (subtotal * appliedCoupon.discountPercent) / 100;
    }
  }

  // Free shipping over $100 or if coupon provides it
  const isEligibleForFreeShipping = subtotal >= 100 || appliedCoupon?.isFreeShipping === true;
  const shippingCost = cart.length === 0 ? 0 : isEligibleForFreeShipping ? 0 : 9.99;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  // Address Helper
  const addAddress = (addrData: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addrData,
      id: `addr-${Date.now()}`,
    };
    setAddresses((prev) => [...prev, newAddr]);
    addToast({
      title: 'Address Saved',
      message: 'New shipping address added successfully',
      type: 'success',
    });
  };

  // Order Creation
  const createOrder = (shippingAddress: Address, paymentMethod: string) => {
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const tracking = `TRK-${Math.floor(1000000 + Math.random() * 9000000)}-ES`;

    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      items: cart.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: item.product.price,
      })),
      subtotal,
      discount: discountAmount,
      shipping: shippingCost,
      total: finalTotal,
      status: 'Processing',
      trackingNumber: tracking,
      estimatedDelivery: 'Delivering in 2–3 business days via Express Courier',
      shippingAddress,
      paymentMethod,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastCreatedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  // User auth simulation
  const login = (email: string, name?: string) => {
    const displayName = name || email.split('@')[0].replace('.', ' ');
    setIsLoggedIn(true);
    setUser({
      name: displayName,
      email,
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&auto=format&fit=crop`,
      joinedDate: 'Joined recently',
      phone: '+1 (555) 019-2834',
    });
    addToast({
      title: 'Welcome Back!',
      message: `Signed in as ${email}`,
      type: 'success',
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    addToast({
      title: 'Signed Out',
      message: 'You have been safely signed out.',
      type: 'info',
    });
  };

  return (
    <ShopContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAuthOpen,
        setIsAuthOpen,
        quickViewProduct,
        setQuickViewProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        subtotal,
        discountAmount,
        shippingCost,
        finalTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        recentlyViewed,
        addToRecentlyViewed,
        toasts,
        addToast,
        removeToast,
        user,
        isLoggedIn,
        login,
        logout,
        addresses,
        addAddress,
        orders,
        createOrder,
        lastCreatedOrder,
        notifyOnSale,
        setNotifyOnSale,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
