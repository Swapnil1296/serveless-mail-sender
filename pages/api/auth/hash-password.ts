// Utility endpoint to generate password hashes
// Remove this in production or protect it
import type { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Not available in production' });
  }

  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const hash = await hashPassword(password);

    return res.status(200).json({
      password,
      hash,
    });
  } catch (error) {
    console.error('Hash error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
