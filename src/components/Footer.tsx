import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { useShop } from '../context/ShopContext';
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Truck,
  Heart,
  HelpCircle,
  Phone,
  FileText,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Check,
  X,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, addToast } = useShop();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState<'faq' | 'privacy' | 'terms' | 'shipping' | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    addToast({
      title: 'Welcome to the Everyday Club!',
      message: 'Check your email for your 20% welcome discount code.',
      type: 'success',
    });
    setNewsletterEmail('');
  };

  const faqs = [
    {
      q: 'How fast is express delivery?',
      a: 'All express orders placed before 2:00 PM EST ship same-day and arrive within 2 to 3 business days via carbon-neutral express couriers.',
    },
    {
      q: 'What is your returns and exchanges policy?',
      a: 'We offer an unconditional 30-day return window on all unused items in their original packaging, including handcrafted ceramics and furniture.',
    },
    {
      q: 'How do you source your artisanal home collections?',
      a: 'Our curation team partners directly with small-batch studios and master craftsmen across Scandinavia, Japan, and North America, paying fair wages with zero middleman markups.',
    },
    {
      q: 'How do I track my order status?',
      a: 'You can view real-time courier tracking milestones in the "Account" > "Order History" tab or through the tracking link sent via email upon dispatch.',
    },
  ];

  return (
    <>
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-12 text-xs">
        {/* Top Newsletter & Assurance Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <h3 className="text-xl sm:text-2xl font-black text-white font-outfit">
                Unlock 20% Off Your First Everyday Order
              </h3>
              <p className="mt-1.5 text-slate-400 text-xs sm:text-sm">
                Receive weekly curations of artisanal home arrivals, limited drops, and member-only flash discounts.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-3.5 rounded-2xl bg-blue-900/40 border border-blue-500/50 text-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-emerald-400">You're on the VIP list!</div>
                    <div className="text-xs text-slate-300">
                      Use code <span className="font-mono font-bold text-white">WELCOME20</span> at checkout anytime.
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md ml-auto">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand column */}
            <div className="col-span-2 space-y-4">
              <BrandLogo size="md" lightText />
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Everyday Shopping is a design-first e-commerce destination celebrating artisanal homeware, modern tech essentials, and curated daily goods crafted to endure.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="#instagram"
                  onClick={(e) => {
                    e.preventDefault();
                    addToast({ title: 'Instagram', message: 'Follow @everydayshopping', type: 'info' });
                  }}
                  className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-blue-600 transition-colors flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#twitter"
                  onClick={(e) => {
                    e.preventDefault();
                    addToast({ title: 'Twitter / X', message: 'Follow @everyday_shop', type: 'info' });
                  }}
                  className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-blue-600 transition-colors flex items-center justify-center"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#facebook"
                  onClick={(e) => {
                    e.preventDefault();
                    addToast({ title: 'Facebook', message: 'Visit Everyday Shopping Community', type: 'info' });
                  }}
                  className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-blue-600 transition-colors flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#youtube"
                  onClick={(e) => {
                    e.preventDefault();
                    addToast({ title: 'YouTube', message: 'Watch Artisan Studio Stories', type: 'info' });
                  }}
                  className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-blue-600 transition-colors flex items-center justify-center"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 1: Shop */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
                Shop Departments
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setActiveView('gallery');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Artisanal Home & Living
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveView('categories');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    All 16 Categories
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveView('deals');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Flash Deals & Coupons
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveView('wishlist');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    My Saved Wishlist
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 2: Customer Care */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
                Customer Care
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveModal('faq')}
                    className="hover:text-white transition-colors"
                  >
                    FAQ & Help Center
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('shipping')}
                    className="hover:text-white transition-colors"
                  >
                    Shipping & Returns
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveView('account');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Track My Order
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      addToast({
                        title: 'Customer Support 24/7',
                        message: 'Reach us anytime at care@everydayshopping.com',
                        type: 'info',
                      })
                    }
                    className="hover:text-white transition-colors"
                  >
                    Contact Support
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Legal & Trust */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
                Legal & Trust
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveModal('privacy')}
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('terms')}
                    className="hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <span className="text-slate-500">256-Bit SSL Encrypted</span>
                </li>
                <li>
                  <span className="text-slate-500">PCI-DSS Compliant</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 text-[11px]">
            © {new Date().getFullYear()} Everyday Shopping Inc. All rights reserved. Designed for mindful living.
          </div>

          <div className="flex items-center gap-2 text-slate-500 text-[11px]">
            <span className="bg-slate-800 px-2 py-1 rounded">Visa</span>
            <span className="bg-slate-800 px-2 py-1 rounded">Mastercard</span>
            <span className="bg-slate-800 px-2 py-1 rounded">Apple Pay</span>
            <span className="bg-slate-800 px-2 py-1 rounded">Google Pay</span>
            <span className="bg-slate-800 px-2 py-1 rounded">Klarna</span>
          </div>
        </div>
      </footer>

      {/* Interactive Modal for FAQ / Shipping / Privacy / Terms */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-slate-900 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'faq' && (
              <div>
                <h3 className="text-xl font-bold font-outfit mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4 text-xs">
                  {faqs.map((faq, i) => (
                    <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                      <h4 className="font-bold text-slate-900 mb-1">{faq.q}</h4>
                      <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModal === 'shipping' && (
              <div>
                <h3 className="text-xl font-bold font-outfit mb-3">Shipping & 30-Day Returns</h3>
                <p className="text-xs text-slate-600 leading-relaxed space-y-2">
                  <span>
                    We ship worldwide using carbon-neutral priority logistics. Orders over $100 or using verified promotional codes automatically receive free expedited shipping.
                  </span>
                  <br /><br />
                  <span>
                    If you are not 100% delighted with your purchase, initiate a return within 30 days of receipt for a full refund back to your original payment method. Pre-paid courier return labels are provided directly through your account dashboard.
                  </span>
                </p>
              </div>
            )}

            {activeModal === 'privacy' && (
              <div>
                <h3 className="text-xl font-bold font-outfit mb-3">Privacy Policy</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Everyday Shopping values your personal security. We never sell or distribute personal customer records. All transaction details are encrypted using banking-standard TLS 1.3 and PCI-DSS Tier 1 standards.
                </p>
              </div>
            )}

            {activeModal === 'terms' && (
              <div>
                <h3 className="text-xl font-bold font-outfit mb-3">Terms & Conditions</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  By accessing or purchasing from Everyday Shopping, you agree to our standard consumer service warranty and verified authentic artisanal craftsmanship guidelines.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
