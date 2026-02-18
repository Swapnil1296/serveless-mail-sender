'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns/format';
import { showAlert } from '@/lib/alerts';

export interface EmailLogForDetail {
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

const INTERVIEW_OPTIONS = [
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'not_scheduled', label: 'Not scheduled' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'waiting_for_response', label: 'Waiting for response' },
] as const;

interface EmailLogDetailModalProps {
  log: EmailLogForDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: (updated: Partial<EmailLogForDetail>) => void;
  isMobile?: boolean;
}

export function EmailLogDetailModal({
  log,
  isOpen,
  onClose,
  onSaved,
  isMobile = false,
}: EmailLogDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [interviewStatus, setInterviewStatus] = useState<typeof INTERVIEW_OPTIONS[number]['value']>('not_scheduled');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (log) {
      setEditNote(log.note || '');
      setEditPhone(log.phoneNumber || '');
      setInterviewStatus(log.interviewScheduledStatus || 'not_scheduled');
      setIsEditing(false);
    }
  }, [log]);

  if (!log || !isOpen) return null;

  const handleSave = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    setSaving(true);
    try {
      const response = await fetch('/api/update-email-log', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || '',
        },
        body: JSON.stringify({
          logId: log._id,
          note: editNote,
          phoneNumber: editPhone,
          interviewScheduledStatus: interviewStatus,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        showAlert.success('Saved successfully', 'Updated');
        onSaved({ note: editNote, phoneNumber: editPhone, interviewScheduledStatus: interviewStatus });
        setIsEditing(false);
        onClose();
      } else {
        throw new Error(data.error || 'Failed to save');
      }
    } catch (err) {
      showAlert.error(err instanceof Error ? err.message : 'Failed to save', 'Error');
    } finally {
      setSaving(false);
    }
  };

  const modalClass = isMobile
    ? 'fixed inset-0 z-[100] flex flex-col bg-black overflow-hidden'
    : 'fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm';

  const contentClass = isMobile
    ? 'flex-1 flex flex-col min-h-0 bg-gradient-to-br from-cyan-950/40 via-purple-950/40 to-black border-t-2 border-cyan-500/30'
    : 'bg-gradient-to-br from-cyan-950/40 via-purple-950/40 to-black/90 backdrop-blur-2xl rounded-2xl border-2 border-cyan-500/30 p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto';

  const modalContent = (
    <div
      className={modalClass}
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-modal-title"
    >
      <div className={contentClass}>
        <div className={isMobile ? 'flex-1 overflow-y-auto min-h-0 p-4' : ''}>
        <div className="flex items-start justify-between gap-3 mb-4">
          <h2 id="detail-modal-title" className="text-lg font-bold text-white uppercase">
            Email details
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors touch-manipulation"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card summary (same as on card) */}
        <div className="mb-4 p-3 rounded-xl bg-black/40 border border-cyan-500/20">
          <div className="text-white font-mono text-sm break-all">{log.email}</div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-0.5 bg-purple-500/30 text-purple-300 rounded-full text-xs font-bold uppercase">
              {log.jobType}
            </span>
            {log.status === 'success' ? (
              <span className="flex items-center gap-1 text-green-400 text-xs">
                <CheckCircle className="w-3 h-3" /> Success
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-400 text-xs">
                <XCircle className="w-3 h-3" /> Failed
              </span>
            )}
          </div>
          <div className="text-gray-400 text-xs mt-1">
            Phone: {isEditing ? null : (log.phoneNumber || '—')}
            {isEditing && (
              <input
                type="tel"
                value={editPhone}
                onChange={e => setEditPhone(e.target.value)}
                placeholder="Phone"
                className="mt-1 w-full px-3 py-2 bg-black/60 border border-cyan-500/50 rounded-lg text-white text-sm"
              />
            )}
          </div>
          <div className="text-gray-400 text-xs mt-1">
            Note: {isEditing ? null : (log.note || '—')}
            {isEditing && (
              <textarea
                value={editNote}
                onChange={e => setEditNote(e.target.value)}
                placeholder="Note"
                rows={3}
                className="mt-1 w-full px-3 py-2 bg-black/60 border border-cyan-500/50 rounded-lg text-white text-sm resize-none"
              />
            )}
          </div>
          <div className="text-xs text-cyan-300 mt-2">
            Follow-up: {log.followUpSent ? `Sent ${log.followUpSentAt ? format(new Date(log.followUpSentAt), 'MMM dd') : ''}` : 'Not sent'}
          </div>
        </div>

        {/* Additional details */}
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Sent</span>
            <span className="text-white">{format(new Date(log.sentAt), 'MMM dd, yyyy')}</span>
          </div>
          {/* <div className="flex justify-between">
            <span className="text-gray-400">Subject</span>
            <span className="text-white truncate max-w-[200px]" title={log.subject}>{log.subject}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Sender</span>
            <span className="text-white">{log.senderName}</span>
          </div> */}
        </div>

        {/* Interview scheduled status: on mobile use buttons (no dropdown) so options are never cut off */}
        <div className="mb-4">
          <label className="block text-cyan-300 text-sm font-bold mb-2">Interview status</label>
          {isMobile ? (
            <div className="space-y-2">
              {INTERVIEW_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => isEditing && setInterviewStatus(opt.value)}
                  aria-pressed={interviewStatus === opt.value}
                  className={`w-full text-left px-3 py-3 rounded-xl text-sm font-medium transition-colors touch-manipulation ${
                    interviewStatus === opt.value
                      ? 'bg-cyan-500/40 border-2 border-cyan-400 text-white'
                      : 'bg-black/60 border-2 border-cyan-500/30 text-gray-300'
                  } ${isEditing ? 'hover:border-cyan-500/50 active:bg-cyan-500/20' : 'opacity-80 cursor-default'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          ) : (
            <select
              value={interviewStatus}
              onChange={e => setInterviewStatus(e.target.value as typeof interviewStatus)}
              disabled={!isEditing}
              className="w-full px-3 py-2.5 bg-black/60 border-2 border-cyan-500/50 rounded-xl text-white text-sm focus:border-cyan-400 focus:outline-none disabled:opacity-70"
            >
              {INTERVIEW_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
        </div>

        </div>

        {/* Edit / Save button: sticky footer on mobile so always visible */}
        <div
          className={`flex gap-3 ${isMobile ? 'flex-shrink-0 p-4 pt-3 border-t border-cyan-500/20 bg-black/60' : ''}`}
          style={isMobile ? { paddingBottom: 'max(16px, env(safe-area-inset-bottom, 0px))' } : undefined}
        >
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-800 text-white rounded-xl font-bold text-sm transition-all disabled:cursor-not-allowed"
          >
            {saving ? 'Saving…' : isEditing ? 'Save' : 'Edit'}
          </button>
          {isEditing && (
            <button
              onClick={() => {
                setIsEditing(false);
                setEditNote(log.note || '');
                setEditPhone(log.phoneNumber || '');
                setInterviewStatus(log.interviewScheduledStatus || 'not_scheduled');
              }}
              className="px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-xl font-bold text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
}

export default EmailLogDetailModal;
