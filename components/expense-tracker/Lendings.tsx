'use client';

import React, { useState, useEffect } from 'react';
import { HandCoins, Plus, Edit2, Trash2, Check, X, CheckCircle } from 'lucide-react';
import { format } from 'date-fns/format';
import { showAlert } from '@/lib/alerts';

interface Lending {
  _id: string;
  amount: number;
  name: string;
  promiseToReturnDate: string;
  returned: boolean;
  returnedDate?: string;
  note?: string;
}

export default function Lendings() {
  const [lendings, setLendings] = useState<Lending[]>([]);
  const [total, setTotal] = useState(0);
  const [totalLent, setTotalLent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    amount: '',
    name: '',
    promiseToReturnDate: format(new Date(), 'yyyy-MM-dd'),
    note: '',
  });

  const [editData, setEditData] = useState({
    amount: '',
    name: '',
    promiseToReturnDate: '',
    note: '',
    returned: false,
  });

  useEffect(() => {
    fetchLendings();
  }, []);

  const fetchLendings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/lendings');
      const data = await response.json();
      setLendings(data.lendings);
      setTotal(data.total);
      setTotalLent(data.totalLent);
    } catch (error) {
      showAlert.error('Failed to fetch lendings', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const addLending = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.name) {
      showAlert.warning('Please fill all required fields', 'Missing Fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/lendings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
        }),
      });

      if (response.ok) {
        showAlert.success('Lending added successfully!', 'Success');
        setFormData({
          amount: '',
          name: '',
          promiseToReturnDate: format(new Date(), 'yyyy-MM-dd'),
          note: '',
        });
        fetchLendings();
      }
    } catch (error) {
      showAlert.error('Failed to add lending', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (lending: Lending) => {
    setEditingId(lending._id);
    setEditData({
      amount: lending.amount.toString(),
      name: lending.name,
      promiseToReturnDate: format(new Date(lending.promiseToReturnDate), 'yyyy-MM-dd'),
      note: lending.note || '',
      returned: lending.returned,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveLending = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/lendings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          ...editData,
          amount: parseFloat(editData.amount),
          returnedDate: editData.returned ? new Date() : null,
        }),
      });

      if (response.ok) {
        showAlert.success('Lending updated!', 'Success');
        cancelEditing();
        fetchLendings();
      }
    } catch (error) {
      showAlert.error('Failed to update lending', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const deleteLending = async (id: string) => {
    const result = await showAlert.confirm('Delete this lending?', 'Confirm');
    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      await fetch(`/api/lendings?id=${id}`, { method: 'DELETE' });
      showAlert.success('Lending deleted!', 'Success');
      fetchLendings();
    } catch (error) {
      showAlert.error('Failed to delete lending', 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Total */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-2 border-orange-400/50 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <HandCoins className="w-8 h-8 text-orange-400" />
            </div>
            <div>
              <h3 className="text-orange-300 text-sm font-bold">Pending Returns</h3>
              <p className="text-white text-3xl font-bold">₹{total.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400/50 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <HandCoins className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h3 className="text-purple-300 text-sm font-bold">Total Lent</h3>
              <p className="text-white text-3xl font-bold">₹{totalLent.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Lending Form */}
      <form onSubmit={addLending} className="bg-black/40 border-2 border-cyan-500/30 rounded-xl p-6">
        <h3 className="text-cyan-300 text-lg font-bold mb-4">Add New Lending</h3>
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
            value={formData.promiseToReturnDate}
            onChange={e => setFormData({ ...formData, promiseToReturnDate: e.target.value })}
            className="px-4 py-3 bg-black/40 border-2 border-cyan-500/50 rounded-xl text-white focus:border-cyan-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 disabled:from-gray-700 disabled:to-gray-800 text-white rounded-xl flex items-center justify-center gap-2 font-bold"
          >
            <Plus className="w-5 h-5" />
            Add
          </button>
        </div>
      </form>

      {/* Lendings Table */}
      <div className="bg-black/40 border-2 border-cyan-500/30 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cyan-900/30 border-b-2 border-cyan-500/30">
              <tr>
                <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Name</th>
                <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Amount</th>
                <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Promise Date</th>
                <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Status</th>
                <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lendings.map(lending => (
                <tr key={lending._id} className={`border-b border-cyan-500/10 hover:bg-cyan-900/10 ${lending.returned ? 'opacity-50' : ''}`}>
                  <td className="px-4 py-3 text-white">
                    {editingId === lending._id ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={e => setEditData({ ...editData, name: e.target.value })}
                        className="px-2 py-1 bg-black/40 border border-cyan-500/50 rounded text-white text-sm w-full"
                      />
                    ) : (
                      lending.name
                    )}
                  </td>
                  <td className="px-4 py-3 text-white font-bold">
                    {editingId === lending._id ? (
                      <input
                        type="number"
                        value={editData.amount}
                        onChange={e => setEditData({ ...editData, amount: e.target.value })}
                        className="px-2 py-1 bg-black/40 border border-cyan-500/50 rounded text-white text-sm w-24"
                      />
                    ) : (
                      `₹${lending.amount.toLocaleString('en-IN')}`
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-300 text-sm">
                    {editingId === lending._id ? (
                      <input
                        type="date"
                        value={editData.promiseToReturnDate}
                        onChange={e => setEditData({ ...editData, promiseToReturnDate: e.target.value })}
                        className="px-2 py-1 bg-black/40 border border-cyan-500/50 rounded text-white text-sm"
                      />
                    ) : (
                      format(new Date(lending.promiseToReturnDate), 'dd MMM yyyy')
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === lending._id ? (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editData.returned}
                          onChange={e => setEditData({ ...editData, returned: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-300">Returned</span>
                      </label>
                    ) : lending.returned ? (
                      <span className="flex items-center gap-1 text-green-400 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Returned
                      </span>
                    ) : (
                      <span className="text-orange-400 text-sm">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === lending._id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveLending(lending._id)}
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
                          onClick={() => startEditing(lending)}
                          className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteLending(lending._id)}
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
    </div>
  );
}
