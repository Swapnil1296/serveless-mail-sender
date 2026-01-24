import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// User credentials (in production, store in database)
const USERS = [
  {
    id: '1',
    username: 'admin',
    // Password: 'admin123' (hashed)
    passwordHash: '$2b$10$iAN6tRzcnAzHX2PgBCmrhuM/MQWBBErIzNI4UKJlgHnwA3aZAbsxK',
    role: 'admin',
  },
];

export interface User {
  id: string;
  username: string;
  role: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (user: User): string => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '30d' } // 1 month
  );
};

export const verifyToken = (token: string): User | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as User;
    return decoded;
  } catch {
    return null;
  }
};

export const authenticateUser = async (username: string, password: string): Promise<User | null> => {
  const user = USERS.find(u => u.username === username);
  if (!user) return null;

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) return null;

  return {
    id: user.id,
    username: user.username,
    role: user.role,
  };
};

export const requireAuth = (handler: Function) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.auth_token || req.headers.authorization?.replace('Bearer ', '');

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
