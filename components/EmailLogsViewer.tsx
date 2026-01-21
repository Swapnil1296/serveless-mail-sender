'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle, XCircle, Search, Filter, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';

interface EmailLog {
  _id: string;
  email: string;
  jobType: 'frontend' | 'mern';
  subject: string;
  senderName: string;
  status: 'success' | 'failed';
  sentAt: string;
  followUpSent: boolean;
  followUpSentAt?: string;
}

interface Stats {
  totalSent: number;
  totalFailed: number;
  followUpsSent: number;
  frontendEmails: number;
  mernEmails: number;
}

export default function EmailLogsViewer() {
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedLogs, setSelectedLogs] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState({
    status: '',
    jobType: '',
    followUpSent: '',
    search: '',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchLogs();
  }, [page, filters]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== '')
        ),
      });

      const response = await fetch(`/api/email-logs?${params}`, {
        headers: {
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || '',
        },
      });

      const data = await response.json();
      setLogs(data.logs);
      setStats(data.stats);
      setTotalPages(data.pagination.pages);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLog = (id: string) => {
    const newSelected = new Set(selectedLogs);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedLogs(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedLogs.size === logs.length) {
      setSelectedLogs(new Set());
    } else {
      setSelectedLogs(new Set(logs.map(log => log._id)));
    }
  };

  const sendFollowUps = async () => {
    if (selectedLogs.size === 0) {
      alert('Please select emails to send follow-ups');
      return;
    }

    const eligibleLogs = logs.filter(
      log => selectedLogs.has(log._id) && log.status === 'success' && !log.followUpSent
    );

    if (eligibleLogs.length === 0) {
      alert('No eligible emails selected for follow-up');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/send-followup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || '',
        },
        body: JSON.stringify({
          emailIds: Array.from(selectedLogs),
          jobType: eligibleLogs[0].jobType,
          senderName: eligibleLogs[0].senderName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`✓ Sent ${data.summary.success} follow-up emails!`);
        setSelectedLogs(new Set());
        fetchLogs();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Failed to send follow-ups:', error);
      alert(error instanceof Error ? error.message : 'Failed to send follow-ups');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-cyan-950/40 via-purple-950/40 to-black/60 backdrop-blur-2xl rounded-3xl border-2 border-cyan-500/30 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Mail className="w-10 h-10 text-cyan-400" />
              <h1 className="text-4xl font-bold text-white">Email Logs</h1>
            </div>
            <button
              onClick={fetchLogs}
              disabled={loading}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 text-white rounded-xl flex items-center gap-2 transition-all"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <div className="bg-green-500/20 border-2 border-green-400/50 rounded-xl p-4">
                <div className="text-green-300 text-sm font-bold">Total Sent</div>
                <div className="text-white text-3xl font-bold">{stats.totalSent}</div>
              </div>
              <div className="bg-red-500/20 border-2 border-red-400/50 rounded-xl p-4">
                <div className="text-red-300 text-sm font-bold">Failed</div>
                <div className="text-white text-3xl font-bold">{stats.totalFailed}</div>
              </div>
              <div className="bg-purple-500/20 border-2 border-purple-400/50 rounded-xl p-4">
                <div className="text-purple-300 text-sm font-bold">Follow-ups</div>
                <div className="text-white text-3xl font-bold">{stats.followUpsSent}</div>
              </div>
              <div className="bg-cyan-500/20 border-2 border-cyan-400/50 rounded-xl p-4">
                <div className="text-cyan-300 text-sm font-bold">Frontend</div>
                <div className="text-white text-3xl font-bold">{stats.frontendEmails}</div>
              </div>
              <div className="bg-blue-500/20 border-2 border-blue-400/50 rounded-xl p-4">
                <div className="text-blue-300 text-sm font-bold">MERN</div>
                <div className="text-white text-3xl font-bold">{stats.mernEmails}</div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <input
              type="text"
              placeholder="Search emails..."
              value={filters.search}
              onChange={e => setFilters({ ...filters, search: e.target.value })}
              className="px-4 py-3 bg-black/40 border-2 border-cyan-500/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
            <select
              value={filters.status}
              onChange={e => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-3 bg-black/40 border-2 border-cyan-500/50 rounded-xl text-white focus:border-cyan-400 focus:outline-none"
            >
              <option value="">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={filters.jobType}
              onChange={e => setFilters({ ...filters, jobType: e.target.value })}
              className="px-4 py-3 bg-black/40 border-2 border-cyan-500/50 rounded-xl text-white focus:border-cyan-400 focus:outline-none"
            >
              <option value="">All Job Types</option>
              <option value="frontend">Frontend</option>
              <option value="mern">MERN</option>
            </select>
            <select
              value={filters.followUpSent}
              onChange={e => setFilters({ ...filters, followUpSent: e.target.value })}
              className="px-4 py-3 bg-black/40 border-2 border-cyan-500/50 rounded-xl text-white focus:border-cyan-400 focus:outline-none"
            >
              <option value="">All Follow-ups</option>
              <option value="true">Sent</option>
              <option value="false">Not Sent</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={handleSelectAll}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm"
              >
                {selectedLogs?.size === logs?.length ? 'Deselect All' : 'Select All'}
              </button>
              <span className="text-cyan-300 text-sm">
                {selectedLogs?.size} selected
              </span>
            </div>
            <button
              onClick={sendFollowUps}
              disabled={loading || selectedLogs?.size === 0}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-700 disabled:to-gray-800 text-white rounded-xl flex items-center gap-2 font-bold disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              Send Follow-ups
            </button>
          </div>

          {/* Logs Table */}
          <div className="bg-black/40 rounded-xl overflow-hidden border-2 border-cyan-500/30">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cyan-900/30 border-b-2 border-cyan-500/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">
                      <input
                        type="checkbox"
                        checked={selectedLogs?.size === logs?.length && logs?.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Email</th>
                    <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Job Type</th>
                    <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Status</th>
                    <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Sent At</th>
                    <th className="px-4 py-3 text-left text-cyan-300 font-bold text-sm">Follow-up</th>
                  </tr>
                </thead>
                <tbody>
                  {logs && logs?.map(log => (
                    <tr
                      key={log._id}
                      className="border-b border-cyan-500/10 hover:bg-cyan-900/10 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedLogs.has(log._id)}
                          onChange={() => handleSelectLog(log._id)}
                          disabled={log.status !== 'success' || log.followUpSent}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="px-4 py-3 text-white font-mono text-sm">{log.email}</td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 bg-purple-500/30 text-purple-300 rounded-full text-xs font-bold uppercase">
                          {log?.jobType}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {log.status === 'success' ? (
                          <span className="flex items-center gap-2 text-green-400">
                            <CheckCircle className="w-4 h-4" />
                            Success
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-red-400">
                            <XCircle className="w-4 h-4" />
                            Failed
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-300 text-sm">
                        {format(new Date(log.sentAt), 'MMM dd, yyyy HH:mm')}
                      </td>
                      <td className="px-4 py-3">
                        {log.followUpSent ? (
                          <span className="text-green-400 text-sm">
                            ✓ Sent {log.followUpSentAt && `on ${format(new Date(log.followUpSentAt), 'MMM dd')}`}
                          </span>
                        ) : (
                          <span className="text-gray-500 text-sm">Not sent</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 text-white rounded-lg disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-cyan-300">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 text-white rounded-lg disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
