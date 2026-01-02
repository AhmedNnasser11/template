import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { ExtractionView } from './pages/ExtractionView';
import { TeamManagement } from './pages/TeamManagement';
import { BusinessRules } from './pages/BusinessRules';
import { Departments } from './pages/Departments';
import { Templates } from './pages/Templates';
import { Integrations } from './pages/Integrations';
import { Profile } from './pages/Profile';
import { Card, Button, Popover } from './components/UIComponents';
import { GlobalFeedback } from './components/GlobalFeedback'; // Unified feedback import
import { Loading } from './components/Loading'; // Use the component wrapper
import { Bell, Search, User, Menu, CheckCircle2, AlertCircle } from 'lucide-react';
import { useUiStore } from './store/use-ui-store';

// Mock Document Management Page
const DocumentManagement: React.FC<{ onViewDoc: () => void }> = ({ onViewDoc }) => {
  const { showAlert, askConfirm } = useUiStore();

  return (
    <div className="space-y-6 animate-in fade-in">
       <div className="flex justify-between items-center">
          <div>
              <h2 className="text-2xl font-bold text-slate-800">إدارة المستندات</h2>
              <p className="text-slate-500">قم برفع وإدارة الفواتير والمستندات الخاصة بك.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => showAlert('info', 'تلميح', 'يمكنك سحب الملفات مباشرة للمنطقة المخصصة')}>
              مساعدة
            </Button>
            <Button variant="ghost" className="text-red-500" onClick={() => askConfirm({
              title: 'حذف جميع الملفات',
              message: 'هل أنت متأكد من حذف جميع الملفات المؤرشفة؟ لا يمكن التراجع عن هذا الإجراء.',
              confirmText: 'نعم، حذف',
              variant: 'danger',
              onConfirm: () => showAlert('success', 'تم الحذف', 'تم حذف الملفات بنجاح')
            })}>
              حذف الكل
            </Button>
          </div>
       </div>
       
       <Card className="border-dashed border-2 border-slate-300 bg-slate-50 p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors group">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <span className="text-3xl text-slate-400 group-hover:text-primary-500">↑</span>
          </div>
          <h3 className="font-bold text-slate-700 mb-2 text-lg">اسحب وأفلت الملفات هنا</h3>
          <p className="text-slate-400 text-sm mb-6">يدعم PDF, PNG, JPG (الحد الأقصى 10MB)</p>
          <Button onClick={() => showAlert('warning', 'تنبيه', 'خاصية الرفع معطلة مؤقتاً للصيانة')}>
             اختر الملفات من جهازك
          </Button>
       </Card>
  
       <div className="mt-8 pt-8 border-t border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">آخر الملفات المرفوعة</h3>
          <Button variant="ghost" onClick={onViewDoc} className="w-full justify-between bg-white border border-slate-200 p-4 h-auto hover:border-primary-300">
              <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 text-red-600 rounded">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div className="text-right">
                      <p className="font-bold text-slate-700">Change of Prices for Frozen & Chilled Eggs.pdf</p>
                      <p className="text-xs text-slate-400">290 KB • تم الرفع بواسطة Alsalamah</p>
                  </div>
              </div>
              <span className="text-primary-600 text-sm">عرض ومعالجة ←</span>
          </Button>
       </div>
    </div>
  );
};

