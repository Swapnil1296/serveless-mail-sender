'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Zap,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Trophy,
  Target,
  Clock,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { getAuthHeaders } from '@/lib/api';
import { decodeHtmlEntities } from '@/lib/sanitize';
import { TOPICS, QUIZ_MODES } from '@/lib/interviewConstants';

type Tab = 'dashboard' | 'practice' | 'quiz' | 'bookmarks';

interface DashboardData {
  profile: { xp: number; level: number; streak: number; accuracy: number };
  totalAttempts: number;
  accuracy: number;
  avgTimeMs: number;
  recentSessions: Array<{ mode: string; totalQuestions: number; correctCount: number; completedAt: string }>;
  weakTopics: string[];
  totalQuestions: number;
}

export default function InterviewHub() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<any[]>([]);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === 'dashboard') fetchDashboard();
    if (activeTab === 'practice') fetchQuestions();
    if (activeTab === 'bookmarks') fetchBookmarks();
  }, [activeTab]);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/interview/analytics/dashboard', { headers: getAuthHeaders() });
      if (res.ok) setDashboard(await res.json());
      else setError('Failed to load dashboard');
    } catch (e) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/mcq-questions', { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        setQuestions(data.questions || []);
      }
    } catch {
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/interview/bookmarks', { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        setBookmarks(data.filter((b: any) => b.questionId).map((b: any) => b.questionId));
      }
    } catch {
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'practice' as Tab, label: 'Practice', icon: BookOpen },
    { id: 'quiz' as Tab, label: 'Quiz', icon: Zap },
    { id: 'bookmarks' as Tab, label: 'Bookmarks', icon: Bookmark },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto p-4 pb-12">
        <h1 className="text-2xl font-bold text-cyan-400 mb-6">Interview Prep Platform</h1>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold whitespace-nowrap border-2 transition ${
                activeTab === id
                  ? 'bg-cyan-600/30 border-cyan-400 text-cyan-200'
                  : 'border-slate-600 text-slate-400 hover:border-cyan-500/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <DashboardTab data={dashboard} loading={loading} />
        )}
        {activeTab === 'practice' && (
          <PracticeTab questions={questions} loading={loading} onBookmark={fetchBookmarks} />
        )}
        {activeTab === 'quiz' && <QuizTab />}
        {activeTab === 'bookmarks' && (
          <BookmarksTab bookmarks={bookmarks} loading={loading} onRefresh={fetchBookmarks} />
        )}
      </div>
    </div>
  );
}

