import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';
import { DEFAULT_ADMIN_USERNAME_KEY, DEFAULT_ADMIN_PASSWORD_KEY } from './constants';

/**
 * Ensures at least one admin exists. If no admin in DB, creates one from env:
 * DEFAULT_ADMIN_USERNAME, DEFAULT_ADMIN_PASSWORD.
 * Safe to call on every login/startup; only creates when count(admin) === 0.
 */
export async function ensureAdminExists(): Promise<void> {
  await dbConnect();
  const adminCount = await User.countDocuments({ role: 'admin' }).exec();
  if (adminCount > 0) return;

  const username = process.env[DEFAULT_ADMIN_USERNAME_KEY]?.trim().toLowerCase();
  const password = process.env[DEFAULT_ADMIN_PASSWORD_KEY];

  if (!username || !password) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('No default admin credentials (DEFAULT_ADMIN_USERNAME / DEFAULT_ADMIN_PASSWORD). Create an admin manually or set env.');
    }
    return;
  }

  if (password.length < 8) {
    console.warn('DEFAULT_ADMIN_PASSWORD must be at least 8 characters; skipping seed.');
    return;
  }

  const existing = await User.findOne({ username }).exec();
  if (existing) {
    await User.updateOne({ _id: existing._id }, { $set: { role: 'admin' } }).exec();
    return;
  }

  const passwordHash = await hashPassword(password);
  await User.create({
    username,
    email: `${username}@admin.local`,
    passwordHash,
    role: 'admin',
    visibleProjects: [],
    failedLoginAttempts: 0,
  });
}
