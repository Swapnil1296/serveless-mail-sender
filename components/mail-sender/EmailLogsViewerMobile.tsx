'use client';

import React from 'react';
import { Mail } from 'lucide-react';

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
  selectedLogs: Set<string>;
  onSelectLog: (id: string) => void;
  onCardClick: (log: EmailLogForView) => void;
  onSelectAll: () => void;
  emptyMessage?: string;
}

function getStatusLabel(status: string) {
  return status === 'scheduled'
    ? 'Scheduled'
    : status === 'rejected'
    ? 'Rejected'
    : status === 'waiting_for_response'
    ? 'Waiting'
    : 'Not scheduled';
}

export function EmailLogsViewerMobile({
  logs,
  selectedLogs,
  onSelectLog,
  onCardClick,
  onSelectAll,
  emptyMessage = 'No emails found',
}: EmailLogsViewerMobileProps) {
  const allSelected = logs.length > 0 && selectedLogs.size === logs.length;

  const TableBody = ({ list }: { list: EmailLogForView[] }) => (
    <tbody>
      {list.map(log => {
        const status = log.interviewScheduledStatus || 'not_scheduled';
        return (
          <tr
            key={log._id}
            onClick={() => onCardClick(log)}
            className="border-b border-cyan-500/20 hover:bg-cyan-900/20 cursor-pointer transition-colors"
          >
            <td className="p-2 align-top" onClick={e => e.stopPropagation()}>
              <input
                type="checkbox"
                checked={selectedLogs.has(log._id)}
                onChange={() => onSelectLog(log._id)}
                className="w-4 h-4 rounded"
                aria-label={selectedLogs.has(log._id) ? 'Deselect' : 'Select'}
              />
            </td>
            <td className="p-2 text-white font-mono text-xs break-all">{log.email}</td>
            <td className="p-2">
              <span className="px-1.5 py-0.5 bg-purple-500/30 text-purple-300 rounded text-xs font-bold uppercase">
                {log.jobType}
              </span>
            </td>
            <td className="p-2 text-cyan-300 text-xs">{getStatusLabel(status)}</td>
            <td className="p-2 text-xs">
              {log.followUpSent ? (
                <span className="text-green-400">✓</span>
              ) : (
                <span className="text-gray-500">—</span>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );

  return (
    <div>
      <section>
        <h2 className="text-lg font-bold text-white uppercase mb-3">All logs</h2>
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 rounded-xl bg-black/40 border-2 border-cyan-500/20">
            <Mail className="w-12 h-12 text-gray-500 mb-3" />
            <p className="text-gray-400 font-medium">{emptyMessage}</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border-2 border-cyan-500/30 bg-black/40 w-full max-w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
            <table className="w-full min-w-[320px] text-left">
              <thead>
                <tr className="border-b border-cyan-500/30">
                  <th className="p-2 w-10">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={onSelectAll}
                      className="w-4 h-4 rounded"
                      aria-label={allSelected ? 'Deselect all' : 'Select all'}
                    />
                  </th>
                  <th className="p-2 text-cyan-300 text-xs font-bold uppercase">Email</th>
                  <th className="p-2 text-cyan-300 text-xs font-bold uppercase">Job</th>
                  <th className="p-2 text-cyan-300 text-xs font-bold uppercase">Status</th>
                  <th className="p-2 text-cyan-300 text-xs font-bold uppercase">FU</th>
                </tr>
              </thead>
              <TableBody list={logs} />
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default EmailLogsViewerMobile;
