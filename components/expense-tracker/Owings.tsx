'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, Edit2, Trash2, Check, X, CheckCircle } from 'lucide-react';
import { format } from 'date-fns/format';
import { showAlert } from '@/lib/alerts';

interface Owing {
  _id: string;
  amount: number;
  name: string;
  dueDate: string;
  paid: boolean;
  paidDate?: string;
  note?: string;
}

export default function Owings() {
  const [owings, setOwings] = useState<Owing[]>([]);
  const [total, setTotal] = useState(0);
  const [totalOwed, setTotalOwed] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    amount: '',
    name: '',
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    note: '',
  });

  const [editData, setEditData] = useState({
    amount: '',
    name: '',
    dueDate: '',
    note: '',
    paid: false,
  });

  useEffect(() => {
    fetchOwings();
  }, []);

  const fetchOwings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/owings');
      const data = await response.json();
      setOwings(data.owings);
      setTotal(data.total);
      setTotalOwed(data.totalOwed);
    } catch (error) {
      showAlert.error('Failed to fetch owings', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const addOwing = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.name) {
      showAlert.warning('Please fill all required fields', 'Missing Fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/owings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
        }),
      });

      if (response.ok) {
        showAlert.success('Owing added successfully!', 'Success');
        setFormData({
          amount: '',
          name: '',
          dueDate: format(new Date(), 'yyyy-MM-dd'),
          note: '',
        });
        fetchOwings();
      }
    } catch (error) {
      showAlert.error('Failed to add owing', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (owing: Owing) => {
    setEditingId(owing._id);
    setEditData({
      amount: owing.amount.toString(),
      name: owing.name,
      dueDate: format(new Date(owing.dueDate), 'yyyy-MM-dd'),
      note: owing.note || '',
      paid: owing.paid,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveOwing = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/owings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          ...editData,
          amount: parseFloat(editData.amount),
          paidDate: editData.paid ? new Date() : null,
        }),
      });

      if (response.ok) {
        showAlert.success('Owing updated!', 'Success');
        cancelEditing();
        fetchOwings();
      }
    } catch (error) {
      showAlert.error('Failed to update owing', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const deleteOwing = async (id: string) => {
    const result = await showAlert.confirm('Delete this owing?', 'Confirm');
    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      await fetch(`/api/owings?id=${id}`, { method: 'DELETE' });
      showAlert.success('Owing deleted!', 'Success');
      fetchOwings();
    } catch (error) {
      showAlert.error('Failed to delete owing', 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Total */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-2 border-red-400/50 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <CreditCard className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <h3 className="text-red-300 text-sm font-bold">Pending Payments</h3>
              <p className="text-white text-3xl font-bold">₹{total.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400/50 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <CreditCard className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h3 className="text-purple-300 text-sm font-bold">Total Owed</h3>
              <p className="text-white text-3xl font-bold">₹{totalOwed.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Owing Form */}
      <form onSubmit={addOwing} className="bg-black/40 border-2 border-cyan-500/30 rounded-xl p-6">
        <h3 className="text-cyan-300 text-lg font-bold mb-4">Add New Owing</h3>
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
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="px-4 py-3 bg-black/40 border-2 border-cyan-500/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            required
          />
          <input
            type="date"
            value={formData.dueDate}
            onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
            className="px-4 py-3 bg-black/40 border-2 border-cyan-500/50 rounded-xl text-white focus:border-cyan-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 disabled:from-gray-700 disabled:to-gray-800 text-white rounded-xl flex items-center justify-center gap-2 font-bold"
          >
            <Plus className="w-5 h-5" />
            Add
          </button>
        </div>
      </form>

      {/* Owings Table/Cards */}
      <>
        {/* Desktop Table View */}
        <div className="hidden md:block bg-black/40 border-2 border-cyan-500/30 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cyan-900/30 border-b-2 border-cyan-500/30">
                <tr>
                  <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Name</th>
                  <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Amount</th>
                  <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Due Date</th>
                  <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Status</th>
                  <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Actions</th>
                </tr>
              </thead>
            <tbody>
              {owings.map(owing => (
                <tr key={owing._id} className={`border-b border-cyan-500/10 hover:bg-cyan-900/10 ${owing.paid ? 'opacity-50' : ''}`}>
                  <td className="px-4 py-3 text-white">
                    {editingId === owing._id ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={e => setEditData({ ...editData, name: e.target.value })}
                        className="px-2 py-1 bg-black/40 border border-cyan-500/50 rounded text-white text-sm w-full"
                      />
                    ) : (
                      owing.name
                    )}
                  </td>
                  <td className="px-4 py-3 text-white font-bold">
                    {editingId === owing._id ? (
                      <input
                        type="number"
                        value={editData.amount}
                        onChange={e => setEditData({ ...editData, amount: e.target.value })}
                        className="px-2 py-1 bg-black/40 border border-cyan-500/50 rounded text-white text-sm w-24"
                      />
                    ) : (
                      `₹${owing.amount.toLocaleString('en-IN')}`
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-300 text-sm">
                    {editingId === owing._id ? (
                      <input
                        type="date"
                        value={editData.dueDate}
                        onChange={e => setEditData({ ...editData, dueDate: e.target.value })}
                        className="px-2 py-1 bg-black/40 border border-cyan-500/50 rounded text-white text-sm"
                      />
                    ) : (
                      format(new Date(owing.dueDate), 'dd MMM yyyy')
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === owing._id ? (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editData.paid}
                          onChange={e => setEditData({ ...editData, paid: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-300">Paid</span>
                      </label>
                    ) : owing.paid ? (
                      <span className="flex items-center gap-1 text-green-400 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Paid
                      </span>
                    ) : (
                      <span className="text-red-400 text-sm">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === owing._id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveOwing(owing._id)}
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
                          onClick={() => startEditing(owing)}
                          className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteOwing(owing._id)}
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
        {owings.map(owing => (
          <div key={owing._id} className={`bg-black/40 border-2 border-cyan-500/30 rounded-xl p-4 ${owing.paid ? 'opacity-60' : ''}`}>
            {editingId === owing._id ? (
              <div className="space-y-3">
                <div>
                  <label className="text-cyan-300 text-xs font-bold mb-1 block">Name</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={e => setEditData({ ...editData, name: e.target.value })}
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
                  <label className="text-cyan-300 text-xs font-bold mb-1 block">Due Date</label>
                  <input
                    type="date"
                    value={editData.dueDate}
                    onChange={e => setEditData({ ...editData, dueDate: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-cyan-500/50 rounded-lg text-white text-sm"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editData.paid}
                      onChange={e => setEditData({ ...editData, paid: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-300">Mark as Paid</span>
                  </label>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => saveOwing(owing._id)}
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
                    <div className="text-white font-bold text-lg mb-1">{owing.name}</div>
                    <div className="text-white text-xl font-bold">₹{owing.amount.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-cyan-300 text-xs font-bold mb-1">
                      {format(new Date(owing.dueDate), 'dd MMM yyyy')}
                    </div>
                    {owing.paid ? (
                      <span className="inline-flex items-center gap-1 text-green-400 text-xs">
                        <CheckCircle className="w-3 h-3" />
                        Paid
                      </span>
                    ) : (
                      <span className="text-red-400 text-xs font-bold">Pending</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 pt-3 border-t border-cyan-500/20">
                  <button
                    onClick={() => startEditing(owing)}
                    className="flex-1 px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center justify-center gap-2 font-bold text-xs"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteOwing(owing._id)}
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
    </div>
  );
}
