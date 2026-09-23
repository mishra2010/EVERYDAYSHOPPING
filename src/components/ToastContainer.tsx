import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Info, AlertTriangle, Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            className="pointer-events-auto bg-slate-900/95 backdrop-blur-md text-white px-4 py-3.5 rounded-2xl shadow-xl shadow-slate-950/20 border border-slate-700/50 flex items-start gap-3"
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {toast.type === 'heart' && <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <h4 className="text-sm font-semibold text-slate-100 leading-snug">{toast.title}</h4>
              {toast.message && (
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed line-clamp-2">{toast.message}</p>
              )}
              {toast.actionLabel && toast.onAction && (
                <button
                  onClick={() => {
                    toast.onAction?.();
                    removeToast(toast.id);
                  }}
                  className="mt-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2"
                >
                  {toast.actionLabel} →
                </button>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
