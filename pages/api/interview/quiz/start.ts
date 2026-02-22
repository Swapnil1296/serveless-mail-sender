import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import McqQuestion from '@/models/McqQuestion';
import QuizSession from '@/models/QuizSession';
import Attempt from '@/models/Attempt';
import { requireAuth } from '@/lib/auth';

const MODE_CONFIG: Record<string, { count: number; timeMs: number }> = {
  random_10: { count: 10, timeMs: 10 * 60 * 1000 },
  random_25: { count: 25, timeMs: 20 * 60 * 1000 },
  random_50: { count: 50, timeMs: 45 * 60 * 1000 },
  timed: { count: 30, timeMs: 25 * 60 * 1000 },
  topic: { count: 30, timeMs: 25 * 60 * 1000 },
  wrong_retry: { count: 20, timeMs: 15 * 60 * 1000 },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  await dbConnect();

  const user = (req as any).user;
  const username = user?.username;
  if (!username) return res.status(401).json({ error: 'Unauthorized' });

  const { mode = 'random_25', topic } = req.body;
  const config = MODE_CONFIG[mode] || MODE_CONFIG.random_25;

  let questions;
  const filter: Record<string, unknown> = {};

  if (mode === 'wrong_retry') {
    const wrongIds = await Attempt.distinct('questionId', { username, isCorrect: false });
    if (wrongIds.length < 5) {
      return res.status(400).json({ error: 'Not enough wrong questions. Practice more first!' });
    }
    questions = await McqQuestion.find({ _id: { $in: shuffle(wrongIds).slice(0, config.count) } }).lean();
  } else {
    if (topic && topic !== 'mixed') filter.topic = topic;
    const all = await McqQuestion.find(filter).lean();
    if (all.length < config.count) {
      return res.status(400).json({ error: `Need at least ${config.count} questions. Available: ${all.length}` });
    }
    questions = shuffle(all).slice(0, config.count);
  }

  const questionIds = questions.map((q: { _id: unknown }) => (q as { _id: unknown })._id);
  const session = await QuizSession.create({
    username,
    mode,
    questionIds,
    answers: [],
    totalQuestions: questionIds.length,
    timeLimitMs: config.timeMs,
    topic: topic || undefined,
  });

  return res.status(201).json({
    sessionId: session._id,
    questionIds,
    questions: questions.map((q: any) => ({
      _id: q._id,
      question: q.question,
      options: q.options,
      topic: q.topic,
    })),
    timeLimitMs: config.timeMs,
  });
}

export default requireAuth(handler);
