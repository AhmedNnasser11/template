
import React from 'react';
import { AppSidebar } from '@/components/custom/AppSidebar';
import { Bell, Search, User } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <AppSidebar />
      
      {/* Main Content Area */}
      {/* ms-[var(--sidebar-width)] adds margin-start (left in LTR, right in RTL) automatically */}
      <div className="ms-0 md:ms-[var(--sidebar-width)] transition-all duration-300 min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="h-16 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-30 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 w-1/3">
             <div className="relative w-full max-w-sm">
                <Search className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input 
                  type="text" 
                  placeholder="بحث سريع..." 
                  className="w-full bg-muted/50 border-none rounded-full ps-4 pe-10 py-1.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
             </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell size={20} />
                <span className="absolute top-1.5 end-1.5 w-2 h-2 bg-destructive rounded-full ring-2 ring-card"></span>
             </button>
             <div className="h-8 w-px bg-border mx-2"></div>
             <div className="flex items-center gap-3">
                <div className="text-end hidden sm:block">
                   <p className="text-sm font-bold leading-none">Alsalamah</p>
                   <p className="text-xs text-muted-foreground mt-1">Admin</p>
                </div>
                <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20">
                   <User size={18} />
                </div>
             </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
           {children}
        </main>
      </div>
    </div>
  );
}
