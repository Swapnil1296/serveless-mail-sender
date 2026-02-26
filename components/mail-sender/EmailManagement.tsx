'use client';

import React, { useState } from 'react';
import { Mail, FileText } from 'lucide-react';
import BulkEmailSender from './BulkEmailSender';
import EmailLogsViewer from './EmailLogsViewer';

export default function EmailManagement() {
  const [activeTab, setActiveTab] = useState<'sender' | 'logs'>('sender');

  return (
    <div className="h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] flex flex-col bg-black w-full max-w-full overflow-hidden min-w-0">
      {/* Tab Navigation - compact, solid background (mobile-first) */}
      <div
        className="flex-shrink-0 border-b border-cyan-500/40 z-40"
        style={{ background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5">
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab('sender')}
              className={`relative px-3 py-2 sm:px-4 sm:py-2 rounded-md font-bold uppercase tracking-wider transition-all overflow-hidden group text-xs sm:text-sm ${
                activeTab === 'sender'
                  ? 'bg-cyan-600 text-white border border-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-800/80 text-slate-300 border border-slate-600 hover:border-cyan-500/50 hover:text-cyan-200'
              }`}
            >
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <Mail className="w-4 h-4 sm:w-4 sm:h-4 shrink-0" />
                <span>Email Sender</span>
              </span>
              {activeTab === 'sender' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('logs')}
              className={`relative px-3 py-2 sm:px-4 sm:py-2 rounded-md font-bold uppercase tracking-wider transition-all overflow-hidden group text-xs sm:text-sm ${
                activeTab === 'logs'
                  ? 'bg-purple-600 text-white border border-purple-400/60 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                  : 'bg-slate-800/80 text-slate-300 border border-slate-600 hover:border-purple-500/50 hover:text-purple-200'
              }`}
            >
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <FileText className="w-4 h-4 sm:w-4 sm:h-4 shrink-0" />
                <span>Email Logs</span>
              </span>
              {activeTab === 'logs' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400 animate-pulse" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content - scrollable area so no page scroll */}
      <div className="flex-1 min-h-0 overflow-auto">
        {activeTab === 'sender' ? <BulkEmailSender /> : <EmailLogsViewer />}
      </div>
    </div>
  );
}
