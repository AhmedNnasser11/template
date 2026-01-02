"use client"; // Error components must be Client Components

import React, { useEffect } from 'react';
import { Button } from '../components/UIComponents';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-cairo" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100"
      >
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={40} />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-2">عذراً، حدث خطأ ما!</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            واجهنا مشكلة غير متوقعة أثناء معالجة طلبك. تم تسجيل الخطأ وسنقوم بمراجعته قريباً.
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={() => reset()}
              className="w-full flex items-center justify-center gap-2 bg-primary-900 hover:bg-primary-800 py-3"
            >
              <RefreshCw size={18} />
              حاول مرة أخرى
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="w-full flex items-center justify-center gap-2 py-3"
            >
              <Home size={18} />
              العودة للرئيسية
            </Button>
          </div>
        </div>
        
        <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 font-mono">Error Code: {error.digest || 'UNKNOWN_ERROR'}</p>
        </div>
      </motion.div>
    </div>
  );
}