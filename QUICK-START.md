# 🚀 Quick Start - 3 Steps

## ✅ Pre-flight Check

Your setup is **READY**:
- ✓ Resumes are in place (120KB each)
- ✓ Environment variables configured
- ✓ Code is ready to run

## Step 1: Install Dependencies (First Time Only)

```bash
cd nextjs-serverless-email-app
npm install
```

## Step 2: Start MongoDB

**Choose ONE option:**

### Option A: Local MongoDB (Fastest for testing)
```bash
mongod
```
Leave this terminal open.

### Option B: MongoDB Atlas (Best for production)
1. Go to https://mongodb.com/cloud/atlas
2. Create free cluster (takes 5 minutes)
3. Get connection string
4. Update `MONGODB_URI` in `.env.local`

**Test MongoDB Connection:**
```bash
node check-mongodb.js
```

## Step 3: Start the App

**Windows:**
```bash
start.bat
```

**Mac/Linux:**
```bash
npm run dev
```

**Open:** http://localhost:3000

---

## 🎯 What You'll See

### Home Page (http://localhost:3000)
- Send bulk emails
- Choose Frontend or MERN job type
- Real-time progress tracking

### Logs Page (http://localhost:3000/logs)
- View all sent emails
- Filter and search
- Send follow-up emails
- Statistics dashboard

### Health Check (http://localhost:3000/api/health)
```json
{
  "status": "running",
  "database": "connected",
  "resumes": {
    "frontend": { "exists": true },
    "mern": { "exists": true }
  }
}
```

---

## 🐛 Troubleshooting

### Health Check Shows "Database: error"
**Problem:** MongoDB is not running

**Solution:**
```bash
# Start MongoDB
mongod

# Or use MongoDB Atlas (cloud)
```

### "Cannot find module"
**Problem:** Dependencies not installed

**Solution:**
```bash
npm install
```

### Port 3000 in use
**Problem:** Another app is using port 3000

**Solution:**
```bash
npm run dev -- -p 3001
# Then open http://localhost:3001
```

---

## 📧 Send Your First Email

1. **Start the app** (see Step 3 above)
2. **Open** http://localhost:3000
3. **Enter your name:** Swapnil Landage
4. **Add test email:** your-email@gmail.com
5. **Click:** "Frontend Dev" or "MERN Dev"
6. **Check your inbox!** 📬

---

## 🎉 You're All Set!

The health check will work once you:
1. ✓ Install dependencies (`npm install`)
2. ✓ Start MongoDB (`mongod` or use Atlas)
3. ✓ Start the dev server (`npm run dev`)

**Everything else is already configured!** 🚀
