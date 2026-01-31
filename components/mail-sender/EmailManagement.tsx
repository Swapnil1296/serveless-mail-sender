'use client';

import React, { useState } from 'react';
import { Mail, FileText } from 'lucide-react';
import BulkEmailSender from './BulkEmailSender';
import EmailLogsViewer from './EmailLogsViewer';

export default function EmailManagement() {
  const [activeTab, setActiveTab] = useState<'sender' | 'logs'>('sender');

  return (
    <div className="min-h-screen bg-black">
      {/* Tab Navigation */}
      <div className="bg-black/95 backdrop-blur-md border-b-2 border-cyan-500/30 sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('sender')}
              className={`relative px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-all overflow-hidden group ${
                activeTab === 'sender'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/50'
                  : 'text-cyan-300 border-2 border-cyan-500/30 hover:border-cyan-400/50 hover:text-cyan-200'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative z-10 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>Email Sender</span>
              </span>
              {activeTab === 'sender' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 animate-pulse"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab('logs')}
              className={`relative px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-all overflow-hidden group ${
                activeTab === 'logs'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-purple-400/50 shadow-lg shadow-purple-500/50'
                  : 'text-cyan-300 border-2 border-cyan-500/30 hover:border-purple-400/50 hover:text-purple-200'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative z-10 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span>Email Logs</span>
              </span>
              {activeTab === 'logs' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-pulse"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'sender' ? <BulkEmailSender /> : <EmailLogsViewer />}
      </div>
    </div>
  );
}
