'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send, CheckCircle, XCircle, RefreshCw, Trash2, Clock, X } from 'lucide-react';
import SciFiLoader from '@/components/SciFiLoader';
import { format } from 'date-fns/format';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { showAlert } from '@/lib/alerts';
import { EmailLogDetailModal } from './EmailLogDetailModal';
import EmailLogsViewerMobile from './EmailLogsViewerMobile';

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
  phoneNumber?: string;
  note?: string;
  interviewScheduledStatus?: 'scheduled' | 'not_scheduled' | 'rejected' | 'waiting_for_response';
}

interface Stats {
  totalSent: number;
  totalFailed: number;
  followUpsSent: number;
  frontendEmails: number;
  mernEmails: number;
}

function LogCard({
  log,
  isSelected,
  onSelect,
  onClick,
}: {
  log: EmailLog;
  isSelected: boolean;
  onSelect: () => void;
  onClick: () => void;
}) {
  const status = log.interviewScheduledStatus || 'not_scheduled';
  const statusLabel =
    status === 'scheduled' ? 'Scheduled' : status === 'rejected' ? 'Rejected' : status === 'waiting_for_response' ? 'Waiting' : 'Not scheduled';
  return (
    <div
      onClick={onClick}
      className="flex flex-col gap-2 p-4 rounded-xl border-2 border-cyan-500/30 bg-black/40 hover:bg-cyan-900/20 cursor-pointer transition-colors text-left"
    >
      <div className="flex items-start gap-2">
        <div onClick={e => e.stopPropagation()} className="flex-shrink-0">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            onClick={e => e.stopPropagation()}
            className="w-4 h-4 rounded mt-0.5 cursor-pointer"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white font-mono text-sm break-all">{log.email}</div>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="px-2 py-0.5 bg-purple-500/30 text-purple-300 rounded-full text-xs font-bold uppercase">
              {log.jobType}
            </span>
            <span className="text-xs text-cyan-300">{statusLabel}</span>
          </div>
          {log.phoneNumber && <div className="text-xs text-gray-400 mt-1">📱 {log.phoneNumber}</div>}
          {log.note && <p className="text-xs text-gray-300 mt-1 line-clamp-2">{log.note}</p>}
          <div className="text-xs mt-1">
            {log.followUpSent ? (
              <span className="text-green-400">✓ Follow-up sent</span>
            ) : (
              <span className="text-gray-500">No follow-up</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
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
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [pendingFollowups, setPendingFollowups] = useState<EmailLog[]>([]);
  const [selectedPendingEmails, setSelectedPendingEmails] = useState<Set<string>>(new Set());
  const [detailLog, setDetailLog] = useState<EmailLog | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const fetchIdRef = useRef(0);

  useEffect(() => {
    fetchLogs();
  }, [page, filters]);

  // Reset to page 1 when search or other filters change so results make sense
  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const set = () => setIsMobileView(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  useEffect(() => {
    if (showFollowUpModal) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [showFollowUpModal]);

  const fetchLogs = async () => {
    const thisFetchId = ++fetchIdRef.current;
    setLoading(true);
    setFetchError(null);
    try {
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('limit', '20');
      if (filters.search?.trim()) params.set('search', filters.search.trim());
      if (filters.status) params.set('status', filters.status);
      if (filters.jobType) params.set('jobType', filters.jobType);
      if (filters.followUpSent) params.set('followUpSent', filters.followUpSent);

      const response = await fetch(`/api/email-logs?${params.toString()}`, {
        cache: 'no-store',
        headers: {
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || '',
        },
      });

      const data = await response.json();

      // Ignore response if a newer request has already been sent (prevents stale search results)
      if (thisFetchId !== fetchIdRef.current) return;

      if (!response.ok) {
        throw new Error(data?.error || data?.message || `Request failed: ${response.status}`);
      }

      // Defensive: ensure logs is always an array; normalize each log for missing fields
      const rawLogs = Array.isArray(data?.logs) ? data.logs : [];
      const normalizedLogs = rawLogs.map((log: any) => ({
        ...log,
        interviewScheduledStatus: log.interviewScheduledStatus ?? 'not_scheduled',
        phoneNumber: log.phoneNumber ?? '',
        note: log.note ?? '',
      }));

      setLogs(normalizedLogs);
      setStats(data?.stats ?? null);
      setTotalPages(data?.pagination?.pages ?? 1);
    } catch (error) {
      if (thisFetchId !== fetchIdRef.current) return;
      const msg = error instanceof Error ? error.message : 'Failed to load email logs';
      setFetchError(msg);
      setLogs([]);
    } finally {
      if (thisFetchId === fetchIdRef.current) setLoading(false);
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

  const deleteSelectedLogs = async () => {
    if (selectedLogs.size === 0) {
      showAlert.warning('Please select emails to delete', 'No Selection');
      return;
    }

    const result = await showAlert.confirm(
      `Are you sure you want to delete ${selectedLogs.size} email log(s)? This action cannot be undone.`,
      'Confirm Deletion'
    );

    if (!result.isConfirmed) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/delete-email-logs', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || '',
        },
        body: JSON.stringify({
          emailIds: Array.from(selectedLogs),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showAlert.success(`Successfully deleted ${data.deletedCount} email log(s)`, 'Deleted');
        setSelectedLogs(new Set());
        fetchLogs();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Failed to delete logs:', error);
      showAlert.error(error instanceof Error ? error.message : 'Failed to delete logs', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const sendFollowUps = async () => {
    if (selectedLogs.size === 0) {
      showAlert.warning('Please select emails to send follow-ups', 'No Selection');
      return;
    }

    const eligibleLogs = logs.filter(
      log => selectedLogs.has(log._id) && log.status === 'success' && !log.followUpSent
    );

    if (eligibleLogs.length === 0) {
      showAlert.warning('No eligible emails selected for follow-up', 'No Eligible Emails');
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
        showAlert.success(`✓ Sent ${data.summary.success} follow-up emails!`, 'Follow-ups Sent');
        setSelectedLogs(new Set());
        fetchLogs();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Failed to send follow-ups:', error);
      showAlert.error(error instanceof Error ? error.message : 'Failed to send follow-ups', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const checkPendingFollowups = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/pending-followups', {
        headers: {
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || '',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setPendingFollowups(data.emails);
        setSelectedPendingEmails(new Set(data.emails.map((email: EmailLog) => email._id)));
        setShowFollowUpModal(true);

        if (data.count === 0) {
          showAlert.info('No pending follow-ups found. All emails are up to date!', 'All Clear');
          setShowFollowUpModal(false);
        }
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Failed to fetch pending follow-ups:', error);
      showAlert.error(error instanceof Error ? error.message : 'Failed to fetch pending follow-ups', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const togglePendingEmail = (id: string) => {
    const newSelected = new Set(selectedPendingEmails);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedPendingEmails(newSelected);
  };

  const handleDetailSaved = (updated: Partial<Pick<EmailLog, 'note' | 'phoneNumber' | 'interviewScheduledStatus'>>) => {
    if (!detailLog) return;
    setLogs(prev =>
      prev.map(log =>
        log._id === detailLog._id ? { ...log, ...updated } : log
      )
    );
    setDetailLog(null);
    fetchLogs();
  };

  const sendPendingFollowups = async () => {
    if (selectedPendingEmails.size === 0) {
      showAlert.warning('Please select at least one email to send follow-up', 'No Selection');
      return;
    }

    const result = await showAlert.confirm(
      `Send follow-up emails to ${selectedPendingEmails.size} recipient(s)?`,
      'Confirm Send'
    );

    if (!result.isConfirmed) {
      return;
    }

    setLoading(true);
    try {
      const selectedEmails = pendingFollowups.filter(email =>
        selectedPendingEmails.has(email._id)
      );

      const response = await fetch('/api/send-followup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || '',
        },
        body: JSON.stringify({
          emailIds: Array.from(selectedPendingEmails),
          jobType: selectedEmails[0].jobType,
          senderName: selectedEmails[0].senderName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showAlert.success(`✓ Sent ${data.summary.success} follow-up emails!`, 'Follow-ups Sent');
        setShowFollowUpModal(false);
        setPendingFollowups([]);
        setSelectedPendingEmails(new Set());
        fetchLogs();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Failed to send follow-ups:', error);
      showAlert.error(error instanceof Error ? error.message : 'Failed to send follow-ups', 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-2 sm:p-4 md:p-8 overflow-x-hidden w-full max-w-full min-w-0">
      <div className="max-w-7xl mx-auto w-full min-w-0">
        <div className="bg-gradient-to-br from-cyan-950/40 via-purple-950/40 to-black/60 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border-2 border-cyan-500/30 p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8 relative">
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-2xl -z-10"></div>

            {/* Title and Buttons Container */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Title Section */}
              <div className="flex items-center gap-2 sm:gap-4 relative">
                {/* Animated icon with glow */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-cyan-500 rounded-xl blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-2 sm:p-3 rounded-xl">
                    <Mail className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                  </div>
                </div>

                {/* Title with glitch effect */}
                <div className="relative flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white relative z-10 tracking-wider uppercase whitespace-nowrap">
                    Email <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Logs</span>
                  </h1>
                  {/* Glitch layers - hidden on mobile */}
                  <h1 className="hidden lg:block absolute top-0 left-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-400 opacity-50 animate-glitch-1 uppercase whitespace-nowrap" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}>
                    Email Logs
                  </h1>
                  <h1 className="hidden lg:block absolute top-0 left-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-pink-400 opacity-50 animate-glitch-2 uppercase whitespace-nowrap" style={{ clipPath: 'polygon(0 60%, 100% 60%, 100% 100%, 0 100%)' }}>
                    Email Logs
                  </h1>

                  {/* Decorative line under title */}
                  <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mt-1"></div>
                </div>
              </div>

              {/* Buttons Section */}
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <button
                  onClick={checkPendingFollowups}
                  disabled={loading}
                  className="flex-1 sm:flex-none px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 disabled:from-gray-700 disabled:to-gray-800 text-white rounded-lg sm:rounded-xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm md:text-base transition-all hover:scale-105 border-2 border-orange-400/50 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-yellow-400/30 to-orange-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                  <span className="relative z-10">Pending</span>
                </button>
                <button
                  onClick={fetchLogs}
                  disabled={loading}
                  className="flex-1 sm:flex-none px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-800 text-white rounded-lg sm:rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base transition-all hover:scale-105 border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-blue-400/30 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 relative z-10 ${loading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline relative z-10">Refresh</span>
                </button>
              </div>
            </div>
          </div>

          {/* Error Banner */}
          {fetchError && (
            <div className="mb-6 rounded-xl border-2 border-red-500/50 bg-red-500/10 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-red-300 text-sm">{fetchError}</p>
              <button
                onClick={fetchLogs}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold uppercase tracking-wider bg-cyan-500/20 border-2 border-cyan-500/50 text-cyan-300 hover:border-cyan-400 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
            </div>
          )}

          {/* Stats */}
          {(stats || loading) && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
              <div className={`rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 ${loading ? 'bg-cyan-500/10 border-cyan-500/30 shimmer' : 'bg-green-500/20 border-green-400/50'}`}>
                <div className={`text-xs sm:text-sm font-bold ${loading ? 'invisible' : 'text-green-300'}`}>Total Sent</div>
                <div className={`font-bold text-xl sm:text-2xl md:text-3xl ${loading ? 'invisible' : 'text-white'}`}>{loading ? '0' : stats?.totalSent}</div>
              </div>
              <div className={`rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 ${loading ? 'bg-cyan-500/10 border-cyan-500/30 shimmer' : 'bg-red-500/20 border-red-400/50'}`}>
                <div className={`text-xs sm:text-sm font-bold ${loading ? 'invisible' : 'text-red-300'}`}>Failed</div>
                <div className={`font-bold text-xl sm:text-2xl md:text-3xl ${loading ? 'invisible' : 'text-white'}`}>{loading ? '0' : stats?.totalFailed}</div>
              </div>
              <div className={`rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 ${loading ? 'bg-cyan-500/10 border-cyan-500/30 shimmer' : 'bg-purple-500/20 border-purple-400/50'}`}>
                <div className={`text-xs sm:text-sm font-bold ${loading ? 'invisible' : 'text-purple-300'}`}>Follow-ups</div>
                <div className={`font-bold text-xl sm:text-2xl md:text-3xl ${loading ? 'invisible' : 'text-white'}`}>{loading ? '0' : stats?.followUpsSent}</div>
              </div>
              <div className={`rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 ${loading ? 'bg-cyan-500/10 border-cyan-500/30 shimmer' : 'bg-cyan-500/20 border-cyan-400/50'}`}>
                <div className={`text-xs sm:text-sm font-bold ${loading ? 'invisible' : 'text-cyan-300'}`}>Frontend</div>
                <div className={`font-bold text-xl sm:text-2xl md:text-3xl ${loading ? 'invisible' : 'text-white'}`}>{loading ? '0' : stats?.frontendEmails}</div>
              </div>
              <div className={`rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 ${loading ? 'bg-cyan-500/10 border-cyan-500/30 shimmer' : 'bg-blue-500/20 border-blue-400/50'}`}>
                <div className={`text-xs sm:text-sm font-bold ${loading ? 'invisible' : 'text-blue-300'}`}>MERN</div>
                <div className={`font-bold text-xl sm:text-2xl md:text-3xl ${loading ? 'invisible' : 'text-white'}`}>{loading ? '0' : stats?.mernEmails}</div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
            <input
              type="text"
              placeholder="Search by recipient email..."
              value={filters.search}
              onChange={e => handleFilterChange('search', e.target.value)}
              className="px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border-2 border-cyan-500/50 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
            <select
              value={filters.status}
              onChange={e => handleFilterChange('status', e.target.value)}
              className="px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border-2 border-cyan-500/50 rounded-lg sm:rounded-xl text-white text-sm sm:text-base focus:border-cyan-400 focus:outline-none"
            >
              <option value="">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={filters.jobType}
              onChange={e => handleFilterChange('jobType', e.target.value)}
              className="px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border-2 border-cyan-500/50 rounded-lg sm:rounded-xl text-white text-sm sm:text-base focus:border-cyan-400 focus:outline-none"
            >
              <option value="">All Job Types</option>
              <option value="frontend">Frontend</option>
              <option value="mern">MERN</option>
            </select>
            <select
              value={filters.followUpSent}
              onChange={e => handleFilterChange('followUpSent', e.target.value)}
              className="px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border-2 border-cyan-500/50 rounded-lg sm:rounded-xl text-white text-sm sm:text-base focus:border-cyan-400 focus:outline-none"
            >
              <option value="">All Follow-ups</option>
              <option value="true">Sent</option>
              <option value="false">Not Sent</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={handleSelectAll}
                className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg sm:rounded-xl flex items-center gap-2 font-bold text-xs sm:text-sm uppercase transition-all hover:scale-105 border-2 border-purple-400/50"
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">{selectedLogs?.size === logs?.length ? 'Deselect All' : 'Select All'}</span>
                <span className="sm:hidden">{selectedLogs?.size === logs?.length ? 'Deselect' : 'Select'}</span>
              </button>
              <span className="text-cyan-300 text-xs sm:text-sm font-bold uppercase">
                {selectedLogs?.size} <span className="hidden sm:inline">SELECTED</span>
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={deleteSelectedLogs}
                disabled={loading || selectedLogs?.size === 0}
                className="flex-1 sm:flex-none px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 disabled:from-gray-700 disabled:to-gray-800 text-white rounded-lg sm:rounded-xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100 border-2 border-red-400/50 disabled:border-gray-500/30"
              >
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Delete Selected</span>
                <span className="sm:hidden">Delete</span>
              </button>
              <button
                onClick={sendFollowUps}
                disabled={loading || selectedLogs?.size === 0}
                className="flex-1 sm:flex-none px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-700 disabled:to-gray-800 text-white rounded-lg sm:rounded-xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100 border-2 border-green-400/50 disabled:border-gray-500/30"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Send Follow-ups</span>
                <span className="sm:hidden">Follow-up</span>
              </button>
            </div>
          </div>

          {/* Logs: table for mobile, cards for desktop */}
          {loading ? (
            <div className="bg-black/40 rounded-xl border-2 border-cyan-500/30 p-4">
              <div className="flex flex-col items-center py-8 mb-4">
                <SciFiLoader label="SYNCING LOGS" size="md" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-4 w-4 rounded bg-cyan-500/30 shimmer" />
                <div className="h-4 w-32 bg-cyan-500/20 rounded shimmer" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="p-4 rounded-xl border-2 border-cyan-500/30 bg-cyan-500/10 shimmer overflow-hidden">
                    <div className="h-4 w-3/4 bg-cyan-500/20 rounded mb-3" />
                    <div className="flex gap-2 mb-2">
                      <div className="h-5 w-16 bg-cyan-500/20 rounded-full" />
                      <div className="h-5 w-20 bg-cyan-500/20 rounded" />
                    </div>
                    <div className="h-3 w-1/2 bg-cyan-500/10 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ) : isMobileView ? (
            <EmailLogsViewerMobile
              logs={logs}
              selectedLogs={selectedLogs}
              onSelectLog={handleSelectLog}
              onCardClick={setDetailLog}
              onSelectAll={handleSelectAll}
              emptyMessage="No emails found"
            />
          ) : (
            <div className="bg-black/40 rounded-xl border-2 border-cyan-500/30 p-4">
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  checked={selectedLogs.size === logs.length && logs.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded"
                />
                <span className="text-cyan-300 text-sm font-bold uppercase">Select all / All logs</span>
              </div>
              {logs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Mail className="w-12 h-12 text-gray-600 mb-4" />
                  <p className="text-gray-400 text-lg font-bold">No emails found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {logs.map(log => (
                    <LogCard
                      key={log._id}
                      log={log}
                      isSelected={selectedLogs.has(log._id)}
                      onSelect={() => handleSelectLog(log._id)}
                      onClick={() => setDetailLog(log)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Detail modal (shared) */}
          <EmailLogDetailModal
            log={detailLog}
            isOpen={!!detailLog}
            onClose={() => setDetailLog(null)}
            onSaved={handleDetailSaved}
            isMobile={isMobileView}
          />

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 sm:mt-6">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="w-full sm:w-auto px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 text-white rounded-lg disabled:cursor-not-allowed text-sm sm:text-base"
            >
              Previous
            </button>
            <span className="text-cyan-300 text-sm sm:text-base">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading}
              className="w-full sm:w-auto px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 text-white rounded-lg disabled:cursor-not-allowed text-sm sm:text-base"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Pending Follow-ups Modal */}
      {showFollowUpModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-gradient-to-br from-cyan-950/40 via-purple-950/40 to-black/60 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border-2 border-orange-500/50 p-4 sm:p-6 md:p-8 max-w-4xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-orange-500/20 rounded-lg sm:rounded-xl">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase">Pending Follow-ups</h2>
                  <p className="text-orange-300 text-xs sm:text-sm">Emails sent 5+ days ago</p>
                </div>
              </div>
              <button
                onClick={() => setShowFollowUpModal(false)}
                className="p-2 hover:bg-red-500/20 rounded-lg sm:rounded-xl transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-orange-500/20 border-2 border-orange-400/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <div className="text-orange-300 text-xs sm:text-sm font-bold">Total Pending</div>
                <div className="text-white text-2xl sm:text-3xl font-bold">{pendingFollowups.length}</div>
              </div>
              <div className="bg-green-500/20 border-2 border-green-400/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <div className="text-green-300 text-xs sm:text-sm font-bold">Selected to Send</div>
                <div className="text-white text-2xl sm:text-3xl font-bold">{selectedPendingEmails.size}</div>
              </div>
            </div>

            {/* Email List */}
            <div className="flex-1 overflow-y-auto bg-black/40 rounded-lg sm:rounded-xl border-2 border-orange-500/30 mb-4 sm:mb-6">
              {pendingFollowups.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 sm:py-12">
                  <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-400 mb-3 sm:mb-4" />
                  <p className="text-white text-lg sm:text-xl font-bold">All Clear!</p>
                  <p className="text-gray-400 text-xs sm:text-sm">No pending follow-ups at this time</p>
                </div>
              ) : (
                <div className="p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3">
                  {pendingFollowups.map((email) => (
                    <div
                      key={email._id}
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all gap-3 ${selectedPendingEmails.has(email._id)
                          ? 'bg-orange-500/20 border-orange-400/60'
                          : 'bg-gray-800/40 border-gray-600/40'
                        }`}
                    >
                      <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full">
                        <input
                          type="checkbox"
                          checked={selectedPendingEmails.has(email._id)}
                          onChange={() => togglePendingEmail(email._id)}
                          className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                            <span className="text-white font-mono text-xs sm:text-sm break-all">{email.email}</span>
                            <span className="px-2 py-1 bg-purple-500/30 text-purple-300 rounded-full text-xs font-bold uppercase">
                              {email.jobType}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-400">
                            <span>Sent: {format(new Date(email.sentAt), 'MMM dd, yyyy')}</span>
                            <span className="text-orange-400 font-bold">
                              {formatDistanceToNow(new Date(email.sentAt), { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => togglePendingEmail(email._id)}
                        className={`w-full sm:w-auto px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all ${selectedPendingEmails.has(email._id)
                            ? 'bg-red-600 hover:bg-red-500 text-white'
                            : 'bg-green-600 hover:bg-green-500 text-white'
                          }`}
                      >
                        {selectedPendingEmails.has(email._id) ? 'Remove' : 'Add'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <button
                onClick={() => setShowFollowUpModal(false)}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={sendPendingFollowups}
                disabled={loading || selectedPendingEmails.size === 0}
                className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-700 disabled:to-gray-800 text-white rounded-lg sm:rounded-xl flex items-center justify-center gap-2 font-bold text-sm sm:text-base disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100 border-2 border-green-400/50 order-1 sm:order-2"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Send Follow-ups ({selectedPendingEmails.size})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
