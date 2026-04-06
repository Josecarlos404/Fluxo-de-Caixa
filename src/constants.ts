import { Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'salary', name: 'Salário', icon: 'Wallet', color: 'emerald' },
  { id: 'freelance', name: 'Freelance', icon: 'Laptop', color: 'emerald' },
  { id: 'investment', name: 'Investimento', icon: 'TrendingUp', color: 'emerald' },
  { id: 'food', name: 'Alimentação', icon: 'Utensils', color: 'rose' },
  { id: 'rent', name: 'Aluguel', icon: 'Home', color: 'rose' },
  { id: 'transport', name: 'Transporte', icon: 'Car', color: 'rose' },
  { id: 'leisure', name: 'Lazer', icon: 'Palmtree', color: 'rose' },
  { id: 'health', name: 'Saúde', icon: 'HeartPulse', color: 'rose' },
  { id: 'education', name: 'Educação', icon: 'BookOpen', color: 'rose' },
  { id: 'others', name: 'Outros', icon: 'MoreHorizontal', color: 'slate' },
];

export const INITIAL_DATA = [
  {
    id: '1',
    description: 'Salário Mensal',
    amount: 5000,
    date: new Date().toISOString().split('T')[0],
    category: 'salary',
    type: 'income',
  },
  {
    id: '2',
    description: 'Aluguel',
    amount: 1500,
    date: new Date().toISOString().split('T')[0],
    category: 'rent',
    type: 'expense',
  },
  {
    id: '3',
    description: 'Supermercado',
    amount: 600,
    date: new Date().toISOString().split('T')[0],
    category: 'food',
    type: 'expense',
  },
];
