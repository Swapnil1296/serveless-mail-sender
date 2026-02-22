import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Bookmark from '@/models/Bookmark';
import { requireAuth } from '@/lib/auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).json({ error: 'Method not allowed' });
  await dbConnect();

  const user = (req as any).user;
  const username = user?.username;
  if (!username) return res.status(401).json({ error: 'Unauthorized' });

  const { questionId } = req.query;
  if (!questionId || typeof questionId !== 'string') {
    return res.status(400).json({ error: 'questionId required' });
  }

  await Bookmark.findOneAndDelete({ username, questionId });
  return res.json({ success: true });
}

export default requireAuth(handler);
