export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery?: string[];
  badge?: 'Trending' | 'Best Seller' | 'New' | 'Top Deal' | 'Artisanal';
  inStock: boolean;
  description: string;
  features?: string[];
  material?: string;
  dimensions?: string;
  artisanNotes?: string;
  isArtisanal?: boolean;
  roomType?: 'living' | 'dining' | 'kitchen' | 'bedroom' | 'workspace';
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  image: string;
  count: number;
  description: string;
  accentColor: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountPercent: number;
  minOrder: number;
  expiresInHours: number;
  claimedPercent: number;
  isFreeShipping?: boolean;
}

export interface Address {
  id: string;
  fullName: string;
  street: string;
  apt?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  trackingNumber: string;
  estimatedDelivery: string;
  shippingAddress: Address;
  paymentMethod: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  joinedDate: string;
  phone: string;
}

export interface ToastNotification {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'heart';
  actionLabel?: string;
  onAction?: () => void;
}
