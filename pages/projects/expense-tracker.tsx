import React, { useState } from 'react';
import Head from 'next/head';
import { Wallet, HandCoins, CreditCard } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import ExpenseTracker from '@/components/expense-tracker/ExpenseTracker';
import Lendings from '@/components/expense-tracker/Lendings';
import Owings from '@/components/expense-tracker/Owings';

export default function ExpenseTrackerPage() {
  const [activeTab, setActiveTab] = useState<'expenses' | 'lendings' | 'owings'>('expenses');

  return (
    <ProtectedRoute projectSlug="expense-tracker">
    <>
      <Head>
        <title>Expense Tracker | Project Hub</title>
        <meta name="description" content="Track your expenses, lendings, and owings" />
      </Head>

      <div className="min-h-screen bg-black p-2 sm:p-4 md:p-8 pt-20 sm:pt-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex-shrink-0">
                <Wallet className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wider truncate">
                  Expense <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Tracker</span>
                </h1>
                <p className="text-gray-400 text-xs sm:text-sm">Manage your finances efficiently</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 sm:gap-2 bg-black/40 p-1 sm:p-2 rounded-lg sm:rounded-xl border-2 border-cyan-500/30">
              <button
                onClick={() => setActiveTab('expenses')}
                className={`flex-1 px-2 sm:px-4 md:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg font-bold text-xs sm:text-sm uppercase transition-all flex items-center justify-center gap-1 sm:gap-2 ${
                  activeTab === 'expenses'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Wallet className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="hidden xs:inline">Expenses</span>
                <span className="xs:hidden">Exp</span>
              </button>
              <button
                onClick={() => setActiveTab('lendings')}
                className={`flex-1 px-2 sm:px-4 md:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg font-bold text-xs sm:text-sm uppercase transition-all flex items-center justify-center gap-1 sm:gap-2 ${
                  activeTab === 'lendings'
                    ? 'bg-gradient-to-r from-orange-600 to-yellow-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <HandCoins className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="hidden xs:inline">Lendings</span>
                <span className="xs:hidden">Lend</span>
              </button>
              <button
                onClick={() => setActiveTab('owings')}
                className={`flex-1 px-2 sm:px-4 md:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg font-bold text-xs sm:text-sm uppercase transition-all flex items-center justify-center gap-1 sm:gap-2 ${
                  activeTab === 'owings'
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="hidden xs:inline">Owings</span>
                <span className="xs:hidden">Owe</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-gradient-to-br from-cyan-950/40 via-purple-950/40 to-black/60 backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-cyan-500/30 p-3 sm:p-4 md:p-6 lg:p-8">
            {activeTab === 'expenses' && <ExpenseTracker />}
            {activeTab === 'lendings' && <Lendings />}
            {activeTab === 'owings' && <Owings />}
          </div>
        </div>
      </div>
    </>
    </ProtectedRoute>
  );
}
