/**
 * Simple in-memory rate limit for auth endpoints (login/signup).
 * Per-instance only; in serverless each instance has its own map.
 * For production at scale, consider Redis or Upstash.
 */

const windowMs = 15 * 60 * 1000; // 15 minutes
const maxAttempts = 10;

const attempts = new Map<string, { count: number; resetAt: number }>();

function getKey(identifier: string, action: string): string {
  return `${action}:${identifier}`;
}

function cleanup(): void {
  const now = Date.now();
  for (const [key, v] of attempts.entries()) {
    if (v.resetAt <= now) attempts.delete(key);
  }
}

export function checkRateLimit(identifier: string, action: string): { allowed: boolean; retryAfter?: number } {
  cleanup();
  const key = getKey(identifier, action);
  const now = Date.now();
  const rec = attempts.get(key);

  if (!rec) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (rec.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (rec.count >= maxAttempts) {
    return { allowed: false, retryAfter: Math.ceil((rec.resetAt - now) / 1000) };
  }

  rec.count += 1;
  return { allowed: true };
}

export function getClientIdentifier(req: { headers?: Record<string, string | string[] | undefined> }): string {
  const forwarded = req.headers?.['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : (Array.isArray(forwarded) ? forwarded[0] : undefined) ?? req.headers?.['x-real-ip'];
  const ipStr = typeof ip === 'string' ? ip : Array.isArray(ip) ? ip[0] : undefined;
  return ipStr || 'unknown';
}
