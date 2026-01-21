// Send a test email
require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');
const path = require('path');

const testEmail = process.argv[2];

if (!testEmail) {
  console.error('Usage: node send-test-email.js your-email@example.com');
  process.exit(1);
}

console.log(`Sending test email to: ${testEmail}\n`);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ACTIVE_EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const resumePath = path.join(__dirname, 'public', 'resumes', 'Swapnil-Landage-3YOE-MERN.pdf');

const mailOptions = {
  from: `Swapnil Landage <${process.env.EMAIL_SENDER_ADDRESS}>`,
  to: testEmail,
  subject: 'Test Email - MERN Developer Application',
  html: `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #10b981;">Test Email - MERN Developer Application</h2>
        <p>Dear Hiring Manager,</p>
        <p>This is a test email from the Next.js Bulk Email Sender application.</p>
        <p>If you received this email with the resume attached, the system is working correctly!</p>
        <p>Best regards,<br>Swapnil Landage</p>
      </body>
    </html>
  `,
  attachments: [{
    filename: 'Swapnil-Landage-MERN-Resume.pdf',
    path: resumePath,
    contentType: 'application/pdf',
  }],
};

console.log('Sending email...');
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('✗ Failed to send email!');
    console.error('Error:', error.message);
    process.exit(1);
  } else {
    console.log('✓ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('\nCheck your inbox:', testEmail);
    process.exit(0);
  }
});
