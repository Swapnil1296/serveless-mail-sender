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
    const searchStr = Array.isArray(search) ? search[0] : search;
    if (searchStr && typeof searchStr === 'string') {
      const trimmed = searchStr.trim().slice(0, 100); // Limit length to prevent regex DoS
      if (trimmed) {
        const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escaped, 'i');
        query.$or = [
          { email: regex },
          { note: regex },
          { phoneNumber: regex },
          { senderName: regex },
        ];
      }
    }

    // Fetch ALL logs matching the query first (for sorting)
    const allLogs = await EmailLog.find(query).lean();
    
    // Sort by priority: phoneNumber > note > followUpSent > sentAt
    const sortedLogs = allLogs.sort((a: any, b: any) => {
      const scoreA = 
        (a.phoneNumber ? 1000 : 0) + 
        (a.note ? 100 : 0) + 
        (a.followUpSent ? 10 : 0);
      
      const scoreB = 
        (b.phoneNumber ? 1000 : 0) + 
        (b.note ? 100 : 0) + 
        (b.followUpSent ? 10 : 0);
      
      // If scores are equal, sort by sentAt (newest first)
      if (scoreB === scoreA) {
        return new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime();
      }
      
      return scoreB - scoreA;
    });
    
    // Apply pagination AFTER sorting
    const rawLogs = sortedLogs.slice(skip, skip + limitNum);
    const total = sortedLogs.length;

    // Normalize: ensure every log has interviewScheduledStatus (some older docs may lack it)
    const logs = rawLogs.map((log: any) => ({
      ...log,
      interviewScheduledStatus: log.interviewScheduledStatus ?? 'not_scheduled',
      phoneNumber: log.phoneNumber ?? '',
      note: log.note ?? '',
    }));

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

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
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
