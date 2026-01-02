
"use client";

import React from 'react';
import { PageContainer } from '@/components/custom/PageContainer';
import { StatCard } from '@/components/custom/StatCard';
import { Button } from '@/components/ui/button'; // Using base shadcn button here
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileCheck, FileClock, Activity, AlertCircle, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animations';

export default function DashboardPage() {
  return (
    <PageContainer 
      title="نظرة عامة" 
      subtitle="مرحباً بعودتك، إليك ملخص أداء النظام اليوم."
      actions={
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 flex gap-2">
          <Plus size={16} />
          <span>مستند جديد</span>
        </Button>
      }
    >
      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={itemVariants}>
          <StatCard title="إجمالي المستندات" value="1,240" subtext="+12% من الشهر الماضي" icon={FileCheck} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="قيد المعالجة" value="85" subtext="يتطلب انتباهك" icon={FileClock} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="معدل النجاح" value="98.5%" subtext="أداء ممتاز" icon={Activity} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="الأخطاء" value="12" subtext="في آخر 24 ساعة" icon={AlertCircle} />
        </motion.div>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>النشاط الأخير</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 text-primary rounded-md">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">فاتورة مورد #INV-202{i}</p>
                      <p className="text-xs text-muted-foreground">تمت المعالجة بواسطة النظام</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">09:3{i} AM</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <CardTitle>توزيع الحالات</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[300px]">
             <div className="text-center text-muted-foreground text-sm">
                مخطط بياني (Chart)
             </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
// Icon import helper for this file
import { FileText } from 'lucide-react';
