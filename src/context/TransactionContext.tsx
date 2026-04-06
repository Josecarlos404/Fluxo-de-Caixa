import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, MonthlyData } from '../types';
import { INITIAL_DATA } from '../constants';

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  totals: {
    income: number;
    expense: number;
    balance: number;
  };
  getMonthlyData: () => MonthlyData[];
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('fluxo-caixa-transactions');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  useEffect(() => {
    localStorage.setItem('fluxo-caixa-transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (data: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...data,
      id: crypto.randomUUID(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const updateTransaction = (updated: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const totals = transactions.reduce(
    (acc, t) => {
      if (t.type === 'income') {
        acc.income += t.amount;
        acc.balance += t.amount;
      } else {
        acc.expense += t.amount;
        acc.balance -= t.amount;
      }
      return acc;
    },
    { income: 0, expense: 0, balance: 0 }
  );

  const getMonthlyData = (): MonthlyData[] => {
    const months: Record<string, MonthlyData> = {};
    
    // Last 6 months
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return d.toLocaleString('pt-BR', { month: 'short' });
    }).reverse();

    last6Months.forEach(m => {
      months[m] = { month: m, income: 0, expense: 0, balance: 0 };
    });

    transactions.forEach((t) => {
      const month = new Date(t.date).toLocaleString('pt-BR', { month: 'short' });
      if (months[month]) {
        if (t.type === 'income') {
          months[month].income += t.amount;
        } else {
          months[month].expense += t.amount;
        }
        months[month].balance = months[month].income - months[month].expense;
      }
    });

    return Object.values(months);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        totals,
        getMonthlyData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}