function DashboardTab({ data, loading }: { data: DashboardData | null; loading: boolean }) {
  if (loading) return <div className="text-cyan-400">Loading...</div>;
  if (!data) return null;

  const { profile, totalAttempts, accuracy, weakTopics, recentSessions, totalQuestions } = data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon={Target} label="Total Attempts" value={totalAttempts} />
        <StatCard icon={TrendingUp} label="Accuracy" value={`${accuracy}%`} />
        <StatCard icon={Trophy} label="Level" value={profile?.level || 1} />
        <StatCard icon={Clock} label="XP" value={profile?.xp || 0} />
      </div>

      {weakTopics.length > 0 && (
        <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10">
          <h3 className="font-bold text-amber-300 mb-2">Weak Topics</h3>
          <div className="flex flex-wrap gap-2">
            {weakTopics.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-bold text-slate-300 mb-3">Recent Sessions</h3>
        {recentSessions.length === 0 ? (
          <p className="text-slate-500">No sessions yet. Start a quiz!</p>
        ) : (
          <div className="space-y-2">
            {recentSessions.map((s: any, i: number) => (
              <div
                key={i}
                className="flex justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700"
              >
                <span className="text-cyan-300">{s.mode}</span>
                <span>
                  {s.correctCount}/{s.totalQuestions} ·{' '}
                  {s.totalQuestions ? Math.round((s.correctCount / s.totalQuestions) * 100) : 0}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-sm text-slate-500">
        {totalQuestions} questions available. Practice to improve!
      </p>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) {
  return (
    <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-800/50">
      <Icon className="w-6 h-6 text-cyan-400 mb-2" />
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  );
}

function PracticeTab({
  questions,
  loading,
  onBookmark,
}: {
  questions: any[];
  loading: boolean;
  onBookmark: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [topic, setTopic] = useState('');

  const filtered = topic
    ? questions.filter((q) => q.topic?.toLowerCase().includes(topic.toLowerCase()))
    : questions;

  if (loading) return <div className="text-cyan-400">Loading...</div>;

  return (
    <div>
      <select
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="mb-4 w-full sm:w-48 p-2 rounded bg-slate-800 border border-slate-600 text-slate-200"
      >
        <option value="">All topics</option>
        {TOPICS.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <div className="space-y-3">
        {filtered.map((q) => (
          <div
            key={q._id}
            className="rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden"
          >
            <button
              onClick={() => setExpanded(expanded === q._id ? null : q._id)}
              className="w-full p-4 text-left flex justify-between items-center"
            >
              <span className="text-cyan-200 font-medium mt">{decodeHtmlEntities(q.question)}</span>
              <span className="text-slate-500">
                {expanded === q._id ? <ChevronUp className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </span>
            </button>
            {expanded === q._id && (
              <div className="p-4 pt-0 border-t border-slate-700 space-y-3">
                <div className="flex flex-wrap gap-2 mt-2">
                  {q.options?.map((opt: string, i: number) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded ${
                        i === q.correctAnswer ? 'bg-green-500/20 text-green-300' : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {String.fromCharCode(65 + i)}. {decodeHtmlEntities(opt)}
                    </span>
                  ))}
                </div>
                {q.explanation && (
                  <p className="text-slate-400 text-sm">{decodeHtmlEntities(q.explanation)}</p>
                )}
                <div className="flex gap-2">
                  <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs">{q.topic}</span>
                  <BookmarkButton questionId={q._id} onSuccess={onBookmark} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BookmarkButton({
  questionId,
  onSuccess,
}: {
  questionId: string;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/interview/bookmarks', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ questionId }),
      });
      if (res.ok) onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="flex items-center gap-1 px-2 py-1 rounded bg-slate-600 text-slate-300 hover:bg-slate-500 text-xs"
    >
      <Bookmark className="w-3 h-3" /> Save
    </button>
  );
}

function QuizTab() {
  const [mode, setMode] = useState('random_25');
  const [topic, setTopic] = useState('');
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startQuiz = async () => {
    setStarting(true);
    setError(null);
    try {
      const res = await fetch('/api/interview/quiz/start', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          mode: mode === 'topic' ? 'topic' : mode,
          topic: mode === 'topic' ? topic || undefined : topic || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to start');
      window.location.href = `/projects/interview-quiz?sessionId=${data.sessionId}`;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setStarting(false);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-slate-400">Choose a quiz mode and start practicing.</p>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300">
          {error}
        </div>
      )}

      <div className="grid gap-4">
        {QUIZ_MODES.map((m) => (
          <label
            key={m.id}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${
              mode === m.id ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-700 hover:border-slate-600'
            }`}
          >
            <input
              type="radio"
              name="mode"
              value={m.id}
              checked={mode === m.id}
              onChange={() => setMode(m.id)}
              className="w-4 h-4"
            />
            <div>
              <div className="font-bold text-cyan-200">{m.label}</div>
              <div className="text-sm text-slate-400">{m.desc}</div>
            </div>
          </label>
        ))}
      </div>

      {mode === 'topic' && (
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 text-slate-200"
        >
          <option value="">Select topic</option>
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      )}

      <button
        onClick={startQuiz}
        disabled={starting}
        className="w-full py-4 rounded-xl font-bold bg-cyan-600 hover:bg-cyan-500 text-black disabled:opacity-50"
      >
        {starting ? 'Starting...' : 'Start Quiz'}
      </button>
    </div>
  );
}

function BookmarksTab({
  bookmarks,
  loading,
  onRefresh,
}: {
  bookmarks: any[];
  loading: boolean;
  onRefresh: () => void;
}) {
  const removeBookmark = async (questionId: string) => {
    await fetch(`/api/interview/bookmarks/${questionId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    onRefresh();
  };

  if (loading) return <div className="text-cyan-400">Loading...</div>;
  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <Bookmark className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>No bookmarks. Save questions from Practice to review later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((q) => (
        <div
          key={q._id}
          className="p-4 rounded-xl border border-slate-700 bg-slate-800/50 flex justify-between items-start gap-4"
        >
          <span className="text-cyan-200">{decodeHtmlEntities(q.question)}</span>
          <button
            onClick={() => removeBookmark(q._id)}
            className="text-red-400 hover:text-red-300 text-sm shrink-0"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
