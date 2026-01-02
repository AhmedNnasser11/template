import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-slate-50/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center max-w-sm w-full">
        {/* Animated Brand Logo */}
        <motion.div 
          className="w-16 h-16 bg-primary-900 rounded-2xl flex items-center justify-center mb-6"
          animate={{ 
            rotate: [0, 90, 180, 270, 360],
            borderRadius: ["1rem", "50%", "1rem", "50%", "1rem"] 
          }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
        >
          <span className="text-white text-3xl font-bold">ل</span>
        </motion.div>

        <h2 className="text-xl font-bold text-slate-800 mb-2">جاري التحميل</h2>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4 relative">
          <motion.div 
            className="absolute top-0 right-0 h-full bg-primary-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
          />
        </div>

        <p className="text-slate-400 text-sm text-center">
          يرجى الانتظار بينما نقوم بتجهيز لوحة التحكم الخاصة بك...
        </p>
      </div>
    </div>
  );
}