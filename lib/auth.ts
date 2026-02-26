import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import type { UserRole } from '@/models/User';

const JWT_SECRET =
  process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? '' : 'dev-secret-not-for-production');
if (process.env.NODE_ENV === 'production' && (!JWT_SECRET || JWT_SECRET.length < 32)) {
  throw new Error('JWT_SECRET must be set and at least 32 characters in production');
}

/** User shape in JWT and API responses (no passwordHash, no internal fields) */
export interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
}

/** @deprecated Use AuthUser */
export type User = AuthUser;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (user: AuthUser): string => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
};

export const verifyToken = (token: string): AuthUser | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return decoded;
  } catch {
    return null;
  }
};

/** Get token from request (cookie or Authorization header) */
export function getTokenFromRequest(req: NextApiRequest): string | null {
  return req.cookies?.auth_token || req.headers.authorization?.replace(/^Bearer\s+/i, '') || null;
}

/**
 * Authenticate by username or email + password against DB.
 * Handles lockout: if user is locked, returns null and does not reveal lock.
 */
export const authenticateUser = async (
  usernameOrEmail: string,
  password: string
): Promise<AuthUser | null> => {
  await dbConnect();
  const normalized = usernameOrEmail.trim().toLowerCase();
  if (!normalized || !password) return null;

  const user = await User.findOne({
    $or: [{ username: normalized }, { email: normalized }],
  }).exec();

  if (!user) return null;

  if (user.lockUntil && user.lockUntil > new Date()) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    const maxAttempts = 5;
    const lockMinutes = 15;
    const updates: { failedLoginAttempts: number; lockUntil?: Date } = {
      failedLoginAttempts: user.failedLoginAttempts + 1,
    };
    if (user.failedLoginAttempts + 1 >= maxAttempts) {
      updates.lockUntil = new Date(Date.now() + lockMinutes * 60 * 1000);
    }
    await User.updateOne({ _id: user._id }, { $set: updates }).exec();
    return null;
  }

  if (user.failedLoginAttempts > 0 || user.lockUntil) {
    await User.updateOne(
      { _id: user._id },
      { $set: { failedLoginAttempts: 0, lockUntil: null } }
    ).exec();
  }

  return {
    id: String(user._id),
    username: user.username,
    role: user.role,
  };
};

export const requireAuth = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = verifyToken(token);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    (req as any).user = user;
    return handler(req, res);
  };
};

export const requireAdmin = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = verifyToken(token);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    (req as any).user = user;
    return handler(req, res);
  };
};
