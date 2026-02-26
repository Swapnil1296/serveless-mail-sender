import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { requireAdmin } from '@/lib/auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await dbConnect();
  const users = await User.find({})
    .select('username email role visibleProjects createdAt')
    .sort({ createdAt: -1 })
    .lean()
    .exec();

  const list = users.map((u) => ({
    id: String(u._id),
    username: u.username,
    email: u.email,
    role: u.role,
    visibleProjects: u.visibleProjects || [],
    createdAt: u.createdAt,
  }));

  return res.status(200).json({ success: true, users: list });
}

export default requireAdmin(handler);
