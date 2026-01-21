# 🔧 Troubleshooting Guide

## Internal Server Error (500)

If you're getting an internal server error when sending emails, follow these steps:

### Step 1: Check the Terminal/Console

Look at the Next.js dev server terminal for detailed error messages. The error will show:
- Error name
- Error message
- Stack trace

### Step 2: Common Issues & Solutions

#### Issue 1: MongoDB Connection Failed
**Error:** `MongooseError: connect ECONNREFUSED`

**Solution:**
```bash
# Start MongoDB
mongod
```

**Or use MongoDB Atlas:**
1. Go to https://mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env.local`

**Note:** The app will still work without MongoDB, but emails won't be logged to the database.

#### Issue 2: Email Authentication Failed
**Error:** `Invalid login` or `Username and Password not accepted`

**Solution:**
1. Enable 2FA on your Gmail account
2. Generate an App Password:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password
3. Update `EMAIL_PASSWORD` in `.env.local` with the App Password

#### Issue 3: Resume File Not Found
**Error:** `Resume file not found`

**Solution:**
Check that these files exist:
- `public/resumes/Swapnil-Landage-3YEO-FE.pdf`
- `public/resumes/Swapnil-Landage-3YOE-MERN.pdf`

Run this to verify:
```bash
node test-health.js
```

#### Issue 4: Environment Variables Not Loaded
**Error:** `undefined` for email credentials

**Solution:**
1. Make sure `.env.local` exists in the project root
2. Restart the dev server after changing `.env.local`
3. Check that variables start with `NEXT_PUBLIC_` for client-side access

### Step 3: Test Email Configuration

Run this to test your email setup:
```bash
cd nextjs-serverless-email-app
npm install
node test-email-send.js
```

This will check:
- ✓ Environment variables are set
- ✓ Resume files exist
- ✓ Email credentials are valid

### Step 4: Send a Test Email

Once the configuration test passes, send a real test email:
```bash
node send-test-email.js your-email@example.com
```

### Step 5: Check Server Logs

When you make the API request, watch the terminal for:
```
✓ Database connected
✓ Email sent to: email@example.com
✓ Logged email to database: email@example.com
```

Or warnings:
```
⚠️ Database connection failed: ...
⚠️ Failed to log email to database: ...
```

## Debugging Steps

### 1. Check Environment Variables
```bash
# In the Next.js terminal, you should see on startup:
✓ Email service ready
```

If you see:
```
❌ Email transporter error: ...
```
Then your email credentials are wrong.

### 2. Test API Directly

Use curl or Postman:
```bash
curl -X POST http://localhost:3000/api/send-bulk-emails \
  -H "Content-Type: application/json" \
  -H "X-API-Key: b68d86e078ada03ed69047fdeae4514b2c0f171f168e6506082db581788f2678" \
  -d '{
    "emails": ["your-email@example.com"],
    "jobType": "mern",
    "subject": "Test Email",
    "senderName": "Test Sender"
  }'
```

### 3. Check Response

**Success (200):**
```json
{
  "message": "Bulk email sending completed",
  "status": 200,
  "results": [
    {
      "email": "your-email@example.com",
      "status": "success"
    }
  ],
  "summary": {
    "total": 1,
    "success": 1,
    "failed": 0
  }
}
```

**Error (500):**
```json
{
  "error": "Internal server error",
  "message": "Detailed error message here",
  "details": "Full error details (development only)"
}
```

## Quick Fixes

### Fix 1: Skip MongoDB (Quick Test)
The app now works without MongoDB. If MongoDB is causing issues, just skip it for now. Emails will still send, but won't be logged.

### Fix 2: Use Gmail App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Generate password
3. Update `.env.local`:
   ```
   EMAIL_PASSWORD=your-16-char-app-password
   ```
4. Restart server

### Fix 3: Check Resume Paths
Run:
```bash
node test-health.js
```

Should show:
```
✓ Swapnil-Landage-3YEO-FE.pdf FOUND
✓ Swapnil-Landage-3YOE-MERN.pdf FOUND
```

## Still Having Issues?

1. **Check the browser console** (F12) for frontend errors
2. **Check the terminal** for backend errors
3. **Restart the dev server** after any `.env.local` changes
4. **Clear browser cache** and reload
5. **Try a different browser**

## Get More Help

If you're still stuck, check:
1. Terminal output for detailed error messages
2. Browser console (F12) for frontend errors
3. Network tab (F12) to see the actual API response

The error message in the terminal will tell you exactly what's wrong!
