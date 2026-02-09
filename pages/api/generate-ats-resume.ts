import type { NextApiRequest, NextApiResponse } from 'next';
import { generateResumePipeline, type ResumeContent } from '@/lib/aiService';

// Rate limiting (in-memory)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

function getClientIp(req: NextApiRequest): string {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown'
  );
}

function sanitize(text: string, maxLen: number): string {
  return String(text || '').slice(0, maxLen).trim();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return res
      .status(429)
      .json({ error: 'Too many requests. Try again in an hour.' });
  }

  // Ensure at least one AI provider is configured
  if (!process.env.DEEPSEEK_API_KEY && !process.env.OPENAI_API_KEY && !process.env.GEMINI_API_KEY) {
    return res.status(503).json({
      error: 'No AI provider configured. Set DEEPSEEK_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY in .env.local',
    });
  }

  try {
    const { jobDescriptions, userContext } = req.body;

    if (
      !jobDescriptions ||
      !Array.isArray(jobDescriptions) ||
      jobDescriptions.length < 1
    ) {
      return res.status(400).json({
        error: 'Please provide at least one job description.',
      });
    }

    const descriptions = jobDescriptions
      .map((j: unknown) => sanitize(String(j || ''), 3000))
      .filter((d) => d.length > 0);

    if (descriptions.length === 0) {
      return res.status(400).json({ error: 'Please provide at least one non-empty job description.' });
    }

    const ctx = sanitize(String(userContext || ''), 2000) || 
      'Experienced professional seeking opportunities. Adapt the resume structure as appropriate.';

    // Full pipeline: skills extraction then resume generation. If one provider fails (token/rate limit), the other takes over.
    const resume: ResumeContent = await generateResumePipeline(descriptions, ctx);

    return res.status(200).json({ success: true, resume });
  } catch (error) {
    console.error('[generate-ats-resume]', error);
    const msg = error instanceof Error ? error.message : 'Generation failed';
    return res.status(500).json({
      error: 'Resume generation failed',
      message: msg,
    });
  }
}
