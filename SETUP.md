# Quick Setup Guide

## ✅ Status Check

Your resumes are correctly placed:
- ✓ Frontend Resume: `Swapnil-Landage-4YEO-FE.pdf` (120.60 KB)
- ✓ MERN Resume: `Swapnil-Landage-4YOE-MERN.pdf` (119.39 KB)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd nextjs-serverless-email-app
npm install
```

### 2. Environment Variables
Your `.env.local` is already configured with:
- ✓ Email credentials
- ✓ API key
- ✓ MongoDB URI (local)

### 3. Start MongoDB (Required)

**Option A: Local MongoDB**
```bash
# In a new terminal
mongod
```

**Option B: MongoDB Atlas (Recommended for production)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env.local`

### 4. Start the Development Server
```bash
npm run dev
```

### 5. Open Your Browser
```
http://localhost:3000
```

## 🔍 Troubleshooting

### Health Check Failing?

**Check 1: Is the server running?**
```bash
npm run dev
```

**Check 2: Is MongoDB running?**
```bash
# Test MongoDB connection
mongosh
# or
mongo
```

If MongoDB is not installed:
- Windows: Download from https://www.mongodb.com/try/download/community
- Mac: `brew install mongodb-community`
- Linux: `sudo apt-get install mongodb`

**Check 3: Test the health endpoint**
Once the server is running, visit:
```
http://localhost:3000/api/health
```

You should see:
```json
{
  "status": "running",
  "database": "connected",
  "resumes": {
    "frontend": {
      "exists": true,
      "path": "Swapnil-Landage-4YEO-FE.pdf"
    },
    "mern": {
      "exists": true,
      "path": "Swapnil-Landage-4YOE-MERN.pdf"
    }
  }
}
```

### Common Issues

**Issue: "Cannot connect to MongoDB"**
- Solution: Start MongoDB with `mongod` command
- Or use MongoDB Atlas (cloud) instead

**Issue: "API key invalid"**
- Solution: Make sure `.env.local` has both `API_KEY` and `NEXT_PUBLIC_API_KEY`

**Issue: "Resume not found"**
- Solution: Resumes are already in place, just restart the server

**Issue: "Port 3000 already in use"**
- Solution: Kill the process or use a different port:
  ```bash
  npm run dev -- -p 3001
  ```

## 📝 Testing the App

### 1. Send Test Email
1. Go to http://localhost:3000
2. Enter your name
3. Add a test email (your own email)
4. Click "Frontend Dev" or "MERN Dev"
5. Check your inbox!

### 2. View Logs
1. Go to http://localhost:3000/logs
2. See all sent emails
3. Filter and search
4. Select emails and send follow-ups

## 🎯 Next Steps

1. **Test locally** - Send a test email to yourself
2. **Check logs** - Verify the email was logged in MongoDB
3. **Try follow-ups** - Send a follow-up email
4. **Deploy** - Deploy to Vercel when ready

## 📄 ATS Resume Creator

The Resume Creator uses AI to generate ATS-friendly resumes from job descriptions. Configure at least one AI provider (tried in order: DeepSeek → OpenAI → Gemini):

**DeepSeek (recommended – free, generous limits)**
- Get key: https://platform.deepseek.com/
- Add to `.env.local`: `DEEPSEEK_API_KEY=sk-...`
- Optional: `DEEPSEEK_MODEL=deepseek-chat` (default)

**OpenAI**
- Get key: https://platform.openai.com/api-keys
- Add to `.env.local`: `OPENAI_API_KEY=sk-...`
- Optional: `OPENAI_MODEL=gpt-3.5-turbo` (default)

**Google Gemini (free tier, rate limits apply)**
- Get key: https://aistudio.google.com/apikey
- Add to `.env.local`: `GEMINI_API_KEY=...`
- Optional: `GEMINI_MODEL=gemini-2.0-flash` (default)

If one provider fails (quota, token limit, etc.), the next configured provider is used automatically.

## 🚀 Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `ACTIVE_EMAIL_ADDRESS`
   - `EMAIL_PASSWORD`
   - `EMAIL_SENDER_ADDRESS`
   - `MONGODB_URI` (use MongoDB Atlas)
   - `API_KEY`
   - `NEXT_PUBLIC_API_KEY`
   - `MAX_EMAILS_PER_REQUEST`
   - `OPENAI_API_KEY` or `GEMINI_API_KEY` (for Resume Creator)
4. Deploy!

## 📧 Need Help?

If you're still having issues:
1. Check the terminal for error messages
2. Check browser console (F12)
3. Verify all environment variables are set
4. Make sure MongoDB is running
5. Try restarting the dev server

---

**Everything is configured correctly! Just run `npm run dev` and start sending emails! 🚀**
