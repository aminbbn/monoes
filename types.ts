import { ReactNode } from 'react';

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  stat: string;
  monkeyAction: 'conduct' | 'file' | 'type' | 'time' | 'guard' | 'connect';
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}
