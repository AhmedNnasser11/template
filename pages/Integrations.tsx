import React from 'react';
import { Card, Button, Input, Badge } from '../components/UIComponents';
import { Link as LinkIcon, MessageCircle, CheckCircle, XCircle, RefreshCw, Key, Globe, Database } from 'lucide-react';

interface IntegrationsProps {
    type: 'odoo' | 'whatsapp';
}

export const Integrations: React.FC<IntegrationsProps> = ({ type }) => {
  const isOdoo = type === 'odoo';

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg ${isOdoo ? 'bg-[#714B67]' : 'bg-[#25D366]'}`}>
            {isOdoo ? <LinkIcon size={32} /> : <MessageCircle size={32} />}
        </div>
        <div>
            <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                {isOdoo ? 'الربط مع Odoo ERP' : 'إعدادات WhatsApp'}
                <Badge variant={isOdoo ? "default" : "success"} className="text-sm px-3 py-1">
                    {isOdoo ? 'غير متصل' : 'متصل'}
                </Badge>
            </h2>
            <p className="text-slate-500 mt-1 text-lg">
                {isOdoo 
                    ? 'قم بربط منصة لنكي مع نظام أودو لمزامنة الفواتير والقيود المحاسبية تلقائياً.' 
                    : 'استقبل المستندات وعالجها تلقائياً عبر بوت الواتساب المخصص.'}
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Config Form */}
        <div className="md:col-span-2 space-y-6">
            <Card>
                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                    <h3 className="font-bold text-slate-800 text-lg">بيانات الاتصال</h3>
                    {isOdoo && <Button variant="ghost" className="text-slate-400"><RefreshCw size={16} /></Button>}
                </div>
                
                <div className="space-y-4">
                    {isOdoo ? (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">رابط النظام (URL)</label>
                                <div className="relative">
                                    <Globe className="absolute right-3 top-3 text-slate-400" size={16} />
                                    <Input placeholder="https://your-company.odoo.com" className="pr-10" dir="ltr" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">اسم قاعدة البيانات</label>
                                <div className="relative">
                                    <Database className="absolute right-3 top-3 text-slate-400" size={16} />
                                    <Input placeholder="prod_db_v15" className="pr-10" dir="ltr" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">البريد الإلكتروني للمستخدم</label>
                                <Input placeholder="admin@example.com" dir="ltr" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">مفتاح الوصول (API Key)</label>
                                <div className="relative">
                                    <Key className="absolute right-3 top-3 text-slate-400" size={16} />
                                    <Input type="password" placeholder="••••••••••••••••" className="pr-10" dir="ltr" />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                             <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 flex items-start gap-3">
                                <CheckCircle className="text-emerald-500 mt-0.5" size={20} />
                                <div>
                                    <h4 className="font-bold text-emerald-800">الخدمة تعمل بنجاح</h4>
                                    <p className="text-emerald-600 text-sm mt-1">
                                        بوت الواتساب متصل حالياً وجاهز لاستقبال المستندات على الرقم 
                                        <span className="font-mono font-bold mx-1" dir="ltr">+966 55 488 2490</span>
                                    </p>
                                </div>
                             </div>
                             
                             <div className="pt-4">
                                <label className="block text-sm font-medium text-slate-700 mb-2">رابط الدعوة المباشر</label>
                                <div className="flex gap-2">
                                    <Input value="https://wa.me/966554882490" readOnly className="bg-slate-50 text-slate-500" dir="ltr" />
                                    <Button variant="outline">نسخ</Button>
                                </div>
                             </div>
                        </>
                    )}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                    <Button variant="outline">إلغاء</Button>
                    <Button className={isOdoo ? "bg-[#714B67] hover:bg-[#5d3d54]" : "bg-[#25D366] hover:bg-[#1da851]"}>
                        {isOdoo ? 'اتصال واختبار' : 'حفظ الإعدادات'}
                    </Button>
                </div>
            </Card>
        </div>

        {/* Side Info Panel */}
        <div className="space-y-6">
            <Card className="bg-slate-50 border-slate-200">
                <h3 className="font-bold text-slate-700 mb-2">تعليمات {isOdoo ? 'الربط' : 'الاستخدام'}</h3>
                <ul className="text-sm text-slate-500 space-y-3 list-disc list-inside">
                    {isOdoo ? (
                        <>
                            <li>تأكد من تفعيل الوصول الخارجي XML-RPC في إعدادات أودو.</li>
                            <li>يجب أن يمتلك المستخدم صلاحيات كافية لإنشاء الفواتير والقيود.</li>
                            <li>نسخة أودو المدعومة: v14, v15, v16.</li>
                        </>
                    ) : (
                        <>
                            <li>يمكن للموظفين إرسال صور الفواتير أو ملفات PDF مباشرة للمحادثة.</li>
                            <li>سيقوم النظام بالرد فورياً بحالة الاستلام.</li>
                            <li>تأكد من وضوح الصور لضمان دقة الاستخراج.</li>
                        </>
                    )}
                </ul>
            </Card>

            <Card className="bg-white">
                <h3 className="font-bold text-slate-700 mb-4">سجل العمليات</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex items-start gap-3 text-xs">
                            <div className={`w-2 h-2 rounded-full mt-1.5 ${i === 0 ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                            <div>
                                <p className="text-slate-800 font-medium">مزامنة {isOdoo ? 'فاتورة' : 'رسالة'} #INV-202{i}</p>
                                <p className="text-slate-400">منذ {i * 15 + 5} دقيقة</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>

      </div>
    </div>
  );
};