# Next.js Serverless Bulk Email Sender

A modern, serverless bulk email application built with Next.js, featuring MongoDB integration, follow-up email functionality, and optimized API performance.

## 🚀 New Features

### 1. **MongoDB Database Integration**
- All sent emails are logged with timestamps
- Track email status (success/failed)
- Store sender information and job types
- Query and filter email history

### 2. **Follow-up Email System**
- Send follow-up emails to previously contacted recipients
- Track which emails have received follow-ups
- Bulk follow-up sending with selection
- Separate follow-up email templates

### 3. **Email Logs Dashboard**
- View all sent emails with filtering options
- Search by email address
- Filter by status, job type, and follow-up status
- Pagination for large datasets
- Real-time statistics dashboard

### 4. **API Response Optimization**
- Connection pooling for email transporter
- Efficient database queries with indexes
- Cached database connections
- Rate limiting to prevent abuse
- Parallel processing where possible

### 5. **Enhanced Error Handling**
- Detailed error messages in frontend
- Input validation with visual feedback
- Graceful error recovery
- Better user notifications

### 6. **Additional Improvements**
- TypeScript for type safety
- Serverless architecture (no server needed)
- API key authentication
- Health check endpoint with DB status
- Responsive design
- Modern UI with Tailwind CSS

## 📋 Prerequisites

- Node.js 16+ installed
- MongoDB installed locally OR MongoDB Atlas account
- Gmail account with App Password

## 🛠️ Installation

1. **Clone or navigate to the project folder:**
   ```bash
   cd nextjs-serverless-email-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Edit `.env.local` file with your credentials:
   ```env
   # Email Configuration
   ACTIVE_EMAIL_ADDRESS=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_SENDER_ADDRESS=your-email@gmail.com

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/email-sender
   # For MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/email-sender

   # API Security
   API_KEY=your-secure-api-key-here
   NEXT_PUBLIC_API_KEY=your-secure-api-key-here

   # App Configuration
   NODE_ENV=development
   MAX_EMAILS_PER_REQUEST=50
   ```

4. **Add resume files:**
   
   Your resumes are already in place:
   - ✓ `public/resumes/Swapnil-Landage-4YEO-FE.pdf`
   - ✓ `public/resumes/Swapnil-Landage-4YOE-MERN.pdf`
   
   (The app is configured to use these filenames)

5. **Start MongoDB (if using local):**
   ```bash
   mongod
   ```

6. **Run the development server:**
   ```bash
   npm run dev
   ```

7. **Open your browser:**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
nextjs-serverless-email-app/
├── components/
│   ├── BulkEmailSender.tsx      # Main email sending component
│   └── EmailLogsViewer.tsx      # Email logs dashboard
├── lib/
│   ├── emailService.ts          # Email sending logic
│   └── mongodb.ts               # Database connection
├── models/
│   └── EmailLog.ts              # MongoDB schema
├── pages/
│   ├── api/
│   │   ├── send-bulk-emails.ts  # Bulk email API
│   │   ├── send-followup.ts     # Follow-up email API
│   │   ├── email-logs.ts        # Logs retrieval API
│   │   └── health.ts            # Health check API
│   ├── _app.tsx                 # App wrapper with navigation
│   ├── index.tsx                # Home page (send emails)
│   └── logs.tsx                 # Logs page
├── public/
│   └── resumes/                 # Resume PDF files
├── styles/
│   └── globals.css              # Global styles
├── .env.local                   # Environment variables
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies
└── tsconfig.json                # TypeScript config
```

## 🎯 Usage

### Sending Bulk Emails

1. Navigate to the home page
2. Enter your name
3. (Optional) Enter a custom subject
4. Add recipient email addresses (comma-separated)
5. Click either "Frontend Dev" or "MERN Dev" button
6. Monitor the progress and results

### Viewing Email Logs

1. Click "View Logs" in the navigation
2. Use filters to search and filter emails
3. View statistics dashboard
4. Select emails for follow-up

### Sending Follow-up Emails

1. Go to the Logs page
2. Select emails that haven't received follow-ups
3. Click "Send Follow-ups" button
4. Confirm and monitor progress

## 🔒 Security Features

- API key authentication for all endpoints
- Rate limiting (10 requests/hour in production)
- Input validation and sanitization
- Email validation
- File size limits
- CORS protection
- Secure MongoDB connections

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in environment variables

## 📊 API Endpoints

### POST `/api/send-bulk-emails`
Send bulk emails to multiple recipients.

**Headers:**
- `X-API-Key`: Your API key
- `Content-Type`: application/json

**Body:**
```json
{
  "emails": ["email1@example.com", "email2@example.com"],
  "jobType": "frontend",
  "subject": "Application for Frontend Developer",
  "senderName": "Your Name"
}
```

### POST `/api/send-followup`
Send follow-up emails to previously contacted recipients.

**Headers:**
- `X-API-Key`: Your API key
- `Content-Type`: application/json

**Body:**
```json
{
  "emailIds": ["log_id_1", "log_id_2"],
  "jobType": "frontend",
  "senderName": "Your Name"
}
```

### GET `/api/email-logs`
Retrieve email logs with filtering and pagination.

**Headers:**
- `X-API-Key`: Your API key

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `status`: Filter by status (success/failed)
- `jobType`: Filter by job type (frontend/mern)
- `followUpSent`: Filter by follow-up status (true/false)
- `search`: Search by email address

### GET `/api/health`
Check system health and resume availability.

## 🎨 Customization

### Email Templates

Edit templates in `lib/emailService.ts`:
- `getEmailTemplate()` - Initial email template
- `getFollowUpTemplate()` - Follow-up email template

### Styling

Modify `components/BulkEmailSender.tsx` and `components/EmailLogsViewer.tsx` for UI changes.

### Rate Limits

Adjust in API files:
- `MAX_EMAILS_PER_REQUEST` in `.env.local`
- Rate limit logic in `pages/api/send-bulk-emails.ts`

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env.local`
- For Atlas, whitelist your IP address

### Email Sending Fails
- Verify Gmail App Password is correct
- Check if 2FA is enabled on Gmail
- Ensure "Less secure app access" is enabled (if not using App Password)

### Resume Not Found
- Check file paths: `public/resumes/frontend-resume.pdf`
- Ensure files are PDF format
- Verify file permissions

## 📝 License

MIT License - feel free to use this project for your needs!

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📧 Support

For issues or questions, please open an issue on GitHub.
