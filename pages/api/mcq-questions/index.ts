import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import McqQuestion from '@/models/McqQuestion';
import { requireAuth } from '@/lib/auth';
import {
  sanitizeMcqQuestion,
  sanitizeMcqOption,
  sanitizeMcqTopic,
  sanitizeMcqExplanation,
} from '@/lib/sanitize';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { topic, topicsOnly } = req.query;
      if (topicsOnly === '1' || topicsOnly === 'true') {
        const topics = await McqQuestion.distinct('topic');
        return res.status(200).json({ topics: topics.sort() });
      }
      const query: Record<string, unknown> = {};
      if (topic && typeof topic === 'string' && topic.trim()) {
        query.topic = topic.trim();
      }
      const questions = await McqQuestion.find(query).sort({ createdAt: -1 }).lean();
      return res.status(200).json({ questions });
    } catch (error) {
      console.error('McqQuestion GET error:', error);
      return res.status(500).json({ error: 'Failed to fetch questions' });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = req.body;
      const items = Array.isArray(body) ? body : body.questions ? body.questions : [body];

      const created: unknown[] = [];
      for (const item of items) {
        const question = sanitizeMcqQuestion(item?.question);
        if (!question) {
          return res.status(400).json({ error: 'Question text is required' });
        }

        const rawOptions = Array.isArray(item?.options) ? item.options : [];
        const options = rawOptions
          .slice(0, 4)
          .map((o: unknown) => sanitizeMcqOption(o))
          .filter(Boolean);

        if (options.length !== 4) {
          return res.status(400).json({
            error: 'Exactly 4 options are required',
            received: options.length,
          });
        }

        let correctAnswer = Number(item?.correctAnswer);
        if (!Number.isInteger(correctAnswer) || correctAnswer < 0 || correctAnswer > 3) {
          return res.status(400).json({
            error: 'correctAnswer must be 0, 1, 2, or 3',
          });
        }

        const topic = sanitizeMcqTopic(item?.topic) || 'general';
        const explanation = sanitizeMcqExplanation(item?.explanation);

        const doc = await McqQuestion.create({
          question,
          options: options as [string, string, string, string],
          correctAnswer,
          topic,
          explanation: explanation || undefined,
        });
        created.push(doc);
      }

      return res.status(201).json({
        success: true,
        count: created.length,
        questions: created,
      });
    } catch (error) {
      console.error('McqQuestion POST error:', error);
      return res.status(500).json({ error: 'Failed to add question(s)' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default requireAuth(handler);
