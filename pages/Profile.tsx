import React from 'react';
import { Card, Badge } from '../components/UIComponents';
import { User, Mail, Shield, Calendar, Building2, Clock } from 'lucide-react';

export const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="relative mb-12">
        {/* Cover Background */}
        <div className="h-48 rounded-3xl bg-gradient-to-l from-primary-800 to-primary-600 shadow-lg overflow-hidden relative group">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="absolute bottom-0 right-0 p-8 text-white opacity-10 transform translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700">
                <Shield size={200} />
            </div>
        </div>

        {/* Profile Card Overlay */}
        <div className="px-8 relative -mt-16 flex flex-col md:flex-row items-end gap-6">
            <div className="relative">
                <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-xl">
                    <div className="w-full h-full rounded-2xl bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-200">
                         {/* Avatar SVH */}
                         <div className="bg-[#a855f7] w-full h-full flex items-center justify-center">
                            <User className="text-white w-14 h-14" />
                         </div>
                    </div>
                </div>
                <div className="absolute -bottom-3 -right-3 bg-white p-1 rounded-full">
                    <div className="bg-emerald-500 text-white text-[10px] px-3 py-1 rounded-full font-bold shadow-sm border-2 border-white flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                        نشط
                    </div>
                </div>
            </div>
            
            <div className="flex-1 pb-4 text-center md:text-right">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Alsalamah</h1>
                <div className="flex items-center justify-center md:justify-start gap-4 text-slate-500 text-sm">
                    <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100 text-primary-700 font-medium"><Shield size={14} /> Admin</span>
                    <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100 text-slate-600"><Building2 size={14} /> Hameash</span>
                </div>
            </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Contact Information */}
        <Card className="hover:shadow-md transition-shadow border-t-4 border-t-blue-500">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <User size={20} />
                </div>
                <h3 className="font-bold text-slate-800 text-lg">معلومات الاتصال</h3>
            </div>
            
            <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                    <div className="mt-1 text-slate-300 group-hover:text-blue-500 transition-colors">
                        <User size={18} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-medium mb-1">الاسم بالكامل</p>
                        <p className="text-slate-700 font-semibold text-base">Alsalamah</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 group">
                    <div className="mt-1 text-slate-300 group-hover:text-blue-500 transition-colors">
                        <Mail size={18} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-medium mb-1">البريد الإلكتروني</p>
                        <p className="text-slate-700 font-semibold text-base font-mono" dir="ltr">alsalamah@hameash.com</p>
                    </div>
                </div>
            </div>
        </Card>

        {/* Organization & Role */}
        <Card className="hover:shadow-md transition-shadow border-t-4 border-t-purple-500">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                 <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <Shield size={20} />
                </div>
                <h3 className="font-bold text-slate-800 text-lg">المنظمة والصلاحيات</h3>
            </div>

             <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                    <div className="mt-1 text-slate-300 group-hover:text-purple-500 transition-colors">
                        <Building2 size={18} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-medium mb-1">المنظمة</p>
                        <p className="text-slate-700 font-semibold text-base">Hameash</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 group">
                     <div className="mt-1 text-slate-300 group-hover:text-purple-500 transition-colors">
                        <Shield size={18} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-medium mb-1">الدور الوظيفي</p>
                        <div className="flex items-center gap-2">
                             <p className="text-slate-700 font-semibold text-base">Admin</p>
                             <Badge variant="info" className="text-[10px]">كامل الصلاحيات</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        {/* Account Activity - Full Width */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex items-center gap-5 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all">
                <div className="p-4 bg-white border border-slate-100 rounded-full text-emerald-600 shadow-sm">
                    <Calendar size={24} />
                </div>
                <div>
                        <p className="text-xs text-slate-500 font-medium mb-1">تاريخ الانضمام</p>
                        <p className="text-slate-800 font-bold text-lg" dir="ltr">November 12, 2025</p>
                </div>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex items-center gap-5 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all">
                <div className="p-4 bg-white border border-slate-100 rounded-full text-blue-600 shadow-sm">
                    <Clock size={24} />
                </div>
                <div>
                        <p className="text-xs text-slate-500 font-medium mb-1">آخر تحديث للبيانات</p>
                        <p className="text-slate-800 font-bold text-lg" dir="ltr">December 23, 2025</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};