// Mock Placeholder Page
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
    <div className="flex flex-col items-center justify-center h-96 text-slate-400 animate-in fade-in">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">🚧</span>
        </div>
        <h2 className="text-xl font-bold text-slate-600 mb-2">{title}</h2>
        <p>هذه الصفحة قيد التطوير</p>
    </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState<'list' | 'extraction'>('list');
  const [isLoading, setIsLoading] = useState(true);
  const { openDrawer } = useUiStore();

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200); // Slightly longer for demo
    return () => clearTimeout(timer);
  }, []);

  const handleViewDocument = (id: string) => {
    setActiveTab('documents');
    setViewMode('extraction');
  };

  const renderContent = () => {
    if (isLoading) return <Loading />;

    // If we are in extraction mode within documents tab
    if (activeTab === 'documents' && viewMode === 'extraction') {
        return <ExtractionView onBack={() => setViewMode('list')} />;
    }

    // Main Router Switch
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onViewDocument={handleViewDocument} />;
      case 'documents':
        return <DocumentManagement onViewDoc={() => setViewMode('extraction')} />;
      case 'templates':
        return <Templates />;
      case 'team':
        return <TeamManagement />;
      case 'departments':
        return <Departments />;
      case 'rules':
        return <BusinessRules />;
      case 'odoo':
        return <Integrations type="odoo" />;
      case 'whatsapp':
        return <Integrations type="whatsapp" />;
      case 'profile':
        return <Profile />;
      default:
        return <PlaceholderPage title={activeTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-right font-cairo" dir="rtl">
      {/* Desktop Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
          setActiveTab(tab);
          setViewMode('list');
      }} />

      {/* Main Content Area */}
      <main className="flex-1 mr-0 md:mr-64 transition-all duration-300 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-4 md:px-8 flex justify-between items-center">
            <div className="flex items-center gap-4 flex-1">
                {/* Mobile Menu Trigger */}
                <button 
                  onClick={() => openDrawer('mobile-nav')}
                  className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                >
                  <Menu size={24} />
                </button>

                <div className="relative w-full max-w-sm hidden md:block">
                    <Search className="absolute right-3 top-2.5 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="بحث..." 
                        className="w-full bg-slate-50 border-none rounded-full px-10 py-2 text-sm focus:ring-2 focus:ring-primary-100 focus:bg-white transition-all outline-none"
                    />
                </div>
            </div>
            
            <div className="flex items-center gap-4 md:gap-6">
                <Popover
                    trigger={
                        <div className="relative cursor-pointer p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <Bell className="text-slate-500 hover:text-primary-600 transition-colors" size={20} />
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                        </div>
                    }
                    content={
                        <div className="w-80">
                            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h4 className="font-bold text-slate-800">الإشعارات</h4>
                                <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">3 جديدة</span>
                            </div>
                            <div className="max-h-[300px] overflow-y-auto">
                                <div className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                                    <div className="mt-1"><CheckCircle2 size={16} className="text-emerald-500" /></div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">تم معالجة المستند بنجاح</p>
                                        <p className="text-xs text-slate-500 mt-1">فاتورة رقم #9821 - منذ 5 دقائق</p>
                                    </div>
                                </div>
                                <div className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                                    <div className="mt-1"><AlertCircle size={16} className="text-amber-500" /></div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">تحديث حالة الاشتراك</p>
                                        <p className="text-xs text-slate-500 mt-1">تم استهلاك 80% من الباقة - منذ ساعة</p>
                                    </div>
                                </div>
                                <div className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                                    <div className="mt-1"><User size={16} className="text-blue-500" /></div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">تسجيل دخول جديد</p>
                                        <p className="text-xs text-slate-500 mt-1">من جهاز غير معروف - الرياض</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 border-t border-slate-100">
                                <Button variant="ghost" size="sm" className="w-full text-primary-600 hover:text-primary-700">عرض كل الإشعارات</Button>
                            </div>
                        </div>
                    }
                    side="bottom"
                />
                
                <div className="flex items-center gap-3 border-r border-slate-200 pr-6">
                    <div className="text-left hidden sm:block">
                        <p className="text-sm font-bold text-slate-800">Mohamed Ahmed</p>
                        <p className="text-xs text-slate-500">mo_nayef125@gmail.com</p>
                    </div>
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 border border-primary-200 cursor-pointer hover:shadow-md transition-shadow">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full flex-1">
            {/* Global Feedback Container (Alerts, Drawers, Modals) */}
            <GlobalFeedback activeTab={activeTab} setActiveTab={(tab) => {
                 setActiveTab(tab);
                 setViewMode('list');
            }} />
            
            {/* 2. Main Page Content */}
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;