import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import EmailLog from '@/models/EmailLog';

const authenticateApiKey = (req: NextApiRequest): boolean => {
  const apiKey = req.headers['x-api-key'];
  return apiKey === process.env.API_KEY;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // if (!authenticateApiKey(req)) {
  //   return res.status(401).json({ error: 'Invalid API key' });
  // }

  try {
    await dbConnect();

    // Calculate date 5 days ago
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    // Find emails that:
    // 1. Were sent successfully
    // 2. Were sent 5 or more days ago
    // 3. Haven't received a follow-up yet
    const pendingFollowups = await EmailLog.find({
      status: 'success',
      followUpSent: false,
      sentAt: { $lte: fiveDaysAgo },
    })
      .sort({ sentAt: 1 }) // Oldest first
      .lean();

    return res.status(200).json({
      success: true,
      count: pendingFollowups.length,
      emails: pendingFollowups,
    });
  } catch (error) {
    console.error('Error fetching pending follow-ups:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
