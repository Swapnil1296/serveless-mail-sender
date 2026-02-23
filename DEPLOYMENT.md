# Production Deployment Checklist

This app is configured as a production-ready PWA. Before shipping:

## 0. Security (Required)

- Set **JWT_SECRET** (32+ characters) or the app will not start in production
- Deploy over **HTTPS** (HSTS is enabled)
- See [SECURITY.md](./SECURITY.md) for full security and privacy measures

## 1. Environment Variables

Ensure these are set in production:

- `NEXT_PUBLIC_SITE_URL` - Full URL of your deployed app (e.g. `https://yourdomain.com`)
- `JWT_SECRET` - Strong secret for auth tokens
- MongoDB connection string (if using)
- Email/Nodemailer config (if using)

## 2. PWA Icons (Optional)

The manifest uses `/cyberpunk_circle_image.png` as the app icon. For better PWA install experience:

- Generate multiple icon sizes (72, 96, 128, 192, 512) from your logo
- Place in `public/icons/` and update `public/manifest.json`
- Use tools: `pwa-asset-generator` or [realfavicongenerator.net](https://realfavicongenerator.net)

## 3. Build & Deploy

```bash
npm install
npm run build
npm start
```

Or use Vercel/Netlify for automatic deploys. The PWA service worker is generated during build and placed in `public/`.

## 4. SSL/HTTPS

PWAs require HTTPS in production. Ensure your host provides it.

## 5. Post-Install

- Run `npm install` to add `next-pwa` if not already installed
- Test install prompt on Chrome/Edge (Add to Home Screen)
- On iOS Safari: Share → Add to Home Screen
