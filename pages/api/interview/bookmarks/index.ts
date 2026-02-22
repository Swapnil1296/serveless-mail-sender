import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Bookmark from '@/models/Bookmark';
import McqQuestion from '@/models/McqQuestion';
import { requireAuth } from '@/lib/auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const user = (req as any).user;
  const username = user?.username;
  if (!username) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    const bookmarks = await Bookmark.find({ username })
      .populate('questionId')
      .sort({ createdAt: -1 })
      .lean();
    return res.json(bookmarks.filter((b: any) => b.questionId));
  }

  if (req.method === 'POST') {
    const { questionId } = req.body;
    if (!questionId) return res.status(400).json({ error: 'questionId required' });
    const existing = await Bookmark.findOne({ username, questionId });
    if (existing) return res.json(existing);
    const b = await Bookmark.create({ username, questionId });
    return res.status(201).json(b);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default requireAuth(handler);
