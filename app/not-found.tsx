import React from 'react';
import { Button } from '../components/UIComponents';
import { ArrowRight, Search } from 'lucide-react';
import Link from 'next/link'; // Assuming Next.js link usage

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-cairo" dir="rtl">
      
      {/* 404 Illustration */}
      <div className="relative mb-8">
        <h1 className="text-[12rem] font-bold text-slate-50 leading-none select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-4 rounded-full shadow-lg border border-slate-100">
                <Search size={48} className="text-primary-500" />
            </div>
        </div>
      </div>

      <div className="text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">الصفحة غير موجودة</h2>
        <p className="text-slate-500 mb-8">
          عذراً، الرابط الذي تحاول الوصول إليه غير موجود أو تم نقله. يرجى التحقق من الرابط أو العودة للصفحة الرئيسية.
        </p>

        <div className="flex justify-center gap-4">
            {/* If using standard HTML since we are in a mixed env, using a tag */}
            <a href="/">
                <Button className="gap-2 px-8">
                    <ArrowRight size={18} />
                    العودة للرئيسية
                </Button>
            </a>
        </div>
      </div>
    </div>
  );
}