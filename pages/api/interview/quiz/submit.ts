import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import QuizSession from '@/models/QuizSession';
import McqQuestion from '@/models/McqQuestion';
import Attempt from '@/models/Attempt';
import InterviewUser from '@/models/InterviewUser';
import { requireAuth } from '@/lib/auth';

const XP_CORRECT: Record<string, number> = { easy: 10, medium: 20, hard: 40 };

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  await dbConnect();

  const user = (req as any).user;
  const username = user?.username;
  if (!username) return res.status(401).json({ error: 'Unauthorized' });

  const { sessionId, answers } = req.body;
  if (!sessionId || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'sessionId and answers required' });
  }

  const session = await QuizSession.findOne({ _id: sessionId, username });
  if (!session) return res.status(404).json({ error: 'Session not found' });
  if (session.completedAt) return res.status(400).json({ error: 'Session already submitted' });

  const questions = await McqQuestion.find({ _id: { $in: session.questionIds } }).lean();
  const qMap = new Map(questions.map((q: any) => [String(q._id), q]));

  let correctCount = 0;
  let xpEarned = 0;

  for (const a of answers) {
    const q = qMap.get(String(a.questionId));
    if (!q) continue;
    const isCorrect = a.selectedAnswer === q.correctAnswer;
    if (isCorrect) {
      correctCount++;
      xpEarned += XP_CORRECT[String(q.difficulty || 'medium')] || 20;
    }
    await Attempt.create({
      username,
      questionId: a.questionId,
      selectedAnswer: a.selectedAnswer,
      isCorrect,
      timeSpentMs: a.timeSpentMs || 0,
      quizSessionId: sessionId,
      attemptMode: session.mode,
    });
  }

  await QuizSession.findByIdAndUpdate(sessionId, {
    answers: answers,
    correctCount,
    completedAt: new Date(),
    timeSpentMs: answers.reduce((s: number, a: { timeSpentMs?: number }) => s + (a.timeSpentMs || 0), 0),
  });

  const profile = await InterviewUser.findOne({ username });
  if (profile) {
    profile.totalAttempts += answers.length;
    profile.totalCorrect += correctCount;
    profile.accuracy = profile.totalAttempts ? Math.round((profile.totalCorrect / profile.totalAttempts) * 100) : 0;
    profile.xp += xpEarned;
    profile.level = Math.floor(Math.sqrt(profile.xp / 100)) + 1;
    await profile.save();
  } else {
    await InterviewUser.create({
      username,
      totalAttempts: answers.length,
      totalCorrect: correctCount,
      accuracy: Math.round((correctCount / answers.length) * 100),
      xp: xpEarned,
      level: 1,
    });
  }

  return res.json({
    success: true,
    correctCount,
    totalQuestions: session.totalQuestions,
    xpEarned,
    accuracy: Math.round((correctCount / session.totalQuestions) * 100),
  });
}

export default requireAuth(handler);
