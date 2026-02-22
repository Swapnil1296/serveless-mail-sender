import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import QuizSession from '@/models/QuizSession';
import McqQuestion from '@/models/McqQuestion';
import { requireAuth } from '@/lib/auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  await dbConnect();

  const user = (req as any).user;
  const username = user?.username;
  if (!username) return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Invalid session id' });

  const session = await QuizSession.findOne({ _id: id, username }).lean();
  if (!session) return res.status(404).json({ error: 'Session not found' });
  if (session.completedAt) return res.status(400).json({ error: 'Session already completed' });

  const questions = await McqQuestion.find({ _id: { $in: session.questionIds } }).lean();

  return res.json({
    sessionId: session._id,
    mode: session.mode,
    questionIds: session.questionIds,
    questions,
    timeLimitMs: session.timeLimitMs,
  });
}

export default requireAuth(handler);
