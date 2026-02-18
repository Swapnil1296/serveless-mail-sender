'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Send, Briefcase, Code, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { showAlert } from '@/lib/alerts';

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
    <div className="min-h-screen bg-black p-2 sm:p-4 md:p-8 relative overflow-hidden">
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
        <div className="bg-gradient-to-br from-cyan-950/40 via-purple-950/40 to-black/60 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border-2 border-cyan-500/30 p-4 sm:p-6 md:p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10 relative">
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"></div>
            
            <div className="relative">
              {/* Animated icon with glow */}
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full mb-4 sm:mb-6 relative animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <Send className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white relative z-10" />
              </div>
              
              {/* Title with glitch effect */}
              <div className="relative inline-block">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 sm:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 relative z-10 tracking-wider">
                  BULK EMAIL SENDER
                </h1>
                {/* Glitch layers */}
                <h1 className="absolute top-0 left-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 sm:mb-3 text-cyan-400 opacity-70 animate-glitch-1" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}>
                  BULK EMAIL SENDER
                </h1>
                <h1 className="absolute top-0 left-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 sm:mb-3 text-pink-400 opacity-70 animate-glitch-2" style={{ clipPath: 'polygon(0 60%, 100% 60%, 100% 100%, 0 100%)' }}>
                  BULK EMAIL SENDER
                </h1>
              </div>
              
              {/* Subtitle with neon glow */}
              <div className="relative inline-block mt-2">
                <p className="text-sm sm:text-base md:text-lg text-cyan-300 font-bold uppercase tracking-widest relative z-10">
                  <span className="inline-block px-4 py-2 bg-black/40 border border-cyan-500/50 rounded-lg shadow-lg shadow-cyan-500/50">
                     Email Automation
                  </span>
                </p>
              </div>
              
              {/* Decorative lines */}
              <div className="flex items-center justify-center gap-4 mt-4 sm:mt-6">
                <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-500/50"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-500/50" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse shadow-lg shadow-pink-500/50" style={{ animationDelay: '0.4s' }}></div>
                <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Server Health */}
          {serverHealth && (
            <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 bg-black/60 rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-cyan-500/50">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                      serverHealth.status === 'running' ? 'bg-green-400' : 'bg-red-400'
                    } animate-pulse`}
                  ></div>
                  <span className="font-bold text-cyan-300 text-base sm:text-lg md:text-xl uppercase">
                    SYSTEM {serverHealth.status === 'running' ? 'ONLINE' : 'OFFLINE'}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {(['frontend', 'mern'] as const).map(type => (
                  <div
                    key={type}
                    className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 ${
                      serverHealth.resumes?.[type]?.exists
                        ? 'bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-green-400/60'
                        : 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-400/60'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${
                          serverHealth.resumes?.[type]?.exists
                            ? 'bg-green-400/20'
                            : 'bg-red-400/20'
                        }`}
                      >
                        {type === 'frontend' ? (
                          <Code className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-300" />
                        ) : (
                          <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-300" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base sm:text-lg uppercase">
                          {type === 'frontend' ? 'Frontend' : 'MERN'} Resume
                        </h3>
                        <div className="flex items-center gap-2 mt-1 sm:mt-2">
                          {serverHealth.resumes?.[type]?.exists ? (
                            <>
                              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                              <span className="text-green-300 font-bold text-xs sm:text-sm">
                                READY
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                              <span className="text-red-300 font-bold text-xs sm:text-sm">
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
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-black/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-cyan-500/50">
              <label className="block text-xs sm:text-sm font-bold text-cyan-300 mb-2 sm:mb-3 uppercase">
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
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-black/40 border-2 border-purple-500/50 rounded-lg sm:rounded-xl text-cyan-100 text-sm sm:text-base placeholder-purple-400/60 focus:border-cyan-400 focus:outline-none"
              />
              {errors.senderName && (
                <p className="text-red-400 text-xs sm:text-sm mt-2">{errors.senderName}</p>
              )}
            </div>

            <div className="bg-black/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-purple-500/50">
              <label className="block text-xs sm:text-sm font-bold text-purple-300 mb-2 sm:mb-3 uppercase">
                EMAIL SUBJECT (OPTIONAL)
              </label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Leave empty for default subject"
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-black/40 border-2 border-cyan-500/50 rounded-lg sm:rounded-xl text-purple-100 text-sm sm:text-base placeholder-cyan-400/60 focus:border-purple-400 focus:outline-none"
              />
            </div>

            <div className="bg-black/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-pink-500/50">
              <label className="block text-xs sm:text-sm font-bold text-pink-300 mb-2 sm:mb-3 uppercase">
                RECIPIENT ADDRESSES * (COMMA SEPARATED)
              </label>
              <textarea
                value={emails}
                onChange={handleEmailChange}
                placeholder="recipient1@example.com, recipient2@example.com"
                rows={6}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-black/40 border-2 border-cyan-500/50 rounded-lg sm:rounded-xl text-pink-100 text-sm sm:text-base placeholder-cyan-400/60 focus:border-pink-400 focus:outline-none font-mono"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2 sm:pt-4">
              <button
                onClick={() => sendEmails('frontend')}
                disabled={
                  loading ||
                  !senderName ||
                  !serverHealth?.resumes?.frontend?.exists
                }
                className="px-6 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-bold rounded-xl sm:rounded-2xl transition-all hover:scale-105 disabled:hover:scale-100 disabled:opacity-40 border-2 border-cyan-400/50"
              >
                <div className="flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg uppercase">
                  <Code className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  <span>Frontend Dev</span>
                  <Send className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
              </button>

              <button
                onClick={() => sendEmails('mern')}
                disabled={
                  loading || !senderName || !serverHealth?.resumes?.mern?.exists
                }
                className="px-6 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-bold rounded-xl sm:rounded-2xl transition-all hover:scale-105 disabled:hover:scale-100 disabled:opacity-40 border-2 border-green-400/50"
              >
                <div className="flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg uppercase">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  <span>MERN Dev</span>
                  <Send className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
              </button>
            </div>

            {loading &&
              typeof document !== 'undefined' &&
              createPortal(
                <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
                  <div className="text-center py-6 px-6 bg-black/70 rounded-2xl border-2 border-purple-500/50 shadow-2xl shrink-0 w-[260px] sm:w-[300px] box-border">
                    <div className="inline-block relative">
                      <div className="w-14 h-14 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mx-auto" />
                    </div>
                    <p className="text-white font-bold text-base sm:text-lg mt-4 uppercase tracking-wide">
                      TRANSMITTING DATA
                    </p>
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
