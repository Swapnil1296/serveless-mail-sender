# Security & Privacy

This PWA is built with user privacy and data protection in mind. Below is what is in place and what you must configure.

## Security Headers (Production)

| Header | Purpose |
|--------|---------|
| **X-Frame-Options: SAMEORIGIN** | Prevents clickjacking |
| **X-Content-Type-Options: nosniff** | Prevents MIME sniffing |
| **Referrer-Policy: strict-origin-when-cross-origin** | Limits referrer leakage |
| **Permissions-Policy** | Disables camera, microphone, geolocation, interest-cohort |
| **Content-Security-Policy** | Restricts script/style/img/connect sources |
| **Strict-Transport-Security** | Enforces HTTPS (production only) |

## Data Protection

- **API routes**: Never cached by the PWA service worker (`NetworkOnly` for `/api/*`) so auth tokens and user data are not stored in the cache.
- **Auth token**: Stored in `localStorage`. Ensure CSP and XSS mitigations are in place. Consider httpOnly cookies for higher security.
- **JWT**: Enforced in production—`JWT_SECRET` must be set and at least 32 characters.

## Input Sanitization

- **lib/sanitize.ts**: Uses `validator.escape` for text, phone, and MCQ fields to prevent XSS and injection.
- **MongoDB**: ObjectIds validated before queries.

## Required Production Configuration

1. **JWT_SECRET**: Set a strong secret (32+ chars) in production. The app will not start without it.
2. **HTTPS**: Deploy behind HTTPS. HSTS is enabled in production.
3. **Environment variables**: Never commit `.env`; use your host's secret management.

## PWA Privacy

- **Scope**: Limited to `/` (same origin).
- **Manifest**: No optional permissions requested (camera, microphone, etc.).
- **Service worker**: Caches static assets and fonts only; API responses are not cached.
