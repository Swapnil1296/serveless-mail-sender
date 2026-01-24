# Quick Reference Card

## 🔑 Login Credentials
```
Username: admin
Password: admin123
```

## 🌐 URLs
- **Landing Page:** http://localhost:3001
- **Email Management:** http://localhost:3001/projects/email-sender
  - Includes Email Sender and Email Logs tabs

## 🚀 Commands
```bash
# Start dev server
npm run dev

# Test login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Check health
curl http://localhost:3001/api/health

# Generate password hash (dev only)
curl -X POST http://localhost:3001/api/auth/hash-password \
  -H "Content-Type: application/json" \
  -d '{"password":"your-password"}'
```

## 📂 Key Files to Edit

### Add Portfolio Content
- `components/PortfolioLanding.tsx`

### Add New Users
- `lib/auth.ts` (USERS array)

### Add New Projects
- `components/DashboardModal.tsx` (projects array)
- `pages/projects/your-project.tsx` (new file)

### Environment Variables
- `.env.local` (JWT_SECRET, etc.)

## 🎨 Theme Colors
```css
Cyan:   #06b6d4
Purple: #8b5cf6
Pink:   #ec4899
```

## ✅ Status
- Server: ✅ Running (port 3001)
- Auth: ✅ Working
- Database: ✅ Connected (MongoDB Atlas)
- Email: ✅ Configured

## 📖 Full Documentation
- `AUTHENTICATION-GUIDE.md` - Complete auth docs
- `SETUP-COMPLETE.md` - Setup summary
- `TROUBLESHOOTING.md` - Common issues
