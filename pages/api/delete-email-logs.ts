import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import EmailLog from '@/models/EmailLog';
import { filterValidObjectIds } from '@/lib/sanitize';

const authenticateApiKey = (req: NextApiRequest): boolean => {
  const apiKey = req.headers['x-api-key'];
  return apiKey === process.env.API_KEY;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // if (!authenticateApiKey(req)) {
  //   return res.status(401).json({ error: 'Invalid API key' });
  // }

  try {
    await dbConnect();

    const rawIds = req.body?.emailIds;
    if (!rawIds || !Array.isArray(rawIds) || rawIds.length === 0) {
      return res.status(400).json({ error: 'Email IDs are required' });
    }

    const emailIds = filterValidObjectIds(rawIds);
    if (emailIds.length === 0) {
      return res.status(400).json({ error: 'No valid email IDs provided' });
    }

    // Delete the email logs
    const result = await EmailLog.deleteMany({
      _id: { $in: emailIds },
    });

    return res.status(200).json({
      success: true,
      deletedCount: result.deletedCount,
      message: `Successfully deleted ${result.deletedCount} email log(s)`,
    });
  } catch (error) {
    console.error('Error deleting email logs:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
