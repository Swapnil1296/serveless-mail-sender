'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Send, Briefcase, Code, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { showAlert } from '@/lib/alerts';
import SciFiLoader from '@/components/SciFiLoader';

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

  // Client-side email validation (matches API rules: basic format + length)
  const isValidEmail = (email: string): boolean => {
    if (!email || typeof email !== 'string' || email.length > 254) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
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

  const showInvalidEmailsAlert = (invalidList: string[]) => {
    const listHtml =
      invalidList.length > 0
        ? `<p class="text-left font-medium text-red-300 mb-2">Invalid addresses:</p><ul class="text-left list-disc list-inside text-cyan-200 space-y-1">${invalidList.map(e => `<li><code class="bg-black/40 px-1 rounded">${e}</code></li>`).join('')}</ul>`
        : '';
    showAlert.error(
      listHtml || 'Invalid email addresses detected.',
      'Invalid email addresses'
    );
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

    // Validate emails before calling API
    const invalidEmails = uniqueEmails.filter(e => !isValidEmail(e));
    if (invalidEmails.length > 0) {
      showInvalidEmailsAlert(invalidEmails);
      return;
    }

    if (serverHealth && !serverHealth.resumes[jobType]?.exists) {
      showAlert.warning(`⚠️ ${jobType.toUpperCase()} resume not found!`, `${jobType.toUpperCase()} Resume Not Found`);
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
        if (data.invalidEmails && Array.isArray(data.invalidEmails) && data.invalidEmails.length > 0) {
          showInvalidEmailsAlert(data.invalidEmails);
        } else {
          showAlert.error(data.error || 'Failed to send emails', 'Error');
        }
        return;
      }

      setResults(data.results);

      if (data.summary.success > 0) {
        showAlert.success(`📧 Sent ${data.summary.success} emails successfully!`, 'Email Sent');
        setEmails('');
      }

      if (data.summary.failed > 0) {
        showAlert.error(`❌ Failed to send ${data.summary.failed} emails!`, 'Email Sending Failed');
      }
    } catch (error) {
      console.error('Error:', error);
      showAlert.error(
        error instanceof Error ? error.message : 'Failed to send emails',
        'Error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-black p-2 sm:p-4 md:p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-purple-950/20 to-black pointer-events-none" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-5xl mx-auto relative">
        <div className="bg-gradient-to-br from-cyan-950/40 via-purple-950/40 to-black/60 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-cyan-500/30 p-3 sm:p-5 md:p-6 lg:p-8">
          {/* Header - compact, mobile-first */}
          <div className="text-center mb-3 sm:mb-5 md:mb-6 relative">
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full shrink-0">
                <Send className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div className="relative">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 tracking-wider">
                  BULK EMAIL SENDER
                </h1>
                <p className="text-xs sm:text-sm text-cyan-400 font-bold uppercase tracking-widest mt-0.5">
                  Email Automation
                </p>
              </div>
            </div>
          </div>

          {/* Server Health - compact */}
          {serverHealth && (
            <div className="mb-3 sm:mb-5 space-y-2 sm:space-y-3">
              <div className="flex items-center justify-center gap-2 bg-black/50 rounded-lg p-2.5 sm:p-3 border border-cyan-500/40">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                      serverHealth.status === 'running' ? 'bg-green-400' : 'bg-red-400'
                    } animate-pulse`}
                  ></div>
                  <span className="font-bold text-cyan-300 text-xs sm:text-sm md:text-base uppercase">
                    System {serverHealth.status === 'running' ? 'online' : 'offline'}
                  </span>
                </div>
                {/* <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                      serverHealth.database.status === 'connected' ? 'bg-green-400' : 'bg-yellow-400'
                    } animate-pulse`}
                  ></div>
                  <span className="font-bold text-cyan-300 text-base sm:text-lg md:text-xl uppercase">
                    DB {serverHealth.database.status.toUpperCase()}
                  </span>
                  {serverHealth.database.status === 'connected' && serverHealth.database.name && (
                    <span className="text-cyan-400 text-xs sm:text-sm">
                      ({serverHealth.database.name})
                    </span>
                  )}
                </div> */}
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {(['frontend', 'mern'] as const).map(type => (
                  <div
                    key={type}
                    className={`p-2.5 sm:p-4 rounded-lg sm:rounded-xl border ${
                      serverHealth.resumes?.[type]?.exists
                        ? 'bg-green-500/10 border-green-400/50'
                        : 'bg-red-500/10 border-red-400/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className={`p-2 rounded-md shrink-0 ${
                          serverHealth.resumes?.[type]?.exists
                            ? 'bg-green-400/20'
                            : 'bg-red-400/20'
                        }`}
                      >
                        {type === 'frontend' ? (
                          <Code className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                        ) : (
                          <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-white text-xs sm:text-sm uppercase truncate">
                          {type === 'frontend' ? 'Frontend' : 'MERN'} Resume
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {serverHealth.resumes?.[type]?.exists ? (
                            <>
                              <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 shrink-0" />
                              <span className="text-green-300 font-bold text-[10px] sm:text-xs uppercase">Ready</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 shrink-0" />
                              <span className="text-red-300 font-bold text-[10px] sm:text-xs uppercase">Not found</span>
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

          {/* Form - compact spacing */}
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-black/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-cyan-500/40">
              <label className="block text-[10px] sm:text-xs font-bold text-cyan-300 mb-1.5 uppercase">
                Your name *
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
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/40 border border-slate-600 rounded-lg text-cyan-100 text-sm placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
              {errors.senderName && (
                <p className="text-red-400 text-xs sm:text-sm mt-2">{errors.senderName}</p>
              )}
            </div>

            <div className="bg-black/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-purple-500/40">
              <label className="block text-[10px] sm:text-xs font-bold text-purple-300 mb-1.5 uppercase">
                Email subject (optional)
              </label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Default if empty"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/40 border border-slate-600 rounded-lg text-slate-200 text-sm placeholder-slate-500 focus:border-purple-400 focus:outline-none"
              />
            </div>

            <div className="bg-black/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-pink-500/40">
              <label className="block text-[10px] sm:text-xs font-bold text-pink-300 mb-1.5 uppercase">
                Recipient addresses * (comma separated)
              </label>
              <textarea
                value={emails}
                onChange={handleEmailChange}
                placeholder="email1@example.com, email2@example.com"
                rows={3}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/40 border border-slate-600 rounded-lg text-slate-200 text-sm placeholder-slate-500 focus:border-pink-400 focus:outline-none font-mono resize-y min-h-[72px]"
              />
              {errors.emails && (
                <p className="text-red-400 text-xs sm:text-sm mt-2">{errors.emails}</p>
              )}
              <div className="flex items-center justify-between mt-3">
                <span className="text-cyan-300 text-xs sm:text-sm font-bold uppercase">
                  {emails.split(',').filter(e => e.trim()).length} EMAIL(S) QUEUED
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 pt-1">
              <button
                onClick={() => sendEmails('frontend')}
                disabled={
                  loading ||
                  !senderName ||
                  !serverHealth?.resumes?.frontend?.exists
                }
                className="px-4 sm:px-6 py-3 sm:py-4 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-lg sm:rounded-xl transition-all hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-50 border border-cyan-400/50 text-sm sm:text-base uppercase"
              >
                <div className="flex items-center justify-center gap-2">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Frontend Dev</span>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </button>

              <button
                onClick={() => sendEmails('mern')}
                disabled={
                  loading || !senderName || !serverHealth?.resumes?.mern?.exists
                }
                className="px-4 sm:px-6 py-3 sm:py-4 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-lg sm:rounded-xl transition-all hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-50 border border-green-400/50 text-sm sm:text-base uppercase"
              >
                <div className="flex items-center justify-center gap-2">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>MERN Dev</span>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </button>
            </div>

            {loading &&
              typeof document !== 'undefined' &&
              createPortal(
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
                  <div className="text-center py-8 px-8 bg-slate-900/95 rounded-xl border border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.15)] shrink-0 w-[280px] sm:w-[320px] box-border">
                    <SciFiLoader label="TRANSMITTING DATA" size="lg" />
                  </div>
                </div>,
                document.body
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
