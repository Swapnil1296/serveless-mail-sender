import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { PROJECT_SLUGS } from '@/lib/constants';
import { withEncryption } from '@/lib/withEncryption';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }

    await dbConnect();
    const dbUser = await User.findById(payload.id).select('username role visibleProjects').lean().exec();

    if (!dbUser) {
      return res.status(401).json({ success: false, error: 'User not found' });
    }

    const isAdmin = dbUser.role === 'admin';
    const visibleProjects = isAdmin ? [...PROJECT_SLUGS] : (dbUser.visibleProjects || []);

    return res.status(200).json({
      success: true,
      user: {
        id: String(dbUser._id),
        username: dbUser.username,
        role: dbUser.role,
        visibleProjects,
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

export default withEncryption(handler);
