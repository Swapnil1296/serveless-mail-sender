'use client';

import React, { useState, useEffect } from 'react';
import { HandCoins, Plus, Edit2, Trash2, Check, X, CheckCircle, ArrowDownCircle, DollarSign } from 'lucide-react';
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
  totalRepaid?: number;
  pendingAmount?: number;
}

interface Repayment {
  _id: string;
  lendingId: string;
  amount: number;
  repaymentDate: string;
  note?: string;
}

export default function Lendings() {
  const [lendings, setLendings] = useState<Lending[]>([]);
  const [total, setTotal] = useState(0);
  const [totalLent, setTotalLent] = useState(0);
  const [totalRepaid, setTotalRepaid] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedLendingId, setSelectedLendingId] = useState<string | null>(null);
  const [repayments, setRepayments] = useState<Repayment[]>([]);
  const [showRepaymentModal, setShowRepaymentModal] = useState(false);
  
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

  const [repaymentFormData, setRepaymentFormData] = useState({
    amount: '',
    repaymentDate: format(new Date(), 'yyyy-MM-dd'),
    note: '',
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
      setTotalRepaid(data.totalRepaid || 0);
    } catch (error) {
      showAlert.error('Failed to fetch lendings', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const fetchRepayments = async (lendingId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/repayments?lendingId=${lendingId}`);
      const data = await response.json();
      setRepayments(data.repayments);
    } catch (error) {
      showAlert.error('Failed to fetch repayments', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const openRepaymentModal = async (lendingId: string) => {
    setSelectedLendingId(lendingId);
    await fetchRepayments(lendingId);
    setShowRepaymentModal(true);
  };

  const closeRepaymentModal = () => {
    setShowRepaymentModal(false);
    setSelectedLendingId(null);
    setRepayments([]);
    setRepaymentFormData({
      amount: '',
      repaymentDate: format(new Date(), 'yyyy-MM-dd'),
      note: '',
    });
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

  const addRepayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!repaymentFormData.amount || !selectedLendingId) {
      showAlert.warning('Please fill all required fields', 'Missing Fields');
      return;
    }

    const lending = lendings.find(l => l._id === selectedLendingId);
    const repaymentAmount = parseFloat(repaymentFormData.amount);
    const pendingAmount = lending?.pendingAmount || 0;

    if (repaymentAmount > pendingAmount) {
      showAlert.warning(`Repayment amount cannot exceed pending amount ₹${pendingAmount.toLocaleString('en-IN')}`, 'Invalid Amount');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/repayments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lendingId: selectedLendingId,
          amount: repaymentAmount,
          repaymentDate: repaymentFormData.repaymentDate,
          note: repaymentFormData.note,
        }),
      });

      if (response.ok) {
        showAlert.success('Repayment added successfully!', 'Success');
        setRepaymentFormData({
          amount: '',
          repaymentDate: format(new Date(), 'yyyy-MM-dd'),
          note: '',
        });
        await fetchRepayments(selectedLendingId);
        await fetchLendings();
      }
    } catch (error) {
      showAlert.error('Failed to add repayment', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const deleteRepayment = async (id: string) => {
    const result = await showAlert.confirm('Delete this repayment?', 'Confirm');
    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      await fetch(`/api/repayments?id=${id}`, { method: 'DELETE' });
      showAlert.success('Repayment deleted!', 'Success');
      if (selectedLendingId) {
        await fetchRepayments(selectedLendingId);
      }
      await fetchLendings();
    } catch (error) {
      showAlert.error('Failed to delete repayment', 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Total */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <DollarSign className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h3 className="text-purple-300 text-sm font-bold">Total Lent</h3>
              <p className="text-white text-3xl font-bold">₹{totalLent.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <ArrowDownCircle className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h3 className="text-green-300 text-sm font-bold">Total Repaid</h3>
              <p className="text-white text-3xl font-bold">₹{totalRepaid.toLocaleString('en-IN')}</p>
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

      {/* Lendings Table/Cards */}
      <>
        {/* Desktop Table View */}
        <div className="hidden md:block bg-black/40 border-2 border-cyan-500/30 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cyan-900/30 border-b-2 border-cyan-500/30">
                <tr>
                  <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Name</th>
                  <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Lent Amount</th>
                  <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Repaid</th>
                  <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Pending</th>
                  <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Promise Date</th>
                  <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Actions</th>
                </tr>
              </thead>
            <tbody>
              {lendings.map(lending => (
                <tr key={lending._id} className={`border-b border-cyan-500/10 hover:bg-cyan-900/10 ${lending.pendingAmount === 0 ? 'opacity-50' : ''}`}>
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
                  <td className="px-4 py-3 text-green-400 font-bold text-sm">
                    ₹{(lending.totalRepaid || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3 text-orange-400 font-bold text-sm">
                    ₹{(lending.pendingAmount || lending.amount).toLocaleString('en-IN')}
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
                          onClick={() => openRepaymentModal(lending._id)}
                          className="p-2 bg-green-600 hover:bg-green-500 text-white rounded"
                          title="Manage Repayments"
                        >
                          <ArrowDownCircle className="w-4 h-4" />
                        </button>
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

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {lendings.map(lending => (
          <div key={lending._id} className={`bg-black/40 border-2 border-cyan-500/30 rounded-xl p-4 ${lending.pendingAmount === 0 ? 'opacity-60' : ''}`}>
            {editingId === lending._id ? (
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
                  <label className="text-cyan-300 text-xs font-bold mb-1 block">Promise Date</label>
                  <input
                    type="date"
                    value={editData.promiseToReturnDate}
                    onChange={e => setEditData({ ...editData, promiseToReturnDate: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-cyan-500/50 rounded-lg text-white text-sm"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => saveLending(lending._id)}
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
                    <div className="text-white font-bold text-lg mb-1">{lending.name}</div>
                    <div className="space-y-1">
                      <div className="text-white text-lg font-bold">Lent: ₹{lending.amount.toLocaleString('en-IN')}</div>
                      <div className="text-green-400 text-sm font-bold">Repaid: ₹{(lending.totalRepaid || 0).toLocaleString('en-IN')}</div>
                      <div className="text-orange-400 text-sm font-bold">Pending: ₹{(lending.pendingAmount || lending.amount).toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-cyan-300 text-xs font-bold mb-1">
                      {format(new Date(lending.promiseToReturnDate), 'dd MMM yyyy')}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-cyan-500/20">
                  <button
                    onClick={() => openRepaymentModal(lending._id)}
                    className="px-3 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg flex items-center justify-center gap-1 font-bold text-xs"
                  >
                    <ArrowDownCircle className="w-3 h-3" />
                    Repay
                  </button>
                  <button
                    onClick={() => startEditing(lending)}
                    className="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center justify-center gap-1 font-bold text-xs"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteLending(lending._id)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg flex items-center justify-center gap-1 font-bold text-xs"
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

      {/* Repayment Modal */}
      {showRepaymentModal && selectedLendingId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/50 rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-cyan-900/50 to-purple-900/50 backdrop-blur-sm border-b-2 border-cyan-500/30 p-3 sm:p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base sm:text-2xl font-bold text-cyan-300">Manage Repayments</h2>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    {lendings.find(l => l._id === selectedLendingId)?.name} - 
                    Pending: ₹{(lendings.find(l => l._id === selectedLendingId)?.pendingAmount || 0).toLocaleString('en-IN')}
                  </p>
                </div>
                <button
                  onClick={closeRepaymentModal}
                  className="p-1 sm:p-2 hover:bg-red-500/20 rounded-lg text-red-400"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-6 space-y-3 sm:space-y-6">
              {/* Add Repayment Form */}
              <form onSubmit={addRepayment} className="bg-black/40 border-2 border-cyan-500/30 rounded-lg sm:rounded-xl p-3 sm:p-6">
                <h3 className="text-cyan-300 text-sm sm:text-lg font-bold mb-3 sm:mb-4">Add Repayment</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
                  <input
                    type="number"
                    placeholder="Amount (₹)"
                    value={repaymentFormData.amount}
                    onChange={e => setRepaymentFormData({ ...repaymentFormData, amount: e.target.value })}
                    className="px-3 py-2 sm:px-4 sm:py-3 bg-black/40 border-2 border-cyan-500/50 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    required
                  />
                  <input
                    type="date"
                    value={repaymentFormData.repaymentDate}
                    onChange={e => setRepaymentFormData({ ...repaymentFormData, repaymentDate: e.target.value })}
                    className="px-3 py-2 sm:px-4 sm:py-3 bg-black/40 border-2 border-cyan-500/50 rounded-lg sm:rounded-xl text-white text-sm sm:text-base focus:border-cyan-400 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-700 disabled:to-gray-800 text-white rounded-lg sm:rounded-xl flex items-center justify-center gap-1 sm:gap-2 font-bold text-sm sm:text-base"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    Add
                  </button>
                </div>
              </form>

              {/* Repayments History */}
              <div className="bg-black/40 border-2 border-cyan-500/30 rounded-lg sm:rounded-xl overflow-hidden">
                <div className="px-3 py-2 sm:px-6 sm:py-4 bg-cyan-900/30 border-b-2 border-cyan-500/30">
                  <h3 className="text-cyan-300 text-sm sm:text-lg font-bold">Repayment History</h3>
                </div>
                
                {repayments.length === 0 ? (
                  <div className="p-4 sm:p-8 text-center text-gray-400 text-sm sm:text-base">
                    No repayments recorded yet
                  </div>
                ) : (
                  <>
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-cyan-900/20 border-b border-cyan-500/30">
                          <tr>
                            <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Date</th>
                            <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Amount</th>
                            <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {repayments.map(repayment => (
                            <tr key={repayment._id} className="border-b border-cyan-500/10 hover:bg-cyan-900/10">
                              <td className="px-4 py-3 text-gray-300 text-sm">
                                {format(new Date(repayment.repaymentDate), 'dd MMM yyyy')}
                              </td>
                              <td className="px-4 py-3 text-green-400 font-bold">
                                ₹{repayment.amount.toLocaleString('en-IN')}
                              </td>
                              <td className="px-4 py-3">
                                <button
                                  onClick={() => deleteRepayment(repayment._id)}
                                  className="p-2 bg-red-600 hover:bg-red-500 text-white rounded"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden p-2 sm:p-4 space-y-2 sm:space-y-3">
                      {repayments.map(repayment => (
                        <div key={repayment._id} className="bg-cyan-900/10 border border-cyan-500/20 rounded-lg p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-green-400 text-base sm:text-lg font-bold">
                                ₹{repayment.amount.toLocaleString('en-IN')}
                              </div>
                              <div className="text-cyan-300 text-xs font-bold mt-1">
                                {format(new Date(repayment.repaymentDate), 'dd MMM yyyy')}
                              </div>
                            </div>
                            <button
                              onClick={() => deleteRepayment(repayment._id)}
                              className="p-1.5 sm:p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg"
                            >
                              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
