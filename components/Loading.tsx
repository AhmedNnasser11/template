import React from 'react';
import { motion } from 'framer-motion';

export const Loading: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center space-y-4">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 bg-primary-600 rounded-full"
            animate={{
              y: [-10, 0, -10],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <p className="text-slate-400 text-sm font-medium animate-pulse">جاري تحميل البيانات...</p>
    </div>
  );
};