import React from 'react';
import { Card, Button, Input, Table, Badge } from '../components/UIComponents';
import { Plus, Search, Building2, Users, MoreHorizontal, Lock } from 'lucide-react';
import { Department } from '../types';

export const Departments: React.FC = () => {
  const departments: Department[] = [
    { id: '1', name: 'المالية', manager: 'أحمد محمد', memberCount: 4, status: 'active' },
    { id: '2', name: 'الموارد البشرية', manager: 'سارة خالد', memberCount: 2, status: 'active' },
    { id: '3', name: 'المبيعات', manager: 'فهد عبدالله', memberCount: 8, status: 'active' },
    { id: '4', name: 'تقنية المعلومات', manager: 'System Admin', memberCount: 3, status: 'inactive' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">الأقسام</h2>
           <p className="text-slate-500 mt-2">
            إدارة الهيكل التنظيمي والأقسام.
            <br />
            <span className="text-amber-600 text-xs font-medium bg-amber-50 px-2 py-1 rounded inline-flex items-center gap-1 mt-1">
                <Lock size={10} />
                خاص بالمدراء فقط
            </span>
           </p>
        </div>
        <Button className="gap-2">
            <Plus size={16} />
            إضافة قسم جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
         <Card className="bg-blue-50 border-blue-100 flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <Building2 size={24} />
            </div>
            <div>
                <p className="text-sm text-slate-500 font-medium">إجمالي الأقسام</p>
                <p className="text-2xl font-bold text-slate-800">4</p>
            </div>
         </Card>
         <Card className="bg-emerald-50 border-emerald-100 flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
                <Users size={24} />
            </div>
            <div>
                <p className="text-sm text-slate-500 font-medium">إجمالي الموظفين</p>
                <p className="text-2xl font-bold text-slate-800">17</p>
            </div>
         </Card>
      </div>

      <Card className="p-0 overflow-hidden">
         <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <div className="relative max-w-md w-full">
                <Search className="absolute right-3 top-3 text-slate-400" size={16} />
                <Input placeholder="بحث في الأقسام..." className="pr-10 bg-white" />
            </div>
         </div>
         <Table headers={['اسم القسم', 'المدير المسؤول', 'عدد الأعضاء', 'الحالة', 'إجراءات']}>
            {departments.map(dept => (
                <tr key={dept.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-800">{dept.name}</td>
                    <td className="p-4 text-slate-500">{dept.manager}</td>
                    <td className="p-4">
                        <div className="flex -space-x-2 space-x-reverse overflow-hidden">
                            {[...Array(Math.min(dept.memberCount, 4))].map((_, i) => (
                                <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-500">
                                    {String.fromCharCode(65 + i)}
                                </div>
                            ))}
                            {dept.memberCount > 4 && (
                                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-xs text-slate-500">
                                    +{dept.memberCount - 4}
                                </div>
                            )}
                        </div>
                    </td>
                    <td className="p-4">
                        <Badge variant={dept.status === 'active' ? 'success' : 'default'}>
                            {dept.status === 'active' ? 'نشط' : 'غير نشط'}
                        </Badge>
                    </td>
                    <td className="p-4">
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal size={16} />
                        </Button>
                    </td>
                </tr>
            ))}
         </Table>
      </Card>
    </div>
  );
};