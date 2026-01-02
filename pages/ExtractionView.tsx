import React, { useState } from 'react';
import { Card, Button, Input, ConfidenceIndicator, Badge, Table } from '../components/UIComponents';
import { ArrowRight, Check, Save, RotateCcw, Edit2, Calendar, FileText, Hash } from 'lucide-react';
import { OCRField, OCRLineItem } from '../types';

interface ExtractionViewProps {
  onBack: () => void;
}

export const ExtractionView: React.FC<ExtractionViewProps> = ({ onBack }) => {
  const [fields, setFields] = useState<OCRField[]>([
    { key: 'invoice_date', label: 'Invoice Date', value: '26th Nov 2025', confidence: 90 },
    { key: 'customer_name', label: 'Customer Name', value: 'Dear Valued Customer', confidence: 90 },
    { key: 'subject', label: 'Subject', value: 'Change of Prices for Frozen & Chilled Eggs', confidence: 90 },
    { key: 'product_code', label: 'Product Code', value: '0960', confidence: 90 },
  ]);

  const lineItems: OCRLineItem[] = [
    { code: '0960', description: 'Golden Whole Egg Frozen', packing: '2 x 5kg', source: 'Eggstation -KSA', price: 132.00 },
    { code: '0961', description: 'Golden Whole Egg Frozen', packing: '12 x 1kg', source: 'Eggstation -KSA', price: 158.00 },
    { code: '0963', description: 'Golden White Egg Frozen', packing: '12 x 1kg', source: 'Eggstation -KSA', price: 202.00 },
    { code: '0962', description: 'Golden Yellow Egg Frozen', packing: '12 x 1kg', source: 'Eggstation -KSA', price: 346.00 },
  ];

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack} className="gap-2">
                <ArrowRight size={16} />
                العودة إلى إدارة المستندات
            </Button>
            <div className="flex flex-col">
                <h2 className="text-xl font-bold text-slate-800">قبول المستند</h2>
                <p className="text-xs text-slate-500">مراجعة وقبول البيانات المستخرجة من هذا المستند</p>
            </div>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="text-slate-600">رفض</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                <Check size={16} />
                قبول جميع الحقول
            </Button>
        </div>
      </div>

      {/* Main Split View */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* Left Side: Extracted Data Form */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
            
            <Card className="bg-slate-50/50 border-primary-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-700">البيانات المستخرجة</h3>
                    <Badge variant="info">قيد الانتظار</Badge>
                </div>
                
                <div className="space-y-6">
                    {fields.map((field) => (
                        <div key={field.key} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm group hover:border-primary-200 transition-colors">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                                    {field.key === 'invoice_date' && <Calendar size={14} />}
                                    {field.key === 'customer_name' && <FileText size={14} />}
                                    {field.key === 'product_code' && <Hash size={14} />}
                                    <span dir="ltr">{field.label}</span>
                                </label>
                                <div className="flex items-center gap-2">
                                    <Badge variant={field.confidence > 80 ? 'success' : 'warning'}>
                                        مقدار الثقة: {field.confidence}%
                                    </Badge>
                                    <button className="text-slate-400 hover:text-primary-600">
                                        <Edit2 size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="relative">
                                <Input 
                                    defaultValue={field.value} 
                                    className="pr-10 font-medium text-slate-800 bg-slate-50 border-transparent focus:bg-white transition-all"
                                    dir="ltr"
                                />
                                <div className="absolute top-2.5 right-3 text-slate-400">
                                    <Check size={16} className="text-emerald-500" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <Card>
                <h3 className="font-bold text-slate-700 mb-4">المنتجات (Line Items)</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-right" dir="ltr">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="p-2 border-b">Code</th>
                                <th className="p-2 border-b">Description</th>
                                <th className="p-2 border-b">Packing</th>
                                <th className="p-2 border-b">Source</th>
                                <th className="p-2 border-b">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lineItems.map((item, idx) => (
                                <tr key={idx} className="border-b hover:bg-slate-50">
                                    <td className="p-2 font-mono">{item.code}</td>
                                    <td className="p-2">{item.description}</td>
                                    <td className="p-2">{item.packing}</td>
                                    <td className="p-2">{item.source}</td>
                                    <td className="p-2 font-bold">{item.price.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

        </div>

        {/* Right Side: PDF Viewer Mock */}
        <div className="col-span-12 lg:col-span-7 bg-slate-800 rounded-xl overflow-hidden shadow-inner flex flex-col relative group">
            <div className="absolute top-4 right-4 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                معاينة الملف
            </div>
            
            {/* Toolbar Mock */}
            <div className="bg-slate-900 text-slate-300 p-2 flex justify-between items-center text-xs">
                <span>Change of Prices for Frozen & Chilled Eggs 26.11.2025.pdf</span>
                <div className="flex gap-2">
                    <button className="hover:text-white">-</button>
                    <span>100%</span>
                    <button className="hover:text-white">+</button>
                </div>
            </div>

            {/* Document Content Mock - Simulating the PDF visual from Screenshot 4 */}
            <div className="flex-1 overflow-auto p-8 bg-slate-500 flex justify-center">
                <div className="w-full max-w-[600px] bg-white min-h-[800px] shadow-2xl p-8 text-slate-800 relative">
                    {/* Simulated Header */}
                    <div className="flex justify-between items-start border-b pb-4 mb-6">
                        <div className="text-3xl font-bold text-slate-300 tracking-widest">ICE</div>
                        <div className="text-right">
                            <h1 className="text-xl font-bold text-slate-800">أعمال إسلام التجارية</h1>
                            <p className="text-sm text-slate-500">Islam Commercial Enterprises</p>
                        </div>
                    </div>

                    {/* Simulated Content Matching the PDF */}
                    <div className="text-sm space-y-2 mb-8" dir="ltr">
                        <div className="flex">
                            <span className="w-24 font-bold">Date</span>
                            <span>: 26th Nov 2025</span>
                        </div>
                        <div className="flex">
                            <span className="w-24 font-bold">To</span>
                            <span>: Dear Valued Customer</span>
                        </div>
                        <div className="flex">
                            <span className="w-24 font-bold">Sub</span>
                            <span>: Change of Prices for Frozen & Chilled Eggs</span>
                        </div>
                    </div>

                    {/* Highlight Overlay - Simulating OCR Detection */}
                    <div className="absolute top-[160px] left-[120px] w-[150px] h-[20px] bg-emerald-500/20 border border-emerald-500 rounded pointer-events-none"></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
