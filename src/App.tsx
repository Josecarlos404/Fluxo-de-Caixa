import React, { useState } from 'react';
import { Plus, LayoutDashboard, History, PieChart as ChartIcon, Settings, LogOut } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { TransactionList } from './components/TransactionList';
import { TransactionForm } from './components/TransactionForm';
import { Charts } from './components/Charts';
import { TransactionProvider } from './context/TransactionContext';
import { Transaction } from './types';
import { motion } from 'motion/react';

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTransaction(null);
  };

  return (
    <TransactionProvider>
      <div className="min-h-screen bg-slate-50 flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col">
          <div className="p-6">
            <div className="flex items-center gap-3 text-indigo-600 mb-8">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">FluxoPro</span>
            </div>

            <nav className="space-y-1">
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-indigo-600 bg-indigo-50 rounded-xl font-medium transition-all">
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-all">
                <History className="w-5 h-5" />
                Transações
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-all">
                <ChartIcon className="w-5 h-5" />
                Relatórios
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-all">
                <Settings className="w-5 h-5" />
                Configurações
              </a>
            </nav>
          </div>

          <div className="mt-auto p-6 border-t border-slate-100">
            <button className="flex items-center gap-3 px-4 py-3 text-rose-600 hover:bg-rose-50 w-full rounded-xl font-medium transition-all">
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-sm text-slate-500">Bem-vindo de volta ao seu controle financeiro.</p>
              </div>

              <button
                onClick={() => setIsFormOpen(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
              >
                <Plus className="w-5 h-5" />
                Nova Transação
              </button>
            </div>
          </header>

          <div className="max-w-6xl mx-auto px-6 py-8">
            <Dashboard />
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <Charts />
                <TransactionList onEdit={handleEdit} />
              </div>
              
              <div className="space-y-8">
                <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200">
                  <h3 className="text-lg font-semibold mb-2">Dica Financeira</h3>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Tente economizar pelo menos 20% da sua renda mensal para investimentos de longo prazo.
                  </p>
                  <button className="mt-4 text-sm font-medium bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                    Ver mais dicas
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Metas do Mês</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Reserva de Emergência</span>
                        <span className="font-medium text-slate-900">75%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-3/4" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Investimentos</span>
                        <span className="font-medium text-slate-900">40%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 w-2/5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <TransactionForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          editingTransaction={editingTransaction}
        />
      </div>
    </TransactionProvider>
  );
}
