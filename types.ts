export interface NavItem {
  id: string;
  label: string;
  icon: any;
  category: 'control' | 'admin' | 'integration';
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon?: any;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}

export interface Document {
  id: string;
  name: string;
  user: string;
  date: string;
  size: string;
  status: 'pending' | 'processed' | 'failed';
  type: string;
}

export interface OCRField {
  key: string;
  label: string;
  value: string;
  confidence: number;
}

export interface OCRLineItem {
  code: string;
  description: string;
  packing: string;
  source: string;
  price: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface Department {
  id: string;
  name: string;
  manager: string;
  memberCount: number;
  status: 'active' | 'inactive';
}

export interface Template {
  id: string;
  name: string;
  type: string;
  fields: number;
  lastModified: string;
}

export interface BusinessRule {
  id: string;
  label: string;
  value: number;
  type: 'subscription' | 'limit';
}