import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import EmailLog from '@/models/EmailLog';
import { sendBatchEmails } from '@/lib/emailService';
import { sanitizeName, filterValidObjectIds } from '@/lib/sanitize';
import path from 'path';

const authenticateApiKey = (req: NextApiRequest): boolean => {
  const apiKey = req.headers['x-api-key'];
  return apiKey === process.env.API_KEY;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // if (!authenticateApiKey(req)) {
  //   return res.status(401).json({ error: 'Invalid API key' });
  // }

  try {
    await dbConnect();

    const rawIds = req.body?.emailIds;
    const jobType = req.body?.jobType;
    const rawSenderName = req.body?.senderName;

    if (!rawIds || !Array.isArray(rawIds) || rawIds.length === 0) {
      return res.status(400).json({ error: 'Please provide email IDs' });
    }

    const emailIds = filterValidObjectIds(rawIds);
    if (emailIds.length === 0) {
      return res.status(400).json({ error: 'No valid email IDs provided' });
    }

    const senderName = rawSenderName != null ? sanitizeName(rawSenderName) : undefined;

    // Fetch email logs
    const emailLogs = await EmailLog.find({
      _id: { $in: emailIds },
      status: 'success',
      followUpSent: false,
    });

    if (emailLogs.length === 0) {
      return res.status(400).json({ error: 'No eligible emails found for follow-up' });
    }

    const emails = emailLogs.map(log => log.email);
    
    // Resume path - map to actual filenames
    const resumeFiles: Record<string, string> = {
      frontend: 'Swapnil-Landage-3YEO-FE.pdf',
      mern: 'Swapnil-Landage-3YOE-MERN.pdf'
    };
    
    const selectedJobType = (jobType === 'frontend' || jobType === 'mern') ? jobType : emailLogs[0].jobType;
    const resumePath = path.join(
      process.cwd(),
      'public',
      'resumes',
      resumeFiles[selectedJobType]
    );

    const results: Array<{ email: string; status: 'success' | 'failed'; error?: string }> = [];

    // Send follow-up emails
    await sendBatchEmails(
      emails,
      {
        jobType: selectedJobType,
        subject: emailLogs[0].subject,
        senderName: senderName || emailLogs[0].senderName,
        resumePath,
        isFollowUp: true,
      },
      async (email, status, error) => {
        results.push({ email, status, error });

        // Update database
        if (status === 'success') {
          try {
            await EmailLog.findOneAndUpdate(
              { email, _id: { $in: emailIds } },
              {
                followUpSent: true,
                followUpSentAt: new Date(),
              }
            );
          } catch (dbError) {
            console.error('Failed to update email log:', dbError);
          }
        }
      }
    );

    const successCount = results.filter(r => r.status === 'success').length;

    return res.status(200).json({
      message: 'Follow-up emails sent',
      status: 200,
      results,
      summary: {
        total: emails.length,
        success: successCount,
        failed: emails.length - successCount,
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
