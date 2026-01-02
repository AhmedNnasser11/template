import React from 'react';
import { Card, Button, Badge } from '../components/UIComponents';
import { Plus, FileText, LayoutTemplate, MoreVertical, Star } from 'lucide-react';
import { Template } from '../types';

export const Templates: React.FC = () => {
  const templates: Template[] = [
    { id: '1', name: 'فاتورة ضريبية قياسية', type: 'فاتورة', fields: 12, lastModified: '2025-11-20' },
    { id: '2', name: 'سند استلام بضاعة', type: 'سند', fields: 8, lastModified: '2025-10-15' },
    { id: '3', name: 'أمر شراء محلي', type: 'أمر شراء', fields: 15, lastModified: '2025-12-01' },
    { id: '4', name: 'كشف حساب عميل', type: 'تقرير', fields: 5, lastModified: '2025-09-30' },
    { id: '5', name: 'فاتورة مبسطة', type: 'فاتورة', fields: 9, lastModified: '2025-11-25' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">إدارة النماذج</h2>
           <p className="text-slate-500 mt-2">
            قم بإنشاء وتخصيص نماذج استخراج البيانات الخاصة بك.
           </p>
        </div>
        <Button className="gap-2">
            <Plus size={16} />
            نموذج جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
            <Card key={template.id} className="group hover:border-primary-200 transition-all hover:shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 w-full flex justify-between items-start">
                    <div className="p-3 bg-primary-50 text-primary-600 rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-colors">
                        <LayoutTemplate size={24} />
                    </div>
                    <button className="text-slate-300 hover:text-slate-600">
                        <MoreVertical size={20} />
                    </button>
                </div>
                
                <div className="mt-16">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">{template.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                        <Badge variant="default">{template.type}</Badge>
                        <span className="text-xs text-slate-400">{template.fields} حقول</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-4 mt-4">
                        <span>آخر تعديل: {template.lastModified}</span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 px-2 py-1 h-auto">
                                تعديل
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        ))}
        
        {/* Add New Template Placeholder */}
        <button className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50/50 transition-all min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-white">
                <Plus size={24} />
            </div>
            <span className="font-medium">إنشاء نموذج فارغ</span>
        </button>
      </div>
    </div>
  );
};