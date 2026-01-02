import React from 'react';
import { useUiStore, AlertType } from '../store/use-ui-store';
import { AlertCircle, CheckCircle2, Info, XCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const alertStyles: Record<AlertType, string> = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error: 'bg-rose-50 border-rose-200 text-rose-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const iconMap: Record<AlertType, React.ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
  error: <XCircle className="h-5 w-5 text-rose-600" />,
  warning: <AlertCircle className="h-5 w-5 text-amber-600" />,
  info: <Info className="h-5 w-5 text-blue-600" />,
};

export const GlobalAlert: React.FC = () => {
  const { alert, hideAlert } = useUiStore();

  return (
    <AnimatePresence>
      {alert.isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden mb-6"
        >
          <div className={`relative w-full rounded-lg border p-4 ${alertStyles[alert.type]}`}>
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-0.5">
                {iconMap[alert.type]}
              </div>
              <div className="flex-1">
                <h5 className="mb-1 font-bold leading-none tracking-tight">
                  {alert.title}
                </h5>
                <div className="text-sm opacity-90">
                  {alert.message}
                </div>
              </div>
              <button
                onClick={hideAlert}
                className="absolute left-4 top-4 opacity-70 hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};