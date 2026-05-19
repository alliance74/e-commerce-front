'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/context/ToastContext';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, x: 100 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="bg-white shadow-lg rounded-lg p-4 flex items-center gap-3 min-w-[300px]"
            >
              <Icon className={toast.type === 'success' ? 'text-green-600' : toast.type === 'error' ? 'text-red-600' : 'text-blue-600'} size={20} />
              <p className="flex-1 font-ui text-sm text-espresso">{toast.message}</p>
              <button onClick={() => removeToast(toast.id)} className="text-warm-gray hover:text-espresso">
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
