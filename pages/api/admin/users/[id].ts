import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { requireAdmin } from '@/lib/auth';
import { validateProjectSlugs } from '@/lib/validation';
import { withEncryption } from '@/lib/withEncryption';
import { emitVisibilityUpdated } from '@/lib/socketServer';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  if (!id) return res.status(400).json({ error: 'User ID required' });

  await dbConnect();
  const user = await User.findById(id).exec();
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (user.role === 'admin') {
    return res.status(403).json({ error: 'Cannot modify admin user visibility' });
  }

  if (req.method === 'PUT') {
    const { visibleProjects } = req.body ?? {};
    const slugs = validateProjectSlugs(visibleProjects);
    user.visibleProjects = slugs;
    await user.save();
    emitVisibilityUpdated(String(user._id));
    return res.status(200).json({
      success: true,
      user: {
        id: String(user._id),
        username: user.username,
        email: user.email,
        role: user.role,
        visibleProjects: user.visibleProjects,
      },
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default withEncryption(requireAdmin(handler));
