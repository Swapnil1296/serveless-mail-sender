'use client';

import React, { useState, useEffect } from 'react';
import { Send, Briefcase, Code, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';

interface EmailResult {
  email: string;
  status: 'success' | 'failed';
  error?: string;
}

interface ServerHealth {
  status: string;
  database: {
    status: string;
    name?: string;
    host?: string;
    error?: string;
  };
  resumes: {
    frontend: { exists: boolean; path: string };
    mern: { exists: boolean; path: string };
  };
}

export default function BulkEmailSender() {
  const [emails, setEmails] = useState('');
  const [subject, setSubject] = useState('');
  const [senderName, setSenderName] = useState('Swapnil Landage');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<EmailResult[]>([]);
  const [serverHealth, setServerHealth] = useState<ServerHealth | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    checkServerHealth();
  }, []);

  const checkServerHealth = async () => {
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      setServerHealth(data);
      
      // Log database status to console
      if (data.database?.status === 'connected') {
        console.log('%c✅ MongoDB: Connected', 'color: #10b981; font-weight: bold');
        console.log('   Database:', data.database.name);
      } else {
        console.log('%c⚠️  MongoDB: Disconnected', 'color: #f59e0b; font-weight: bold');
        console.log('   Emails will send, but won\'t be logged');
      }
    } catch (error) {
      console.error('%c❌ Server health check failed', 'color: #ef4444; font-weight: bold', error);
      setServerHealth(null);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (value.endsWith(' ')) {
      value = value.slice(0, -1) + ',';
    }
    setEmails(value);
    if (errors.emails) {
      setErrors(prev => ({ ...prev, emails: '' }));
    }
  };

  const validateInputs = (emailList: string[]): boolean => {
    const newErrors: Record<string, string> = {};

    if (emailList.length === 0) {
      newErrors.emails = 'Please enter at least one email address';
    }

    if (!senderName.trim()) {
      newErrors.senderName = 'Please enter your name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmails = async (jobType: 'frontend' | 'mern') => {
    const emailList = emails
      .split(',')
      .map(e => e.trim())
      .filter(e => e);

    const uniqueEmails = [...new Set(emailList)];

    if (!validateInputs(uniqueEmails)) {
      return;
    }

    if (serverHealth && !serverHealth.resumes[jobType]?.exists) {
      alert(`⚠️ ${jobType.toUpperCase()} resume not found!`);
      return;
    }

    setLoading(true);
    setResults([]);

    try {

      const response = await fetch('/api/send-bulk-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || '',
        },
        body: JSON.stringify({
          emails: uniqueEmails,
          jobType,
          subject:
            subject ||
            `Application for ${jobType === 'frontend' ? 'Frontend' : 'MERN Stack'} Developer Position`,
          senderName: senderName || 'Applicant',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send emails');
      }

      setResults(data.results);

      if (data.summary.success > 0) {
        alert(`📧 Sent ${data.summary.success} emails successfully!`);
        setEmails('');
      }

      if (data.summary.failed > 0) {
        alert(`❌ Failed to send ${data.summary.failed} emails!`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : 'Failed to send emails');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-purple-950/20 to-black pointer-events-none"></div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      ></div>

      <div className="max-w-5xl mx-auto relative">
        <div className="bg-gradient-to-br from-cyan-950/40 via-purple-950/40 to-black/60 backdrop-blur-2xl rounded-3xl border-2 border-cyan-500/30 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full mb-6">
              <Send className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              BULK EMAIL SENDER
            </h1>
            <p className="text-lg text-cyan-200">
              Next.js Serverless Email Automation
            </p>
          </div>

          {/* Server Health */}
          {serverHealth && (
            <div className="mb-8 space-y-4">
              <div className="flex items-center justify-center gap-3 bg-black/60 rounded-2xl p-5 border-2 border-cyan-500/50">
                <div
                  className={`w-4 h-4 rounded-full ${
                    serverHealth.status === 'running' ? 'bg-green-400' : 'bg-red-400'
                  } animate-pulse`}
                ></div>
                <span className="font-bold text-cyan-300 text-xl uppercase">
                  SYSTEM {serverHealth.status === 'running' ? 'ONLINE' : 'OFFLINE'}
                </span>
                <div
                  className={`w-4 h-4 rounded-full ${
                    serverHealth.database.status === 'connected' ? 'bg-green-400' : 'bg-yellow-400'
                  } animate-pulse`}
                ></div>
                <span className="font-bold text-cyan-300 text-xl uppercase">
                  DB {serverHealth.database.status.toUpperCase()}
                </span>
                {serverHealth.database.status === 'connected' && serverHealth.database.name && (
                  <span className="text-cyan-400 text-sm">
                    ({serverHealth.database.name})
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(['frontend', 'mern'] as const).map(type => (
                  <div
                    key={type}
                    className={`p-6 rounded-2xl border-2 ${
                      serverHealth.resumes?.[type]?.exists
                        ? 'bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-green-400/60'
                        : 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-400/60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-4 rounded-xl ${
                          serverHealth.resumes?.[type]?.exists
                            ? 'bg-green-400/20'
                            : 'bg-red-400/20'
                        }`}
                      >
                        {type === 'frontend' ? (
                          <Code className="w-7 h-7 text-green-300" />
                        ) : (
                          <Briefcase className="w-7 h-7 text-green-300" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg uppercase">
                          {type === 'frontend' ? 'Frontend' : 'MERN'} Resume
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          {serverHealth.resumes?.[type]?.exists ? (
                            <>
                              <CheckCircle className="w-5 h-5 text-green-400" />
                              <span className="text-green-300 font-bold text-sm">
                                READY
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-5 h-5 text-red-400" />
                              <span className="text-red-300 font-bold text-sm">
                                NOT FOUND
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            <div className="bg-black/60 rounded-2xl p-6 border-2 border-cyan-500/50">
              <label className="block text-sm font-bold text-cyan-300 mb-3 uppercase">
                YOUR NAME *
              </label>
              <input
                type="text"
                value={senderName}
                onChange={e => {
                  setSenderName(e.target.value);
                  if (errors.senderName) {
                    setErrors(prev => ({ ...prev, senderName: '' }));
                  }
                }}
                placeholder="Enter your name"
                className="w-full px-6 py-4 bg-black/40 border-2 border-purple-500/50 rounded-xl text-cyan-100 placeholder-purple-400/60 focus:border-cyan-400 focus:outline-none"
              />
              {errors.senderName && (
                <p className="text-red-400 text-sm mt-2">{errors.senderName}</p>
              )}
            </div>

            <div className="bg-black/60 rounded-2xl p-6 border-2 border-purple-500/50">
              <label className="block text-sm font-bold text-purple-300 mb-3 uppercase">
                EMAIL SUBJECT (OPTIONAL)
              </label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Leave empty for default subject"
                className="w-full px-6 py-4 bg-black/40 border-2 border-cyan-500/50 rounded-xl text-purple-100 placeholder-cyan-400/60 focus:border-purple-400 focus:outline-none"
              />
            </div>

            <div className="bg-black/60 rounded-2xl p-6 border-2 border-pink-500/50">
              <label className="block text-sm font-bold text-pink-300 mb-3 uppercase">
                RECIPIENT ADDRESSES * (COMMA SEPARATED)
              </label>
              <textarea
                value={emails}
                onChange={handleEmailChange}
                placeholder="recipient1@example.com, recipient2@example.com"
                rows={6}
                className="w-full px-6 py-4 bg-black/40 border-2 border-cyan-500/50 rounded-xl text-pink-100 placeholder-cyan-400/60 focus:border-pink-400 focus:outline-none font-mono"
              />
              {errors.emails && (
                <p className="text-red-400 text-sm mt-2">{errors.emails}</p>
              )}
              <div className="flex items-center justify-between mt-3">
                <span className="text-cyan-300 text-sm font-bold uppercase">
                  {emails.split(',').filter(e => e.trim()).length} EMAIL(S) QUEUED
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <button
                onClick={() => sendEmails('frontend')}
                disabled={
                  loading ||
                  !senderName ||
                  !serverHealth?.resumes?.frontend?.exists
                }
                className="px-8 py-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all hover:scale-105 disabled:hover:scale-100 disabled:opacity-40 border-2 border-cyan-400/50"
              >
                <div className="flex items-center justify-center gap-3 text-lg uppercase">
                  <Code className="w-7 h-7" />
                  <span>Frontend Dev</span>
                  <Send className="w-7 h-7" />
                </div>
              </button>

              <button
                onClick={() => sendEmails('mern')}
                disabled={
                  loading || !senderName || !serverHealth?.resumes?.mern?.exists
                }
                className="px-8 py-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all hover:scale-105 disabled:hover:scale-100 disabled:opacity-40 border-2 border-green-400/50"
              >
                <div className="flex items-center justify-center gap-3 text-lg uppercase">
                  <Briefcase className="w-7 h-7" />
                  <span>MERN Dev</span>
                  <Send className="w-7 h-7" />
                </div>
              </button>
            </div>

            {loading && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="text-center py-8 bg-black/60 rounded-2xl border-2 border-purple-500/50 px-12">
                  <div className="inline-block relative">
                    <div className="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
                  </div>
                  <p className="text-white font-bold text-2xl mt-6 uppercase">
                    TRANSMITTING DATA
                  </p>
                </div>
              </div>
            )}

            {results.length > 0 && (
              <div className="bg-black/60 rounded-2xl p-6 border-2 border-green-500/50">
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3 uppercase">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  TRANSMISSION LOG
                </h3>
                <div className="bg-black/40 rounded-xl p-4 max-h-72 overflow-y-auto space-y-3">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between py-4 px-6 rounded-xl border-2 ${
                        result.status === 'success'
                          ? 'bg-green-600/30 border-green-400/60'
                          : 'bg-red-600/30 border-red-400/60'
                      }`}
                    >
                      <span className="font-mono text-white text-sm">
                        {result.email}
                      </span>
                      <div className="flex items-center gap-3">
                        {result.status === 'success' ? (
                          <>
                            <CheckCircle className="w-6 h-6 text-green-400" />
                            <span className="font-bold text-xs uppercase text-green-300 bg-green-500/40 px-4 py-1.5 rounded-full">
                              ✓ DELIVERED
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-6 h-6 text-red-400" />
                            <span className="font-bold text-xs uppercase text-red-300 bg-red-500/40 px-4 py-1.5 rounded-full">
                              ✗ FAILED
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
