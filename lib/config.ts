// Configuration file for resume paths and other constants

export const RESUME_FILES: Record<'frontend' | 'mern', string> = {
  frontend: 'Swapnil-Landage-4YEO-FE.pdf',
  mern: 'Swapnil-Landage-4YOE-MERN.pdf',
};

export const MAX_EMAILS_PER_REQUEST = parseInt(
  process.env.MAX_EMAILS_PER_REQUEST || '50'
);

export const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds
export const RATE_LIMIT_MAX_REQUESTS = 10;
