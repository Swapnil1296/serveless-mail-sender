import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import InterviewUser from '@/models/InterviewUser';
import { requireAuth } from '@/lib/auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const user = (req as any).user;
  const username = user?.username;
  if (!username) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    let profile = await InterviewUser.findOne({ username }).lean();
    if (!profile) {
      const created = await InterviewUser.create({ username });
      profile = JSON.parse(JSON.stringify(created));
    }
    return res.json(profile);
  }

  if (req.method === 'PATCH') {
    const { name, experienceLevel, preferredStack, targetCompanies } = req.body;
    const update: Record<string, unknown> = {};
    if (name !== undefined) update.name = name;
    if (experienceLevel !== undefined) update.experienceLevel = experienceLevel;
    if (preferredStack !== undefined) update.preferredStack = preferredStack;
    if (targetCompanies !== undefined) update.targetCompanies = targetCompanies;

    const profile = await InterviewUser.findOneAndUpdate(
      { username },
      { $set: update },
      { new: true }
    ).lean();
    if (!profile) {
      await InterviewUser.create({ username, ...update });
      return res.json(await InterviewUser.findOne({ username }).lean());
    }
    return res.json(profile);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default requireAuth(handler);
