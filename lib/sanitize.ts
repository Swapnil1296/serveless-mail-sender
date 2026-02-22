import validator from 'validator';
import mongoose from 'mongoose';

/** Max lengths for DB fields */
const LIMITS = {
  note: 2000,
  phoneNumber: 30,
  senderName: 100,
  mcqQuestion: 2000,
  mcqOption: 500,
  mcqTopic: 100,
  mcqExplanation: 2000,
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

/** Sanitize MCQ question text */
export function sanitizeMcqQuestion(input: unknown): string {
  return sanitizeText(input, LIMITS.mcqQuestion);
}

/** Sanitize MCQ option text */
export function sanitizeMcqOption(input: unknown): string {
  return sanitizeText(input, LIMITS.mcqOption);
}

/** Sanitize MCQ topic */
export function sanitizeMcqTopic(input: unknown): string {
  return sanitizeText(input, LIMITS.mcqTopic);
}

/** Sanitize MCQ explanation (shown when answer is wrong) */
export function sanitizeMcqExplanation(input: unknown): string {
  return sanitizeText(input, LIMITS.mcqExplanation);
}

/**
 * Decode HTML entities for display (e.g. validator.escape produces &#x2F; for /).
 * Use when rendering sanitized text as plain text in React.
 */
export function decodeHtmlEntities(str: string): string {
  if (!str || typeof str !== 'string') return str;
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}
