import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticateUser, generateToken } from '@/lib/auth';
import { ensureAdminExists } from '@/lib/seedAdmin';
import { checkRateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { withEncryption } from '@/lib/withEncryption';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientId = getClientIdentifier(req);
  const { allowed, retryAfter } = checkRateLimit(clientId, 'login');
  if (!allowed) {
    res.setHeader('Retry-After', String(retryAfter));
    return res.status(429).json({
      error: 'Too many login attempts. Please try again later.',
      retryAfter,
    });
  }

  try {
    await ensureAdminExists();
  } catch (e) {
    console.error('Seed admin error:', e);
  }

  try {
    const { username, password } = req.body ?? {};
    const usernameOrEmail = typeof username === 'string' ? username.trim() : '';

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ error: 'Username/email and password are required' });
    }

    const user = await authenticateUser(usernameOrEmail, password);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withEncryption(handler);
