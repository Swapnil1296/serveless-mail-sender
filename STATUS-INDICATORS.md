# 🚦 Status Indicators - Quick Reference

## Where to Check MongoDB Status

### 1️⃣ Terminal (Server Console)

**On Startup:**
```
✅ MongoDB connected successfully!     ← MongoDB is running
❌ MongoDB connection failed!          ← MongoDB is NOT running
```

**When Sending Emails:**
```
✅ DATABASE STATUS: CONNECTED          ← Logs will be saved
⚠️  DATABASE STATUS: DISCONNECTED      ← Emails send, no logs
```

### 2️⃣ Browser Console (F12)

**When Page Loads:**
```
✅ MongoDB: Connected                  ← Database is working
⚠️  MongoDB: Disconnected              ← Database is down
```

### 3️⃣ UI (Visual Indicators)

**On the main page, you'll see:**

✅ **MongoDB Connected:**
```
🟢 SYSTEM ONLINE    🟢 DB CONNECTED (email-sender)
```

⚠️ **MongoDB Disconnected:**
```
🟢 SYSTEM ONLINE    🟡 DB ERROR
```

### 4️⃣ Health API

**Visit:** `http://localhost:3000/api/health`

**Connected:**
```json
{
  "database": {
    "status": "connected",
    "name": "email-sender"
  }
}
```

**Disconnected:**
```json
{
  "database": {
    "status": "error",
    "error": "connect ECONNREFUSED"
  }
}
```

## 🎯 Quick Status Check

Run this command:
```bash
node diagnose.js
```

Or check the health endpoint:
```bash
curl http://localhost:3000/api/health
```

## 📊 Status Summary Table

| Indicator | MongoDB Running | MongoDB Stopped |
|-----------|----------------|-----------------|
| **Terminal** | ✅ Connected | ❌ Failed |
| **Browser Console** | ✅ Connected | ⚠️ Disconnected |
| **UI Badge** | 🟢 DB CONNECTED | 🟡 DB ERROR |
| **Emails Send?** | ✅ Yes + Logged | ✅ Yes (no logs) |
| **View Logs Page?** | ✅ Works | ❌ Won't load data |
| **Follow-ups?** | ✅ Works | ❌ Won't work |

## 🔍 What Each Status Means

### ✅ Connected
- MongoDB is running
- Emails are logged to database
- Can view logs page
- Can send follow-ups
- Full functionality

### ⚠️ Disconnected
- MongoDB is NOT running
- Emails still send successfully
- Logs are NOT saved
- Can't view logs page
- Can't send follow-ups
- Limited functionality

### ❌ Failed
- Something is wrong
- Check terminal for error details
- Fix the issue and restart

## 💡 Pro Tips

1. **Always check the terminal first** - Most detailed info
2. **Browser console shows client-side status** - Good for debugging
3. **UI indicators are visual** - Quick glance status
4. **Health API is programmatic** - For automation/monitoring

## 🚀 Start MongoDB

If you see "Disconnected" or "Failed":

```bash
# In a new terminal
mongod
```

Then refresh your browser or restart the dev server.

---

**Now you have 4 ways to check MongoDB status!** 🎉
