'use client';

import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, Calendar, Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { format } from 'date-fns/format';
import { showAlert } from '@/lib/alerts';

interface Expense {
  _id: string;
  amount: number;
  date: string;
  expendedOn: string;
  category: string;
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showGrouped, setShowGrouped] = useState(false);
  const [groupedData, setGroupedData] = useState<any[]>([]);
  
  // Form state
  const [formData, setFormData] = useState({
    amount: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    expendedOn: '',
    category: 'other',
  });

  // Edit state
  const [editData, setEditData] = useState({
    amount: '',
    date: '',
    expendedOn: '',
    category: '',
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/expenses');
      const data = await response.json();
      setExpenses(data.expenses);
      setTotal(data.total);
    } catch (error) {
      showAlert.error('Failed to fetch expenses', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const fetchGroupedExpenses = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/expenses?groupBy=date');
      const data = await response.json();
      setGroupedData(data.groupedData);
      setShowGrouped(true);
    } catch (error) {
      showAlert.error('Failed to fetch grouped expenses', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.expendedOn) {
      showAlert.warning('Please fill all required fields', 'Missing Fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
        }),
      });

      if (response.ok) {
        showAlert.success('Expense added successfully!', 'Success');
        setFormData({
          amount: '',
          date: format(new Date(), 'yyyy-MM-dd'),
          expendedOn: '',
          category: 'other',
        });
        fetchExpenses();
      }
    } catch (error) {
      showAlert.error('Failed to add expense', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (expense: Expense) => {
    setEditingId(expense._id);
    setEditData({
      amount: expense.amount.toString(),
      date: format(new Date(expense.date), 'yyyy-MM-dd'),
      expendedOn: expense.expendedOn,
      category: expense.category,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({ amount: '', date: '', expendedOn: '', category: '' });
  };

  const saveExpense = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/expenses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          ...editData,
          amount: parseFloat(editData.amount),
        }),
      });

      if (response.ok) {
        showAlert.success('Expense updated!', 'Success');
        cancelEditing();
        fetchExpenses();
      }
    } catch (error) {
      showAlert.error('Failed to update expense', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id: string) => {
    const result = await showAlert.confirm('Delete this expense?', 'Confirm');
    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/expenses?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showAlert.success('Expense deleted!', 'Success');
        fetchExpenses();
      }
    } catch (error) {
      showAlert.error('Failed to delete expense', 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Total */}
      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Wallet className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h3 className="text-green-300 text-sm font-bold">Total Expenses</h3>
              <p className="text-white text-3xl font-bold">₹{total.toLocaleString('en-IN')}</p>
            </div>
          </div>
          <button
            onClick={() => showGrouped ? (setShowGrouped(false), fetchExpenses()) : fetchGroupedExpenses()}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center gap-2 text-sm font-bold"
          >
            <Calendar className="w-4 h-4" />
            {showGrouped ? 'Show All' : 'Group by Date'}
          </button>
        </div>
      </div>

      {/* Add Expense Form */}
      <form onSubmit={addExpense} className="bg-black/40 border-2 border-cyan-500/30 rounded-xl p-6">
        <h3 className="text-cyan-300 text-lg font-bold mb-4">Add New Expense</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="number"
            placeholder="Amount (₹)"
            value={formData.amount}
            onChange={e => setFormData({ ...formData, amount: e.target.value })}
            className="px-4 py-3 bg-black/40 border-2 border-cyan-500/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            required
          />
          <input
            type="date"
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
            className="px-4 py-3 bg-black/40 border-2 border-cyan-500/50 rounded-xl text-white focus:border-cyan-400 focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Expended on..."
            value={formData.expendedOn}
            onChange={e => setFormData({ ...formData, expendedOn: e.target.value })}
            className="px-4 py-3 bg-black/40 border-2 border-cyan-500/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-700 disabled:to-gray-800 text-white rounded-xl flex items-center justify-center gap-2 font-bold"
          >
            <Plus className="w-5 h-5" />
            Add
          </button>
        </div>
      </form>

      {/* Expenses Table/Cards */}
      {!showGrouped ? (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-black/40 border-2 border-cyan-500/30 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cyan-900/30 border-b-2 border-cyan-500/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Date</th>
                    <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Amount</th>
                    <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Expended On</th>
                    <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map(expense => (
                    <tr key={expense._id} className="border-b border-cyan-500/10 hover:bg-cyan-900/10">
                      <td className="px-4 py-3 text-gray-300 text-sm">
                        {editingId === expense._id ? (
                          <input
                            type="date"
                            value={editData.date}
                            onChange={e => setEditData({ ...editData, date: e.target.value })}
                            className="px-2 py-1 bg-black/40 border border-cyan-500/50 rounded text-white text-sm w-full"
                          />
                        ) : (
                          format(new Date(expense.date), 'dd MMM yyyy')
                        )}
                      </td>
                      <td className="px-4 py-3 text-white font-bold text-sm">
                        {editingId === expense._id ? (
                          <input
                            type="number"
                            value={editData.amount}
                            onChange={e => setEditData({ ...editData, amount: e.target.value })}
                            className="px-2 py-1 bg-black/40 border border-cyan-500/50 rounded text-white text-sm w-24"
                          />
                        ) : (
                          `₹${expense.amount.toLocaleString('en-IN')}`
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-300 text-sm">
                        {editingId === expense._id ? (
                          <input
                            type="text"
                            value={editData.expendedOn}
                            onChange={e => setEditData({ ...editData, expendedOn: e.target.value })}
                            className="px-2 py-1 bg-black/40 border border-cyan-500/50 rounded text-white text-sm w-full"
                          />
                        ) : (
                          expense.expendedOn
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {editingId === expense._id ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveExpense(expense._id)}
                              className="p-2 bg-green-600 hover:bg-green-500 text-white rounded"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="p-2 bg-red-600 hover:bg-red-500 text-white rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEditing(expense)}
                              className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteExpense(expense._id)}
                              className="p-2 bg-red-600 hover:bg-red-500 text-white rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {expenses.map(expense => (
              <div key={expense._id} className="bg-black/40 border-2 border-cyan-500/30 rounded-xl p-4">
                {editingId === expense._id ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-cyan-300 text-xs font-bold mb-1 block">Date</label>
                      <input
                        type="date"
                        value={editData.date}
                        onChange={e => setEditData({ ...editData, date: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-cyan-500/50 rounded-lg text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-cyan-300 text-xs font-bold mb-1 block">Amount</label>
                      <input
                        type="number"
                        value={editData.amount}
                        onChange={e => setEditData({ ...editData, amount: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-cyan-500/50 rounded-lg text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-cyan-300 text-xs font-bold mb-1 block">Expended On</label>
                      <input
                        type="text"
                        value={editData.expendedOn}
                        onChange={e => setEditData({ ...editData, expendedOn: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-cyan-500/50 rounded-lg text-white text-sm"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => saveExpense(expense._id)}
                        className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg flex items-center justify-center gap-2 font-bold text-sm"
                      >
                        <Check className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg flex items-center justify-center gap-2 font-bold text-sm"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="text-white font-bold text-lg mb-1">₹{expense.amount.toLocaleString('en-IN')}</div>
                        <div className="text-gray-300 text-sm">{expense.expendedOn}</div>
                      </div>
                      <div className="text-cyan-300 text-xs font-bold">
                        {format(new Date(expense.date), 'dd MMM yyyy')}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-3 border-t border-cyan-500/20">
                      <button
                        onClick={() => startEditing(expense)}
                        className="flex-1 px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center justify-center gap-2 font-bold text-xs"
                      >
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteExpense(expense._id)}
                        className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg flex items-center justify-center gap-2 font-bold text-xs"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {groupedData.map((group: any) => (
            <div key={group.date} className="bg-black/40 border-2 border-cyan-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-cyan-300 font-bold">{format(new Date(group.date), 'dd MMM yyyy')}</h4>
                <p className="text-white text-xl font-bold">₹{group.total.toLocaleString('en-IN')}</p>
              </div>
              <div className="space-y-2">
                {group.expenses.map((exp: Expense) => (
                  <div key={exp._id} className="flex justify-between text-sm text-gray-300 pl-4">
                    <span>{exp.expendedOn}</span>
                    <span className="font-bold">₹{exp.amount.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
