import React, { useState } from 'react';
import { Card, Table, Badge, Button, Tooltip, Select } from '../components/UIComponents';
import { FileCheck, FileClock, Activity, AlertCircle, Clock, Edit3, ShieldCheck, Trash2, Eye } from 'lucide-react';
import { Document } from '../types';
import { useUiStore } from '../store/use-ui-store';

interface DashboardProps {
  onViewDocument: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onViewDocument }) => {
  const { askConfirm, showAlert } = useUiStore();
  const [filterStatus, setFilterStatus] = useState<string>('');

  const metrics = [
    { title: 'إجمالي المستندات', value: '1', sub: 'عدد المستندات على مر الزمن', icon: FileCheck },
    { title: 'المستندات المعالجة', value: '0', sub: 'تمت المعالجة بنجاح', icon: FileCheck },
    { title: 'المستندات المعلقة', value: '0', sub: 'المستندات التي لم تتم معالجتها', icon: FileClock },
    { title: 'معدل النجاح', value: '0%', sub: 'نجاح معالجة المستندات', icon: Activity },
    { title: 'معدل الفشل', value: '0%', sub: 'فشل معالجة المستندات', icon: AlertCircle },
    { title: 'متوسط وقت المعالجة', value: '313.53 دقائق', sub: '', icon: Clock },
    { title: 'متوسط التعديلات لكل مستند', value: '0', sub: '', icon: Edit3 },
    { title: 'معدل الثقة', value: '0%', sub: '', icon: ShieldCheck },
  ];

  const recentDocs: Document[] = [
    { id: '1', name: 'Change of Prices for Frozen & Chilled Eggs 26.11.2025.pdf', type: 'Pdf', size: 'KB 290.31', status: 'pending', user: 'Alsalamah', date: 'Dec 23, 2025' }
  ];

  const handleDelete = (docName: string) => {
    askConfirm({
      title: 'حذف المستند',
      message: `هل أنت متأكد من رغبتك في حذف "${docName}"؟ لا يمكن التراجع عن هذا الإجراء.`,
      confirmText: 'نعم، حذف',
      cancelText: 'إلغاء',
      variant: 'danger',
      onConfirm: () => {
        showAlert('success', 'تم الحذف', `تم حذف المستند "${docName}" بنجاح.`);
      }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">مرحباً بعودتك، Alsalamah</h2>
          <p className="text-slate-500">إليك نظرة عامة على معالجة مستندات منظمتك.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
               <div className="p-2 bg-slate-50 rounded-lg">
                 <m.icon className="w-5 h-5 text-slate-500" />
               </div>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">{m.title}</h3>
            <div className="text-2xl font-bold text-slate-800 mb-1">{m.value}</div>
            {m.sub && <p className="text-xs text-slate-400">{m.sub}</p>}
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-lg text-slate-800">أحدث المستندات</h3>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="w-40">
                <Select 
                    options={[
                        { label: 'جميع الحالات', value: 'all' },
                        { label: 'مكتمل', value: 'processed' },
                        { label: 'قيد الانتظار', value: 'pending' },
                        { label: 'فشل المعالجة', value: 'failed' }
                    ]}
                    value={filterStatus}
                    onChange={setFilterStatus}
                    placeholder="تصفية بالحالة"
                />
            </div>
            <div className="w-64">
                <input 
                    type="text" 
                    placeholder="بحث في المستندات..." 
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 h-10"
                />
            </div>
          </div>
        </div>
        <Table headers={['اسم الملف', 'النوع', 'الحجم', 'الحالة', 'الحقول', 'تم الرفع في', 'تم الرفع بواسطة', 'الإجراءات']}>
          {recentDocs.map(doc => (
            <tr key={doc.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
              <td className="p-4 flex items-center gap-3">
                 <div className="p-2 bg-red-50 text-red-600 rounded">
                    <FileCheck size={16} />
                 </div>
                 <span className="font-medium text-slate-700 ltr:text-left truncate max-w-[200px] block" dir="ltr">{doc.name}</span>
              </td>
              <td className="p-4 text-slate-500">{doc.type}</td>
              <td className="p-4 text-slate-500" dir="ltr">{doc.size}</td>
              <td className="p-4">
                <Badge variant={doc.status === 'pending' ? 'info' : 'success'}>
                  {doc.status === 'pending' ? 'قيد الانتظار' : 'مكتمل'}
                </Badge>
              </td>
              <td className="p-4 text-slate-500">لا توجد حقول</td>
              <td className="p-4 text-slate-500" dir="ltr">{doc.date}</td>
              <td className="p-4 text-slate-700 font-medium">{doc.user}</td>
              <td className="p-4 flex gap-2 justify-end">
                  <Tooltip content="عرض التفاصيل">
                    <Button variant="ghost" size="sm" onClick={() => onViewDocument(doc.id)}>
                        <Eye size={16} className="text-slate-500" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="حذف المستند">
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.name)}>
                        <Trash2 size={16} className="text-red-500" />
                    </Button>
                  </Tooltip>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
};