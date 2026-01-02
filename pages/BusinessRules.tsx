import React from 'react';
import { Card, Button } from '../components/UIComponents';
import { Plus } from 'lucide-react';

export const BusinessRules: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">إدارة القواعد التجارية</h2>
           <p className="text-slate-500 mt-2 max-w-2xl">
            إدارة قواعد التدقيق الخاصة بالتحقق من المستندات.
            <br />
            تظهر حسب الجدول التالي مع ملاحظة ان الرقم يتم تعديله من قبل الادمن عندنا.
           </p>
        </div>
        <Button className="gap-2">
            <Plus size={16} />
            إنشاء قاعدة جديدة
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-50 border-slate-200">
            <h3 className="text-slate-500 font-medium text-sm mb-2">إجمالي القواعد</h3>
            <p className="text-4xl font-bold text-slate-800">0</p>
        </Card>
        <Card className="bg-emerald-50 border-emerald-100">
            <h3 className="text-emerald-600 font-medium text-sm mb-2">القواعد المفعلة</h3>
            <p className="text-4xl font-bold text-emerald-700">0</p>
        </Card>
        <Card className="bg-slate-50 border-slate-200">
            <h3 className="text-slate-500 font-medium text-sm mb-2">القواعد غير المفعلة</h3>
            <p className="text-4xl font-bold text-slate-800">0</p>
        </Card>
      </div>

      <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
        <p className="mb-2">لا توجد قواعد تدقيق حالياً</p>
        <p className="text-sm">اضغط على "إنشاء قاعدة جديدة" لإضافة قاعدة.</p>
      </div>
    </div>
  );
};
