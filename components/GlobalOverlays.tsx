import React from 'react';
import { useUiStore } from '../store/use-ui-store';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from './UIComponents';
import { Sidebar } from './Sidebar';

// Reusing Sidebar Logic via Prop drilling or Context would be ideal, 
// but for this structure, we'll render a mobile specific Sidebar wrapper

export const GlobalOverlays: React.FC<{ 
  activeTab: string; 
  setActiveTab: (id: string) => void;
}> = ({ activeTab, setActiveTab }) => {
  const { confirmDialog, closeConfirm, drawer, closeDrawer } = useUiStore();

  return (
    <>
      {/* 1. Confirm Dialog Modal */}
      <AnimatePresence>
        {confirmDialog.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeConfirm}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden z-[101]"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-amber-100 text-amber-600 rounded-full">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{confirmDialog.title}</h3>
                  </div>
                </div>
                <p className="text-slate-600 mb-6">{confirmDialog.message}</p>
                <div className="flex justify-end gap-3 bg-slate-50 -mx-6 -mb-6 p-4 border-t border-slate-100">
                  <Button variant="outline" onClick={closeConfirm}>
                    {confirmDialog.cancelText}
                  </Button>
                  <Button 
                    className="bg-red-600 hover:bg-red-700 text-white" 
                    onClick={() => {
                      confirmDialog.onConfirm();
                      closeConfirm();
                    }}
                  >
                    {confirmDialog.confirmText}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Global Drawer (Sheet) - Right Side for RTL */}
      <AnimatePresence>
        {drawer.isOpen && (
          <div className="fixed inset-0 z-[90] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-4/5 max-w-sm h-full bg-white shadow-2xl z-[91] overflow-y-auto"
            >
               {/* Mobile Navigation Drawer Content */}
               {drawer.view === 'mobile-nav' && (
                  <div className="h-full">
                     <button 
                        onClick={closeDrawer}
                        className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-600"
                     >
                        <X size={20} />
                     </button>
                     {/* Reuse Sidebar Component with mobile prop */}
                     <Sidebar 
                        activeTab={activeTab} 
                        setActiveTab={(tab) => {
                           setActiveTab(tab);
                           closeDrawer();
                        }} 
                        isMobile={true} 
                     />
                  </div>
               )}

               {/* Add other drawers like filters here later */}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};