import validator from 'validator';
import mongoose from 'mongoose';

/** Max lengths for DB fields */
const LIMITS = {
  note: 2000,
  phoneNumber: 30,
  senderName: 100,
} as const;

/**
 * Sanitize text input: trim, escape HTML/XSS, enforce max length.
 * Use for note, generic text fields.
 */
export function sanitizeText(input: unknown, maxLength: number = 1000): string {
  if (input == null) return '';
  const str = String(input).trim();
  const escaped = validator.escape(str);
  return escaped.slice(0, maxLength);
}

/**
 * Sanitize phone number: allow digits, spaces, +, -, ( ) only.
 * Use for phoneNumber field.
 */
export function sanitizePhone(input: unknown): string {
  if (input == null) return '';
  const str = String(input).trim();
  const cleaned = str.replace(/[^\d+\-()\s]/g, '');
  return cleaned.slice(0, LIMITS.phoneNumber);
}

/**
 * Sanitize name/sender field: trim, escape, limit length.
 */
export function sanitizeName(input: unknown): string {
  return sanitizeText(input, LIMITS.senderName);
}

/**
 * Validate MongoDB ObjectId to prevent injection.
 */
export function isValidObjectId(id: unknown): id is string {
  if (typeof id !== 'string') return false;
  return mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id;
}

/**
 * Filter array to only valid ObjectIds.
 */
export function filterValidObjectIds(ids: unknown[]): string[] {
  return ids.filter((id): id is string => isValidObjectId(id));
}
