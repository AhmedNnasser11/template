import React from 'react';
import { useUiStore, AlertType } from '../store/use-ui-store';
import { Sidebar } from './Sidebar';
import { Button } from './UIComponents';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  XCircle, 
  X, 
  AlertTriangle,
  FileText
} from 'lucide-react';

// --- 1. GLOBAL IN-PAGE ALERT ---
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

const GlobalAlertInternal: React.FC = () => {
  const { alert, hideAlert } = useUiStore();
  
  return (
    <AnimatePresence>
      {alert.isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          className="overflow-hidden mb-6"
        >
          <div className={`relative w-full rounded-lg border p-4 ${alertStyles[alert.type]}`}>
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-0.5">{iconMap[alert.type]}</div>
              <div className="flex-1">
                <h5 className="mb-1 font-bold leading-none tracking-tight">{alert.title}</h5>
                <div className="text-sm opacity-90">{alert.message}</div>
              </div>
              <button onClick={hideAlert} className="absolute left-4 top-4 opacity-70 hover:opacity-100">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- 2. GLOBAL OVERLAYS (Dialogs & Drawers) ---
export const GlobalFeedback: React.FC<{ 
  activeTab: string; 
  setActiveTab: (id: string) => void;
}> = ({ activeTab, setActiveTab }) => {
  const { confirmDialog, closeConfirm, modal, closeModal, drawer, closeDrawer } = useUiStore();

  return (
    <>
      <GlobalAlertInternal />

      {/* CONFIRM DIALOG */}
      <AnimatePresence>
        {confirmDialog.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeConfirm} className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden z-[101]"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-full ${confirmDialog.variant === 'danger' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                    <AlertTriangle size={24} />
                  </div>
                  <div><h3 className="text-lg font-bold text-slate-800">{confirmDialog.title}</h3></div>
                </div>
                <p className="text-slate-600 mb-6">{confirmDialog.message}</p>
                <div className="flex justify-end gap-3 bg-slate-50 -mx-6 -mb-6 p-4 border-t border-slate-100">
                  <Button variant="outline" onClick={closeConfirm}>{confirmDialog.cancelText}</Button>
                  <Button 
                    className={confirmDialog.variant === 'danger' ? "bg-red-600 hover:bg-red-700 text-white" : "bg-primary-900 hover:bg-primary-800 text-white"} 
                    onClick={() => { confirmDialog.onConfirm(); closeConfirm(); }}
                  >
                    {confirmDialog.confirmText}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GENERIC MODAL */}
      <AnimatePresence>
        {modal.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal} className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl z-[101] flex flex-col max-h-[90vh]"
            >
               <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <div>
                    {modal.title && <h3 className="text-xl font-bold text-slate-800">{modal.title}</h3>}
                    {modal.description && <p className="text-sm text-slate-500 mt-1">{modal.description}</p>}
                  </div>
                  <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
               </div>
               <div className="p-6 overflow-y-auto">
                  {modal.content}
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GLOBAL DRAWER */}
      <AnimatePresence>
        {drawer.isOpen && (
          <div className="fixed inset-0 z-[90] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeDrawer} className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-4/5 max-w-sm h-full bg-white shadow-2xl z-[91] overflow-y-auto"
            >
               {drawer.view === 'mobile-nav' && (
                  <div className="h-full">
                     <button onClick={closeDrawer} className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-600 z-10">
                        <X size={20} />
                     </button>
                     <Sidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); closeDrawer(); }} isMobile={true} />
                  </div>
               )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};