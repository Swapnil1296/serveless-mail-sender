'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { getAuthHeaders } from '@/lib/api';
import { decodeHtmlEntities } from '@/lib/sanitize';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleOptions(
  options: string[],
  correctIndex: number
): { displayOptions: string[]; displayCorrectIndex: number } {
  const indices = [0, 1, 2, 3];
  const shuffled = shuffle(indices);
  return {
    displayOptions: shuffled.map((i) => options[i]),
    displayCorrectIndex: shuffled.indexOf(correctIndex),
  };
}

interface QuizQuestion {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  displayOptions?: string[];
  displayCorrectIndex?: number;
}

export default function InterviewQuizRunner() {
  const router = useRouter();
  const sessionId = router.query.sessionId as string;
  const [session, setSession] = useState<{
    sessionId: string;
    questions: QuizQuestion[];
    timeLimitMs: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ correctCount: number; totalQuestions: number; xpEarned?: number } | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    fetch(`/api/interview/quiz/session/${sessionId}`, { headers: getAuthHeaders() })
      .then((res) => {
        if (!res.ok) throw new Error('Session not found');
        return res.json();
      })
      .then((data) => {
        const questions: QuizQuestion[] = data.questions.map((q: QuizQuestion) => {
          const { displayOptions, displayCorrectIndex } = shuffleOptions(q.options, q.correctAnswer);
          return { ...q, displayOptions, displayCorrectIndex };
        });
        setSession({
          sessionId: data.sessionId,
          questions,
          timeLimitMs: data.timeLimitMs || 25 * 60 * 1000,
        });
        setTimeLeft(Math.floor(data.timeLimitMs / 1000));
      })
      .catch(() => setError('Failed to load quiz'))
      .finally(() => setLoading(false));
  }, [sessionId]);

  const submitQuiz = useCallback(async () => {
    if (!session || submitted) return;
    setSubmitted(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const answers = session.questions.map((q) => ({
      questionId: q._id,
      selectedAnswer: selectedAnswers[q._id] ?? -1,
      timeSpentMs: 0,
    }));

    const res = await fetch('/api/interview/quiz/submit', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ sessionId: session.sessionId, answers }),
    });
    const data = await res.json();
    if (res.ok) {
      setResult({
        correctCount: data.correctCount,
        totalQuestions: data.totalQuestions,
        xpEarned: data.xpEarned,
      });
    }
  }, [session, selectedAnswers, submitted]);

  useEffect(() => {
    if (timeLeft === null || !session || submitted) return;
    if (timeLeft <= 0) {
      submitQuiz();
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => (t === null || t <= 1 ? 0 : t - 1));
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeLeft, session, submitted, submitQuiz]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-cyan-400">Loading quiz...</div>
      </div>
    );
  }
  if (error || !session) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-red-400">{error || 'Invalid session'}</div>
        <button
          onClick={() => router.push('/projects/interview-hub')}
          className="ml-4 px-4 py-2 rounded bg-cyan-600 text-white"
        >
          Back
        </button>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen bg-slate-950 p-4 flex items-center justify-center">
        <div className="max-w-md w-full p-8 rounded-xl border border-cyan-500/30 bg-slate-900 text-center">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">Quiz Complete!</h2>
          <div className="text-4xl font-bold text-white mb-2">
            {result.correctCount} / {result.totalQuestions}
          </div>
          <div className="text-slate-400 mb-4">
            {Math.round((result.correctCount / result.totalQuestions) * 100)}% correct
          </div>
          {result.xpEarned != null && (
            <div className="text-green-400 mb-6">+{result.xpEarned} XP</div>
          )}
          <button
            onClick={() => router.push('/projects/interview-hub')}
            className="w-full py-3 rounded-lg font-bold bg-cyan-600 hover:bg-cyan-500 text-black"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const current = session.questions[currentIndex];
  const displayOpts = current?.displayOptions ?? current?.options ?? [];
  const correctIdx = current?.displayCorrectIndex ?? current?.correctAnswer ?? 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 flex items-center justify-between gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span className="font-mono font-bold">
              {timeLeft !== null ? formatTime(timeLeft) : '--:--'}
            </span>
          </div>
          <span className="text-slate-400">
            {currentIndex + 1} / {session.questions.length}
          </span>
        </div>

        <div className="p-6 rounded-xl border border-slate-700 bg-slate-800/50 mb-6">
          <p className="text-lg text-white mb-4">{decodeHtmlEntities(current?.question)}</p>
          <div className="space-y-3">
            {displayOpts.map((opt: string, i: number) => {
              const isSelected = selectedAnswers[current!._id] === i;
              return (
                <label
                  key={i}
                  className={`flex items-start gap-3 p-4 rounded border-2 cursor-pointer transition ${
                    isSelected ? 'border-cyan-500 bg-cyan-500/20' : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${current!._id}`}
                    checked={isSelected}
                    onChange={() =>
                      setSelectedAnswers((prev) => ({ ...prev, [current!._id]: i }))
                    }
                    className="mt-1"
                  />
                  <span>{decodeHtmlEntities(opt)}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 py-2 px-4 rounded border border-slate-600 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          {currentIndex === session.questions.length - 1 ? (
            <button
              onClick={submitQuiz}
              className="py-2 px-4 rounded bg-cyan-600 hover:bg-cyan-500 text-black font-bold"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex((i) => i + 1)}
              className="flex items-center gap-1 py-2 px-4 rounded bg-cyan-600 hover:bg-cyan-500 text-black font-bold"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
