'use client';

import React, { useState, useCallback, memo, useEffect } from 'react';
import { FileText, Loader2, AlertCircle, Plus, Trash2 } from 'lucide-react';
import ResumePreview from './ResumePreview';
import type { ResumeContent } from '@/lib/aiService';

const MIN_CHARS = 30;

function ResumeCreatorInner() {
  const [jobDescriptions, setJobDescriptions] = useState<string[]>(['']);
  const [userContext, setUserContext] = useState('');
  const [contextLoading, setContextLoading] = useState(true);

  useEffect(() => {
    fetch('/api/parse-linkedin-pdf')
      .then((res) => res.json())
      .then((data) => {
        if (data?.text) setUserContext(data.text);
      })
      .catch(() => {})
      .finally(() => setContextLoading(false));
  }, []);
  const [resume, setResume] = useState<ResumeContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const updateJob = useCallback((index: number, value: string) => {
    setJobDescriptions((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const addJob = useCallback(() => {
    setJobDescriptions((prev) => [...prev, '']);
  }, []);

  const removeJob = useCallback((index: number) => {
    setJobDescriptions((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const handleGenerate = useCallback(async () => {
    const valid = jobDescriptions.filter((j) => j.trim().length >= MIN_CHARS);
    if (valid.length < 1) {
      setError(`Please paste at least one job description (min ${MIN_CHARS} chars).`);
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/generate-ats-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescriptions: valid,
          userContext: userContext.trim() || undefined,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Generation failed');
      }
      setResume(data.resume);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [jobDescriptions, userContext]);

  const clearError = useCallback(() => setError(null), []);

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">
            ATS Resume Creator
          </h1>
          <p className="text-cyan-300/80 text-sm max-w-2xl mx-auto">
            Paste one or more job descriptions below. We&apos;ll extract skills and generate a single-page, ATS-friendly resume optimized for all roles.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6 mb-10">
          <div className="bg-black/80 border-2 border-cyan-500/30 rounded-lg p-6">
            <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
              Your background {contextLoading ? '(loading…)' : '(from Linkedin-profile.pdf or optional)'}
            </label>
            <textarea
              value={userContext}
              onChange={(e) => setUserContext(e.target.value)}
              placeholder={contextLoading ? 'Loading from Linkedin-profile.pdf…' : 'e.g. 3 years React, Node.js. Worked at Company X. BS in CS.'}
              className="w-full h-24 px-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-cyan-500/40 resize-none focus:outline-none focus:border-cyan-400"
              maxLength={2000}
            />
          </div>

          <div className="space-y-4">
            {jobDescriptions.map((_, i) => (
              <div
                key={i}
                className="bg-black/80 border-2 border-cyan-500/30 rounded-lg p-4 relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    Job {i + 1} Description
                  </label>
                  {jobDescriptions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeJob(i)}
                      className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                      aria-label="Remove job description"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <textarea
                  value={jobDescriptions[i] ?? ''}
                  onChange={(e) => updateJob(i, e.target.value)}
                  placeholder="Paste full job description here (min 30 characters)..."
                  className="w-full h-28 px-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-cyan-500/40 resize-y focus:outline-none focus:border-cyan-400 min-h-[80px]"
                  maxLength={3000}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addJob}
              className="flex items-center gap-2 w-full py-3 border-2 border-dashed border-cyan-500/30 hover:border-cyan-400/50 rounded-lg text-cyan-400 hover:text-cyan-300 text-sm font-bold uppercase tracking-wider transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add job description
            </button>
          </div>

          {error && (
            <div
              className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-300 text-sm"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
              <button
                onClick={clearError}
                className="ml-auto text-red-400 hover:text-red-300 underline"
              >
                Dismiss
              </button>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-lg uppercase tracking-wider transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  Generate Resume
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview */}
        {resume && (
          <ResumePreview
            resume={resume}
            onDownloadStart={() => setDownloading(true)}
            onDownloadEnd={() => setDownloading(false)}
          />
        )}

        {downloading && (
          <div className="fixed bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 rounded-lg text-cyan-300 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            Preparing PDF...
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ResumeCreatorInner);
