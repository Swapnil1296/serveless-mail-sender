// Test email sending without Next.js
require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

console.log('Testing email configuration...\n');

// Check environment variables
console.log('Environment variables:');
console.log('  ACTIVE_EMAIL_ADDRESS:', process.env.ACTIVE_EMAIL_ADDRESS ? '✓ Set' : '✗ Missing');
console.log('  EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✓ Set' : '✗ Missing');
console.log('  EMAIL_SENDER_ADDRESS:', process.env.EMAIL_SENDER_ADDRESS ? '✓ Set' : '✗ Missing');
console.log();

// Check resume files
const resumeFiles = {
  frontend: 'Swapnil-Landage-3YEO-FE.pdf',
  mern: 'Swapnil-Landage-3YOE-MERN.pdf'
};

console.log('Resume files:');
for (const [jobType, filename] of Object.entries(resumeFiles)) {
  const resumePath = path.join(__dirname, 'public', 'resumes', filename);
  const exists = fs.existsSync(resumePath);
  console.log(`  ${jobType}: ${exists ? '✓' : '✗'} ${filename}`);
}
console.log();

// Create transporter
console.log('Creating email transporter...');
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

// Verify transporter
console.log('Verifying email configuration...');
transporter.verify((error, success) => {
  if (error) {
    console.error('✗ Email configuration failed!');
    console.error('Error:', error.message);
    console.log('\n⚠️  Common issues:');
    console.log('  1. Wrong email or password in .env.local');
    console.log('  2. Need to use App Password (not regular password)');
    console.log('  3. 2FA must be enabled on Gmail');
    console.log('  4. Generate App Password: https://myaccount.google.com/apppasswords');
    process.exit(1);
  } else {
    console.log('✓ Email configuration is valid!');
    console.log('\n✓ Ready to send emails!');
    console.log('\nTo send a test email, run:');
    console.log('  node send-test-email.js your-email@example.com');
    process.exit(0);
  }
});
