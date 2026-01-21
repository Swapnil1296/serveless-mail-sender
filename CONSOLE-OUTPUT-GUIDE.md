# 📊 Console Output Guide

This guide shows you what to expect in the terminal when running the app.

## 🚀 On Server Startup

When you run `npm run dev`, you'll see:

### ✅ With MongoDB Running:

```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000

═══════════════════════════════════════════════════════
✅ EMAIL SERVICE: READY
   Provider: Gmail
   From: swapnil.dev.connect@gmail.com
═══════════════════════════════════════════════════════

🔄 Connecting to MongoDB...
   URI: mongodb://localhost:27017/email-sender
✅ MongoDB connected successfully!
   Database: email-sender
   Host: localhost
```

### ⚠️ Without MongoDB Running:

```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000

═══════════════════════════════════════════════════════
✅ EMAIL SERVICE: READY
   Provider: Gmail
   From: swapnil.dev.connect@gmail.com
═══════════════════════════════════════════════════════

🔄 Connecting to MongoDB...
   URI: mongodb://localhost:27017/email-sender
❌ MongoDB connection failed!
   Error: connect ECONNREFUSED ::1:27017
   URI: mongodb://localhost:27017/email-sender

💡 Solutions:
   1. Start MongoDB: mongod
   2. Or use MongoDB Atlas (cloud)
   3. Update MONGODB_URI in .env.local
```

### ❌ With Wrong Email Credentials:

```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000

═══════════════════════════════════════════════════════
❌ EMAIL SERVICE: FAILED
   Error: Invalid login: 535-5.7.8 Username and Password not accepted

💡 Solutions:
   1. Check email credentials in .env.local
   2. Use Gmail App Password (not regular password)
   3. Enable 2FA and generate App Password
   4. Visit: https://myaccount.google.com/apppasswords
═══════════════════════════════════════════════════════
```

## 📧 When Sending Emails

### ✅ With MongoDB Connected:

```
═══════════════════════════════════════════════════════
✅ DATABASE STATUS: CONNECTED
   Email logs will be saved to MongoDB
═══════════════════════════════════════════════════════

   💾 Logged to database: recipient1@example.com
   💾 Logged to database: recipient2@example.com

═══════════════════════════════════════════════════════
✅ COMPLETED: 2/2 emails sent
   📊 Logs saved to MongoDB
═══════════════════════════════════════════════════════
```

### ⚠️ Without MongoDB:

```
═══════════════════════════════════════════════════════
⚠️  DATABASE STATUS: DISCONNECTED
   Emails will still send, but won't be logged
═══════════════════════════════════════════════════════

═══════════════════════════════════════════════════════
✅ COMPLETED: 2/2 emails sent
   ⚠️  Logs not saved (MongoDB disconnected)
═══════════════════════════════════════════════════════
```

## 🏥 Health Check Endpoint

When you visit `http://localhost:3000/api/health`:

### ✅ With MongoDB:

```
✅ Health check: Database connected
```

**Response:**
```json
{
  "status": "running",
  "database": {
    "status": "connected",
    "name": "email-sender",
    "host": "localhost",
    "readyState": "connected"
  },
  "resumes": {
    "frontend": { "exists": true, "path": "Swapnil-Landage-3YEO-FE.pdf" },
    "mern": { "exists": true, "path": "Swapnil-Landage-3YOE-MERN.pdf" }
  }
}
```

### ⚠️ Without MongoDB:

```
⚠️  Health check: Database disconnected
```

**Response:**
```json
{
  "status": "running",
  "database": {
    "status": "error",
    "error": "connect ECONNREFUSED ::1:27017"
  },
  "resumes": {
    "frontend": { "exists": true, "path": "Swapnil-Landage-3YEO-FE.pdf" },
    "mern": { "exists": true, "path": "Swapnil-Landage-3YOE-MERN.pdf" }
  }
}
```

## 🌐 Browser Console

When you open the app in your browser (F12 → Console):

### ✅ With MongoDB:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Next.js Bulk Email Sender
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
App Status: Running
API Endpoint: /api/send-bulk-emails
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ MongoDB: Connected
   Database: email-sender
```

### ⚠️ Without MongoDB:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Next.js Bulk Email Sender
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
App Status: Running
API Endpoint: /api/send-bulk-emails
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  MongoDB: Disconnected
   Emails will send, but won't be logged
```

## 🎯 What to Look For

### ✅ Everything Working:
- Email service shows "READY"
- MongoDB shows "connected"
- Resumes show "exists: true"

### ⚠️ MongoDB Not Running (Still Works):
- Email service shows "READY"
- MongoDB shows "DISCONNECTED" or "error"
- Emails will still send successfully
- Just won't be logged to database

### ❌ Email Service Failed:
- Email service shows "FAILED"
- Need to fix email credentials
- Emails won't send until fixed

## 💡 Quick Checks

**Is MongoDB running?**
Look for: `✅ MongoDB connected successfully!`

**Is email service ready?**
Look for: `✅ EMAIL SERVICE: READY`

**Are resumes found?**
Look for: `"exists": true` in health check

## 🔧 How to Fix Issues

### Start MongoDB:
```bash
mongod
```
Then restart the dev server.

### Fix Email Credentials:
1. Get App Password from: https://myaccount.google.com/apppasswords
2. Update `EMAIL_PASSWORD` in `.env.local`
3. Restart dev server

### Check Everything:
```bash
node diagnose.js
```

---

**Now you'll always know the status of your MongoDB connection!** 🎉
