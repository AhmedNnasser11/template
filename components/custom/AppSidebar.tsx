
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  FileBox, 
  User, 
  Users, 
  Building2, 
  Scale, 
  Link as LinkIcon, 
  MessageCircle,
  Settings
} from 'lucide-react';

export const AppSidebar: React.FC = () => {
  const pathname = usePathname();

  const menuGroups = [
    {
      title: "لوحات التحكم",
      items: [
        { label: "الرئيسية", href: "/dashboard", icon: LayoutDashboard },
        { label: "إدارة المستندات", href: "/dashboard/documents", icon: FileText },
        { label: "إدارة النماذج", href: "/dashboard/templates", icon: FileBox },
      ]
    },
    {
      title: "الإدارة",
      items: [
        { label: "الملف الشخصي", href: "/dashboard/profile", icon: User },
        { label: "أعضاء الفريق", href: "/dashboard/team", icon: Users },
        { label: "الأقسام", href: "/dashboard/departments", icon: Building2 },
        { label: "القواعد التجارية", href: "/dashboard/rules", icon: Scale },
      ]
    },
    {
      title: "منصات الربط",
      items: [
        { label: "Odoo ERP", href: "/dashboard/integrations/odoo", icon: LinkIcon },
        { label: "WhatsApp", href: "/dashboard/integrations/whatsapp", icon: MessageCircle },
      ]
    }
  ];

  return (
    <aside className="hidden md:flex flex-col w-[var(--sidebar-width)] h-screen bg-card border-e fixed inset-y-0 start-0 z-40">
      {/* Brand */}
      <div className="h-16 flex items-center gap-3 px-6 border-b">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">
          ل
        </div>
        <h1 className="text-lg font-bold">لنكي</h1>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="px-4 text-xs font-semibold text-muted-foreground mb-2">{group.title}</h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200
                      ${isActive 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          <Settings size={18} />
          <span>الإعدادات العامة</span>
        </Link>
      </div>
    </aside>
  );
};
