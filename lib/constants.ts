/**
 * Project slugs used for role-based visibility.
 * Admin sees all; users see only projects in their visibleProjects list.
 */
export const PROJECT_SLUGS = [
  'email-sender',
  'interview-prep',
  'interview-quiz',
  'format-converter',
  'resume-creator',
  'quiz-hub',
  'naukari-scraper',
  'expense-tracker',
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

export const ROLES = ['admin', 'user'] as const;
export type Role = (typeof ROLES)[number];

/** Min password length for signup/change-password */
export const PASSWORD_MIN_LENGTH = 8;
/** Max lengths for validation */
export const USERNAME_MAX_LENGTH = 64;
export const EMAIL_MAX_LENGTH = 254;
export const PASSWORD_MAX_LENGTH = 128;

/** Default admin env keys (optional; used to seed first admin if no admin exists) */
export const DEFAULT_ADMIN_USERNAME_KEY = 'DEFAULT_ADMIN_USERNAME';
export const DEFAULT_ADMIN_PASSWORD_KEY = 'DEFAULT_ADMIN_PASSWORD';
