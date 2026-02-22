import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import InterviewUser from '@/models/InterviewUser';
import Attempt from '@/models/Attempt';
import QuizSession from '@/models/QuizSession';
import McqQuestion from '@/models/McqQuestion';
import { requireAuth } from '@/lib/auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  await dbConnect();

  const user = (req as any).user;
  const username = user?.username;
  if (!username) return res.status(401).json({ error: 'Unauthorized' });

  const [profile, attemptStats, recentSessions, weakTopics] = await Promise.all([
    InterviewUser.findOne({ username }).lean(),
    Attempt.aggregate([
      { $match: { username } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          correct: { $sum: { $cond: ['$isCorrect', 1, 0] } },
          avgTime: { $avg: '$timeSpentMs' },
        },
      },
    ]),
    QuizSession.find({ username })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('mode totalQuestions correctCount completedAt createdAt')
      .lean(),
    Attempt.aggregate([
      { $match: { username, isCorrect: false } },
      { $lookup: { from: 'mcqquestions', localField: 'questionId', foreignField: '_id', as: 'q' } },
      { $unwind: '$q' },
      { $group: { _id: '$q.topic', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $project: { topic: '$_id', count: 1, _id: 0 } },
    ]),
  ]);

  const stats = attemptStats[0] || { total: 0, correct: 0, avgTime: 0 };
  const accuracy = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;

  return res.json({
    profile: profile || { xp: 0, level: 1, streak: 0, totalAttempts: 0, totalCorrect: 0, accuracy: 0 },
    totalAttempts: stats.total,
    accuracy,
    avgTimeMs: Math.round(stats.avgTime || 0),
    recentSessions,
    weakTopics: weakTopics.map((w: { topic: string; count: number }) => w.topic),
    totalQuestions: await McqQuestion.countDocuments(),
  });
}

export default requireAuth(handler);
