import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';

export function Dashboard() {
  const { totals } = useTransactions();

  const cards = [
    {
      title: 'Receitas',
      amount: totals.income,
      icon: ArrowUpCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
    },
    {
      title: 'Despesas',
      amount: totals.expense,
      icon: ArrowDownCircle,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-100',
    },
    {
      title: 'Saldo Atual',
      amount: totals.balance,
      icon: Wallet,
      color: 'text-slate-900',
      bg: 'bg-slate-50',
      border: 'border-slate-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-6 rounded-2xl border ${card.border} ${card.bg} shadow-sm`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-600 uppercase tracking-wider">
              {card.title}
            </span>
            <card.icon className={`w-6 h-6 ${card.color}`} />
          </div>
          <div className={`text-2xl font-bold ${card.color}`}>
            {formatCurrency(card.amount)}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
