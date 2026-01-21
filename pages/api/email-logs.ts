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

    const { 
      page = '1', 
      limit = '20', 
      status, 
      jobType, 
      followUpSent,
      search 
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build query
    const query: any = {};
    if (status) query.status = status;
    if (jobType) query.jobType = jobType;
    if (followUpSent !== undefined) query.followUpSent = followUpSent === 'true';
    if (search) query.email = { $regex: search, $options: 'i' };

    // Fetch logs with pagination
    const [logs, total] = await Promise.all([
      EmailLog.find(query)
        .sort({ sentAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      EmailLog.countDocuments(query),
    ]);

    // Get statistics
    const stats = await EmailLog.aggregate([
      {
        $group: {
          _id: null,
          totalSent: { $sum: { $cond: [{ $eq: ['$status', 'success'] }, 1, 0] } },
          totalFailed: { $sum: { $cond: [{ $eq: ['$status', 'failed'] }, 1, 0] } },
          followUpsSent: { $sum: { $cond: ['$followUpSent', 1, 0] } },
          frontendEmails: { $sum: { $cond: [{ $eq: ['$jobType', 'frontend'] }, 1, 0] } },
          mernEmails: { $sum: { $cond: [{ $eq: ['$jobType', 'mern'] }, 1, 0] } },
        },
      },
    ]);

    return res.status(200).json({
      logs,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
      stats: stats[0] || {
        totalSent: 0,
        totalFailed: 0,
        followUpsSent: 0,
        frontendEmails: 0,
        mernEmails: 0,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
