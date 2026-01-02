
"use client";

import React from 'react';
import { Card, CardContent } from '../ui/card';
import { motion } from 'framer-motion';
import { cardHoverVariants } from '../../lib/animations';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  loading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtext, 
  icon: Icon,
  loading = false
}) => {
  if (loading) {
    return (
      <Card className="h-32 animate-pulse bg-muted/50" />
    );
  }

  return (
    <motion.div variants={cardHoverVariants} initial="initial" whileHover="hover">
      <Card className="overflow-hidden border-none shadow-sm ring-1 ring-black/5">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            {Icon && (
              <div className="p-2 bg-[hsl(var(--primary)/0.1)] rounded-lg text-primary">
                <Icon size={20} />
              </div>
            )}
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
