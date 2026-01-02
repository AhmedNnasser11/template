import React from 'react';
import { Card, Button, Input, Table, Badge } from '../components/UIComponents';
import { Plus, Search, Lock } from 'lucide-react';
import { TeamMember } from '../types';

export const TeamManagement: React.FC = () => {
  const members: TeamMember[] = [
    { 
      id: '1', 
      name: 'Alsalamah', 
      email: 'alsalamah@hameash.com', 
      role: 'Admin', 
      phone: '966554882490+', 
      status: 'active', 
      created_at: '11/12/2025' 
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">أعضاء الفريق</h2>
           <p className="text-slate-500 mt-2 max-w-2xl">
            الحسابات التي موجودة تحت نطاق البراند أو الشركة.
            <br />
            إضافة الأعضاء أو التعديل يكون من عند صفحة الادمن عندنا، لا يمكن لأي مستخدم إضافة أي عضو أو تعديل البيانات.
           </p>
        </div>
        <Button disabled className="bg-slate-300 cursor-not-allowed opacity-70 gap-2">
            <Plus size={16} />
            إضافة عضو فريق
            <Lock size={12} />
        </Button>
      </div>

      <Card className="p-0">
         <div className="p-4 border-b border-slate-100 bg-slate-50/30">
            <div className="relative max-w-md">
                <Search className="absolute right-3 top-3 text-slate-400" size={16} />
                <Input placeholder="البحث عن أعضاء الفريق..." className="pr-10" />
            </div>
         </div>
         <Table headers={['الاسم', 'البريد الإلكتروني', 'الهاتف', 'الحالة', 'القسم', 'تاريخ الانشاء', '...']}>
            {members.map(member => (
                <tr key={member.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="p-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                            {member.name.charAt(0)}
                        </div>
                        <span className="font-medium text-slate-800" dir="ltr">{member.name}</span>
                    </td>
                    <td className="p-4 text-slate-500" dir="ltr">{member.email}</td>
                    <td className="p-4 text-slate-500" dir="ltr">{member.phone}</td>
                    <td className="p-4">
                        <Badge variant="info">نشط</Badge>
                    </td>
                    <td className="p-4 text-slate-400">-</td>
                    <td className="p-4 text-slate-500" dir="ltr">{member.created_at}</td>
                    <td className="p-4 text-slate-400">...</td>
                </tr>
            ))}
         </Table>
         <div className="p-4 flex justify-between items-center text-sm text-slate-500 border-t border-slate-100">
            <span>عناصر لكل صفحة: 10</span>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>&lt;</Button>
                <Button variant="primary" size="sm">1</Button>
                <Button variant="outline" size="sm" disabled>&gt;</Button>
            </div>
         </div>
      </Card>
    </div>
  );
};
