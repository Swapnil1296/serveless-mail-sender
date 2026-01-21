import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import EmailLog from '@/models/EmailLog';
import { validateEmail, sanitizeInput, sendBatchEmails } from '@/lib/emailService';
import path from 'path';

const MAX_EMAILS = parseInt(process.env.MAX_EMAILS_PER_REQUEST || '50');

// Rate limiting map (in-memory, use Redis for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 }); // 1 hour
    return true;
  }

  if (limit.count >= 10) {
    return false;
  }

  limit.count++;
  return true;
};

const authenticateApiKey = (req: NextApiRequest): boolean => {
  const apiKey = req.headers['x-api-key'];
  return apiKey === process.env.API_KEY;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // API Key authentication
  if (!authenticateApiKey(req)) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  // Rate limiting
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
              req.socket.remoteAddress || 
              'unknown';
  
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  try {
    // Try to connect to database
    let dbConnected = false;
    try {
      await dbConnect();
      dbConnected = true;
      console.log('');
      console.log('═══════════════════════════════════════════════════════');
      console.log('✅ DATABASE STATUS: CONNECTED');
      console.log('   Email logs will be saved to MongoDB');
      console.log('═══════════════════════════════════════════════════════');
      console.log('');
    } catch (dbError) {
      console.log('');
      console.log('═══════════════════════════════════════════════════════');
      console.log('⚠️  DATABASE STATUS: DISCONNECTED');
      console.log('   Emails will still send, but won\'t be logged');
      console.log('═══════════════════════════════════════════════════════');
      console.log('');
      // Continue without database logging
    }

    const { emails, jobType, subject, senderName } = req.body;

    // Validation
    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ error: 'Please provide valid email addresses' });
    }

    if (emails.length > MAX_EMAILS) {
      return res.status(400).json({ error: `Maximum ${MAX_EMAILS} emails allowed per request` });
    }

    const invalidEmails = emails.filter(email => !validateEmail(email));
    if (invalidEmails.length > 0) {
      return res.status(400).json({ 
        error: 'Invalid email addresses detected',
        invalidEmails: invalidEmails.slice(0, 5),
      });
    }

    if (!jobType || !['frontend', 'mern'].includes(jobType)) {
      return res.status(400).json({ error: 'Invalid job type' });
    }

    const sanitizedSubject = sanitizeInput(subject) || 
      `Application for ${jobType === 'frontend' ? 'Frontend' : 'MERN Stack'} Developer Position`;
    const sanitizedSenderName = sanitizeInput(senderName) || 'Applicant';

    // Resume path - map to actual filenames
    const resumeFiles: Record<string, string> = {
      frontend: 'Swapnil-Landage-3YEO-FE.pdf',
      mern: 'Swapnil-Landage-3YOE-MERN.pdf'
    };
    
    const resumePath = path.join(
      process.cwd(),
      'public',
      'resumes',
      resumeFiles[jobType]
    );

    const results: Array<{ email: string; status: 'success' | 'failed'; error?: string }> = [];

    // Send emails with progress tracking
    await sendBatchEmails(
      emails,
      {
        jobType,
        subject: sanitizedSubject,
        senderName: sanitizedSenderName,
        resumePath,
      },
      async (email, status, error) => {
        results.push({ email, status, error });

        // Log to database (optional - won't fail if DB is down)
        if (dbConnected) {
          try {
            await EmailLog.create({
              email,
              jobType,
              subject: sanitizedSubject,
              senderName: sanitizedSenderName,
              status,
              errorMessage: error,
              sentAt: new Date(),
              followUpSent: false,
              metadata: {
                ipAddress: ip,
                userAgent: req.headers['user-agent'],
              },
            });
            console.log(`   💾 Logged to database: ${email}`);
          } catch (dbError) {
            console.error(`   ⚠️  Failed to log to database: ${email}`);
            // Continue without database logging - don't fail the email send
          }
        }
      }
    );

    const successCount = results.filter(r => r.status === 'success').length;

    console.log('');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`✅ COMPLETED: ${successCount}/${emails.length} emails sent`);
    if (dbConnected) {
      console.log('   📊 Logs saved to MongoDB');
    } else {
      console.log('   ⚠️  Logs not saved (MongoDB disconnected)');
    }
    console.log('═══════════════════════════════════════════════════════');
    console.log('');

    return res.status(200).json({
      message: 'Bulk email sending completed',
      status: 200,
      results,
      summary: {
        total: emails.length,
        success: successCount,
        failed: emails.length - successCount,
      },
    });
  } catch (error) {
    console.error('❌ Error in send-bulk-emails:', error);
    
    // Detailed error logging
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
    });
  }
}
