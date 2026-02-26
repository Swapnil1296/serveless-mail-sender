import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PROJECT_SLUGS,
} from './constants';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-z0-9_.-]+$/;

export function validateEmail(email: string): { valid: boolean; error?: string } {
  const s = (email || '').trim().toLowerCase();
  if (!s) return { valid: false, error: 'Email is required' };
  if (s.length > EMAIL_MAX_LENGTH) return { valid: false, error: 'Email too long' };
  if (!EMAIL_REGEX.test(s)) return { valid: false, error: 'Invalid email format' };
  return { valid: true };
}

export function validateUsername(username: string): { valid: boolean; error?: string } {
  const s = (username || '').trim().toLowerCase();
  if (!s) return { valid: false, error: 'Username is required' };
  if (s.length > USERNAME_MAX_LENGTH) return { valid: false, error: 'Username too long' };
  if (!USERNAME_REGEX.test(s)) {
    return { valid: false, error: 'Username can only contain letters, numbers, dots, underscores, and hyphens' };
  }
  if (s.length < 2) return { valid: false, error: 'Username must be at least 2 characters' };
  return { valid: true };
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (!password) return { valid: false, error: 'Password is required' };
  if (password.length < PASSWORD_MIN_LENGTH) {
    return { valid: false, error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters` };
  }
  if (password.length > PASSWORD_MAX_LENGTH) {
    return { valid: false, error: 'Password too long' };
  }
  return { valid: true };
}

export function validateProjectSlugs(slugs: unknown): string[] {
  if (!Array.isArray(slugs)) return [];
  return slugs.filter((s): s is string => typeof s === 'string' && PROJECT_SLUGS.includes(s as any));
}
