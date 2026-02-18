'use client';

import React from 'react';
import { Mail, CheckCircle, XCircle, Clock, X } from 'lucide-react';
import { format } from 'date-fns/format';

export interface EmailLogForView {
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

interface EmailLogsViewerMobileProps {
  logs: EmailLogForView[];
  followUpList: EmailLogForView[];
  selectedLogs: Set<string>;
  onSelectLog: (id: string) => void;
  onCardClick: (log: EmailLogForView) => void;
  emptyMessage?: string;
}

function LogCardMobile({
  log,
  isSelected,
  onSelect,
  onClick,
}: {
  log: EmailLogForView;
  isSelected: boolean;
  onSelectLog: (id: string) => void;
  onClick: () => void;
}) {
  const interviewStatus = log.interviewScheduledStatus || 'not_scheduled';
  const statusLabel =
    interviewStatus === 'scheduled'
      ? 'Scheduled'
      : interviewStatus === 'rejected'
      ? 'Rejected'
      : interviewStatus === 'waiting_for_response'
      ? 'Waiting'
      : 'Not scheduled';

  return (
    <div
      onClick={onClick}
      className="flex items-start gap-3 p-4 rounded-xl border-2 border-cyan-500/30 bg-black/40 active:bg-cyan-900/20 touch-manipulation min-h-[72px]"
    >
      <div className="flex-shrink-0 pt-0.5" onClick={e => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelectLog(log._id)}
          onClick={e => e.stopPropagation()}
          className="w-5 h-5 rounded border-2 border-cyan-400 accent-cyan-500"
          aria-label={isSelected ? 'Deselect' : 'Select'}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white font-mono text-sm break-all">{log.email}</div>
        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          <span className="px-2 py-0.5 bg-purple-500/30 text-purple-300 rounded-full text-xs font-bold uppercase">
            {log.jobType}
          </span>
          <span className="text-xs text-gray-400">
            {log.phoneNumber || '—'}
          </span>
        </div>
        {log.note ? (
          <p className="text-xs text-gray-300 mt-1 line-clamp-2">{log.note}</p>
        ) : null}
        <div className="flex items-center gap-2 mt-2">
          <span
            className={`text-xs font-medium ${
              log.followUpSent ? 'text-green-400' : 'text-gray-500'
            }`}
          >
            {log.followUpSent ? '✓ Follow-up sent' : 'No follow-up'}
          </span>
          <span className="text-cyan-300/80 text-xs">•</span>
          <span className="text-xs text-cyan-300">{statusLabel}</span>
        </div>
      </div>
    </div>
  );
}

export function EmailLogsViewerMobile({
  logs,
  followUpList,
  selectedLogs,
  onSelectLog,
  onCardClick,
  emptyMessage = 'No emails found',
}: EmailLogsViewerMobileProps) {
  return (
    <div className="space-y-6">
      {/* Follow-up list: not scheduled */}
      {followUpList.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-bold text-white uppercase">
              Follow-up list ({followUpList.length})
            </h2>
          </div>
          <div className="space-y-2">
            {followUpList.map(log => (
              <LogCardMobile
                key={log._id}
                log={log}
                isSelected={selectedLogs.has(log._id)}
                onSelectLog={onSelectLog}
                onClick={() => onCardClick(log)}
              />
            ))}
          </div>
        </section>
      )}

      {/* All logs */}
      <section>
        <h2 className="text-lg font-bold text-white uppercase mb-3">All logs</h2>
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 rounded-xl bg-black/40 border-2 border-cyan-500/20">
            <Mail className="w-12 h-12 text-gray-500 mb-3" />
            <p className="text-gray-400 font-medium">{emptyMessage}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {logs.map(log => (
              <LogCardMobile
                key={log._id}
                log={log}
                isSelected={selectedLogs.has(log._id)}
                onSelectLog={onSelectLog}
                onClick={() => onCardClick(log)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default EmailLogsViewerMobile;
