import React from 'react';
import { NavItem } from '../types';
import { 
  LayoutDashboard, 
  FileText, 
  FileBox, 
  User, 
  Users, 
  Building2, 
  Scale, 
  Link as LinkIcon, 
  MessageCircle 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  isMobile?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isMobile = false }) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard, category: 'control' },
    { id: 'documents', label: 'إدارة المستندات', icon: FileText, category: 'control' },
    { id: 'templates', label: 'إدارة النماذج', icon: FileBox, category: 'control' },
    { id: 'profile', label: 'الملف الشخصي', icon: User, category: 'admin' },
    { id: 'team', label: 'أعضاء الفريق', icon: Users, category: 'admin' },
    { id: 'departments', label: 'الأقسام', icon: Building2, category: 'admin' },
    { id: 'rules', label: 'إدارة القواعد التجارية', icon: Scale, category: 'admin' },
    { id: 'odoo', label: 'الربط مع اودو', icon: LinkIcon, category: 'integration' },
    { id: 'whatsapp', label: 'واتساب', icon: MessageCircle, category: 'integration' },
  ];

  const renderNavGroup = (title: string, items: NavItem[]) => (
    <div className="mb-6">
      <h3 className="px-4 text-xs font-semibold text-slate-400 mb-2">{title}</h3>
      <div className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all
              ${activeTab === item.id 
                ? 'bg-primary-900 text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
          >
            <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'text-slate-500'} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // If mobile, we remove fixed positioning and width constraints handled by the Sheet
  const containerClasses = isMobile 
    ? "w-full h-full bg-white" 
    : "w-64 bg-white h-screen border-l border-slate-200 fixed right-0 top-0 overflow-y-auto z-50 shadow-[0_0_15px_rgba(0,0,0,0.03)] hidden md:block";

  return (
    <aside className={containerClasses}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                ل
            </div>
            <h1 className="text-xl font-bold text-slate-800">لنكي</h1>
        </div>
        
        {renderNavGroup('لوحات التحكم', navItems.filter(i => i.category === 'control'))}
        {renderNavGroup('الإدارة', navItems.filter(i => i.category === 'admin'))}
        {renderNavGroup('منصات الربط', navItems.filter(i => i.category === 'integration'))}
      </div>
    </aside>
  );
};