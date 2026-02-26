import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, generateToken } from '@/lib/auth';
import { validateEmail, validateUsername, validatePassword } from '@/lib/validation';
import { checkRateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { withEncryption } from '@/lib/withEncryption';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sendJson = (status: number, body: object) => {
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json');
      res.status(status).json(body);
    }
  };

  try {
    if (req.method !== 'POST') {
      return sendJson(405, { error: 'Method not allowed' });
    }

    const clientId = getClientIdentifier(req);
    const { allowed, retryAfter } = checkRateLimit(clientId, 'signup');
    if (!allowed) {
      res.setHeader('Retry-After', String(retryAfter));
      return sendJson(429, {
        error: 'Too many signup attempts. Please try again later.',
        retryAfter,
      });
    }
    const { username, email, password } = req.body ?? {};
    const u = typeof username === 'string' ? username.trim() : '';
    const e = typeof email === 'string' ? email.trim() : '';
    const p = typeof password === 'string' ? password : '';

    const uv = validateUsername(u);
    if (!uv.valid) return sendJson(400, { error: uv.error });

    const ev = validateEmail(e);
    if (!ev.valid) return sendJson(400, { error: ev.error });

    const pv = validatePassword(p);
    if (!pv.valid) return sendJson(400, { error: pv.error });

    await dbConnect();

    const usernameLower = u.toLowerCase();
    const emailLower = e.toLowerCase();

    const existing = await User.findOne({
      $or: [{ username: usernameLower }, { email: emailLower }],
    }).exec();

    if (existing) {
      if (existing.username === usernameLower) {
        return sendJson(409, { error: 'Username already taken' });
      }
      return sendJson(409, { error: 'Email already registered' });
    }

    const passwordHash = await hashPassword(p);
    const newUser = await User.create({
      username: usernameLower,
      email: emailLower,
      passwordHash,
      role: 'user',
      visibleProjects: [],
      failedLoginAttempts: 0,
    });

    const user = {
      id: String(newUser._id),
      username: newUser.username,
      role: newUser.role as 'user',
    };
    const token = generateToken(user);

    return sendJson(201, {
      success: true,
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return sendJson(500, { error: 'Internal server error' });
  }
}

export default withEncryption(handler);
