import React, { useState } from 'react';
import Head from 'next/head';
import { Wallet, HandCoins, CreditCard } from 'lucide-react';
import ExpenseTracker from '@/components/expense-tracker/ExpenseTracker';
import Lendings from '@/components/expense-tracker/Lendings';
import Owings from '@/components/expense-tracker/Owings';

export default function ExpenseTrackerPage() {
  const [activeTab, setActiveTab] = useState<'expenses' | 'lendings' | 'owings'>('expenses');

  return (
    <>
      <Head>
        <title>Expense Tracker | Project Hub</title>
        <meta name="description" content="Track your expenses, lendings, and owings" />
      </Head>

      <div className="min-h-screen bg-black p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-xl">
                <Wallet className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white uppercase tracking-wider">
                  Expense <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Tracker</span>
                </h1>
                <p className="text-gray-400 text-sm">Manage your finances efficiently</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-black/40 p-2 rounded-xl border-2 border-cyan-500/30">
              <button
                onClick={() => setActiveTab('expenses')}
                className={`flex-1 px-6 py-3 rounded-lg font-bold text-sm uppercase transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'expenses'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Wallet className="w-5 h-5" />
                Expenses
              </button>
              <button
                onClick={() => setActiveTab('lendings')}
                className={`flex-1 px-6 py-3 rounded-lg font-bold text-sm uppercase transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'lendings'
                    ? 'bg-gradient-to-r from-orange-600 to-yellow-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <HandCoins className="w-5 h-5" />
                Lendings
              </button>
              <button
                onClick={() => setActiveTab('owings')}
                className={`flex-1 px-6 py-3 rounded-lg font-bold text-sm uppercase transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'owings'
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                Owings
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-gradient-to-br from-cyan-950/40 via-purple-950/40 to-black/60 backdrop-blur-2xl rounded-3xl border-2 border-cyan-500/30 p-8">
            {activeTab === 'expenses' && <ExpenseTracker />}
            {activeTab === 'lendings' && <Lendings />}
            {activeTab === 'owings' && <Owings />}
          </div>
        </div>
      </div>
    </>
  );
}
