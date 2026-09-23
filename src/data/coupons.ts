import { Coupon } from '../types';

export const COUPONS: Coupon[] = [
  {
    code: 'WELCOME20',
    title: 'First Order Welcome Bonus',
    description: 'Enjoy 20% off your first order with zero minimum spend',
    discountPercent: 20,
    minOrder: 0,
    expiresInHours: 48,
    claimedPercent: 86,
  },
  {
    code: 'FLASH25',
    title: 'Artisanal Weekend Flash Sale',
    description: 'Instant 25% discount on handcrafted home & living collections',
    discountPercent: 25,
    minOrder: 75,
    expiresInHours: 14,
    claimedPercent: 92,
  },
  {
    code: 'SAVE15',
    title: 'Seasonal Discovery Savings',
    description: 'Extra 15% off across fashion, tech gear and accessories',
    discountPercent: 15,
    minOrder: 50,
    expiresInHours: 72,
    claimedPercent: 64,
  },
  {
    code: 'FREESHIP',
    title: 'Free Express Priority Shipping',
    description: 'Complimentary expedited 2-day delivery on any purchase',
    discountPercent: 0,
    minOrder: 40,
    expiresInHours: 36,
    claimedPercent: 78,
    isFreeShipping: true,
  },
];
