'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, Edit2, Trash2, Check, X, CheckCircle, ArrowUpCircle, DollarSign } from 'lucide-react';
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
  totalPaid?: number;
  pendingAmount?: number;
}

interface Payment {
  _id: string;
  owingId: string;
  amount: number;
  paymentDate: string;
  note?: string;
}

export default function Owings() {
  const [owings, setOwings] = useState<Owing[]>([]);
  const [total, setTotal] = useState(0);
  const [totalOwed, setTotalOwed] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedOwingId, setSelectedOwingId] = useState<string | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
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

  const [paymentFormData, setPaymentFormData] = useState({
    amount: '',
    paymentDate: format(new Date(), 'yyyy-MM-dd'),
    note: '',
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
      setTotalPaid(data.totalPaid || 0);
    } catch (error) {
      showAlert.error('Failed to fetch owings', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async (owingId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/payments?owingId=${owingId}`);
      const data = await response.json();
      setPayments(data.payments);
    } catch (error) {
      showAlert.error('Failed to fetch payments', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const openPaymentModal = async (owingId: string) => {
    setSelectedOwingId(owingId);
    await fetchPayments(owingId);
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedOwingId(null);
    setPayments([]);
    setPaymentFormData({
      amount: '',
      paymentDate: format(new Date(), 'yyyy-MM-dd'),
      note: '',
    });
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

  const addPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentFormData.amount || !selectedOwingId) {
      showAlert.warning('Please fill all required fields', 'Missing Fields');
      return;
    }

    const owing = owings.find(o => o._id === selectedOwingId);
    const paymentAmount = parseFloat(paymentFormData.amount);
    const pendingAmount = owing?.pendingAmount || 0;

    if (paymentAmount > pendingAmount) {
      showAlert.warning(`Payment amount cannot exceed pending amount ₹${pendingAmount.toLocaleString('en-IN')}`, 'Invalid Amount');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owingId: selectedOwingId,
          amount: paymentAmount,
          paymentDate: paymentFormData.paymentDate,
          note: paymentFormData.note,
        }),
      });

      if (response.ok) {
        showAlert.success('Payment added successfully!', 'Success');
        setPaymentFormData({
          amount: '',
          paymentDate: format(new Date(), 'yyyy-MM-dd'),
          note: '',
        });
        await fetchPayments(selectedOwingId);
        await fetchOwings();
      }
    } catch (error) {
      showAlert.error('Failed to add payment', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const deletePayment = async (id: string) => {
    const result = await showAlert.confirm('Delete this payment?', 'Confirm');
    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      await fetch(`/api/payments?id=${id}`, { method: 'DELETE' });
      showAlert.success('Payment deleted!', 'Success');
      if (selectedOwingId) {
        await fetchPayments(selectedOwingId);
      }
      await fetchOwings();
    } catch (error) {
      showAlert.error('Failed to delete payment', 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Total */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <DollarSign className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h3 className="text-purple-300 text-sm font-bold">Total Owed</h3>
              <p className="text-white text-3xl font-bold">₹{totalOwed.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <ArrowUpCircle className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h3 className="text-green-300 text-sm font-bold">Total Paid</h3>
              <p className="text-white text-3xl font-bold">₹{totalPaid.toLocaleString('en-IN')}</p>
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
                  <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Borrowed Amount</th>
                  <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Paid</th>
                  <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Pending</th>
                  <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Due Date</th>
                  <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Actions</th>
                </tr>
              </thead>
            <tbody>
              {owings.map(owing => (
                <tr key={owing._id} className={`border-b border-cyan-500/10 hover:bg-cyan-900/10 ${owing.pendingAmount === 0 ? 'opacity-50' : ''}`}>
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
                  <td className="px-4 py-3 text-green-400 font-bold text-sm">
                    ₹{(owing.totalPaid || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3 text-red-400 font-bold text-sm">
                    ₹{(owing.pendingAmount || owing.amount).toLocaleString('en-IN')}
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
                          onClick={() => openPaymentModal(owing._id)}
                          className="p-2 bg-green-600 hover:bg-green-500 text-white rounded"
                          title="Manage Payments"
                        >
                          <ArrowUpCircle className="w-4 h-4" />
                        </button>
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
          <div key={owing._id} className={`bg-black/40 border-2 border-cyan-500/30 rounded-xl p-4 ${owing.pendingAmount === 0 ? 'opacity-60' : ''}`}>
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
                    <div className="space-y-1">
                      <div className="text-white text-lg font-bold">Borrowed: ₹{owing.amount.toLocaleString('en-IN')}</div>
                      <div className="text-green-400 text-sm font-bold">Paid: ₹{(owing.totalPaid || 0).toLocaleString('en-IN')}</div>
                      <div className="text-red-400 text-sm font-bold">Pending: ₹{(owing.pendingAmount || owing.amount).toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-cyan-300 text-xs font-bold mb-1">
                      {format(new Date(owing.dueDate), 'dd MMM yyyy')}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-cyan-500/20">
                  <button
                    onClick={() => openPaymentModal(owing._id)}
                    className="px-3 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg flex items-center justify-center gap-1 font-bold text-xs"
                  >
                    <ArrowUpCircle className="w-3 h-3" />
                    Pay
                  </button>
                  <button
                    onClick={() => startEditing(owing)}
                    className="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center justify-center gap-1 font-bold text-xs"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteOwing(owing._id)}
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

      {/* Payment Modal */}
      {showPaymentModal && selectedOwingId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/50 rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-cyan-900/50 to-purple-900/50 backdrop-blur-sm border-b-2 border-cyan-500/30 p-3 sm:p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base sm:text-2xl font-bold text-cyan-300">Manage Payments</h2>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    {owings.find(o => o._id === selectedOwingId)?.name} - 
                    Pending: ₹{(owings.find(o => o._id === selectedOwingId)?.pendingAmount || 0).toLocaleString('en-IN')}
                  </p>
                </div>
                <button
                  onClick={closePaymentModal}
                  className="p-1 sm:p-2 hover:bg-red-500/20 rounded-lg text-red-400"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-6 space-y-3 sm:space-y-6">
              {/* Add Payment Form */}
              <form onSubmit={addPayment} className="bg-black/40 border-2 border-cyan-500/30 rounded-lg sm:rounded-xl p-3 sm:p-6">
                <h3 className="text-cyan-300 text-sm sm:text-lg font-bold mb-3 sm:mb-4">Add Payment</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
                  <input
                    type="number"
                    placeholder="Amount (₹)"
                    value={paymentFormData.amount}
                    onChange={e => setPaymentFormData({ ...paymentFormData, amount: e.target.value })}
                    className="px-3 py-2 sm:px-4 sm:py-3 bg-black/40 border-2 border-cyan-500/50 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    required
                  />
                  <input
                    type="date"
                    value={paymentFormData.paymentDate}
                    onChange={e => setPaymentFormData({ ...paymentFormData, paymentDate: e.target.value })}
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

              {/* Payments History */}
              <div className="bg-black/40 border-2 border-cyan-500/30 rounded-lg sm:rounded-xl overflow-hidden">
                <div className="px-3 py-2 sm:px-6 sm:py-4 bg-cyan-900/30 border-b-2 border-cyan-500/30">
                  <h3 className="text-cyan-300 text-sm sm:text-lg font-bold">Payment History</h3>
                </div>
                
                {payments.length === 0 ? (
                  <div className="p-4 sm:p-8 text-center text-gray-400 text-sm sm:text-base">
                    No payments recorded yet
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
                          {payments.map(payment => (
                            <tr key={payment._id} className="border-b border-cyan-500/10 hover:bg-cyan-900/10">
                              <td className="px-4 py-3 text-gray-300 text-sm">
                                {format(new Date(payment.paymentDate), 'dd MMM yyyy')}
                              </td>
                              <td className="px-4 py-3 text-green-400 font-bold">
                                ₹{payment.amount.toLocaleString('en-IN')}
                              </td>
                              <td className="px-4 py-3">
                                <button
                                  onClick={() => deletePayment(payment._id)}
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
                      {payments.map(payment => (
                        <div key={payment._id} className="bg-cyan-900/10 border border-cyan-500/20 rounded-lg p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-green-400 text-base sm:text-lg font-bold">
                                ₹{payment.amount.toLocaleString('en-IN')}
                              </div>
                              <div className="text-cyan-300 text-xs font-bold mt-1">
                                {format(new Date(payment.paymentDate), 'dd MMM yyyy')}
                              </div>
                            </div>
                            <button
                              onClick={() => deletePayment(payment._id)}
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
