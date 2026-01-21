import nodemailer from 'nodemailer';
import validator from 'validator';
import { promises as fs } from 'fs';
import path from 'path';

// Email transporter with connection pooling
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ACTIVE_EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production',
    minVersion: 'TLSv1.2',
  },
});

// Verify transporter on startup
transporter.verify((error) => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  if (error) {
    console.error('❌ EMAIL SERVICE: FAILED');
    console.error('   Error:', error.message);
    console.log('');
    console.log('💡 Solutions:');
    console.log('   1. Check email credentials in .env.local');
    console.log('   2. Use Gmail App Password (not regular password)');
    console.log('   3. Enable 2FA and generate App Password');
    console.log('   4. Visit: https://myaccount.google.com/apppasswords');
  } else {
    console.log('✅ EMAIL SERVICE: READY');
    console.log('   Provider: Gmail');
    console.log('   From:', process.env.ACTIVE_EMAIL_ADDRESS);
  }
  console.log('═══════════════════════════════════════════════════════');
  console.log('');
});

export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  return validator.escape(input.trim());
};

export const validateEmail = (email: string): boolean => {
  return validator.isEmail(email) && email.length <= 254;
};

// Email templates
const getEmailTemplate = (jobType: 'frontend' | 'mern', name: string): string => {
  const sanitizedName = sanitizeInput(name || 'Swapnil Landage');
  
  if (jobType === 'frontend') {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2563eb;">ReactJS / NextJS / Frontend Developer</h2>
          <p>Dear Hiring Manager,</p>
          <p>I hope you are doing well. I am writing to express my interest in the <strong>React.js/ Next.js/ Frontend Developer</strong> role at your organization.</p>
          <p><strong>Core Frontend Skills:</strong></p>
          <ul>
            <li>React.js, Next.js, TypeScript, Redux, Context API</li>
            <li>HTML5, CSS3, Tailwind, responsive UI implementation</li>
            <li>Server-side rendering (SSR), static generation (SSG)</li>
            <li>Performance optimization, SEO, Core Web Vitals improvement</li>
          </ul>
          <p>Thank you for your time and consideration.</p>
          <p>Best regards,<br>${sanitizedName}<br>Phone/WhatsApp: 7666604697<br>
          <a href="https://github.com/Swapnil1296">Github</a><br>
          <a href="https://swapnil-landage-portfolio.netlify.app/">Portfolio</a></p>
        </body>
      </html>
    `;
  }
  
  return `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #10b981;">Application for MERN Developer Role</h2>
        <p>Dear Hiring Manager,</p>
        <p>I hope you are doing well. I am writing to express my interest in the <strong>MERN stack Developer</strong> position.</p>
        <p><strong>Technical Skills:</strong></p>
        <ul>
          <li><strong>Frontend:</strong> React.js, Next.js, TypeScript, Redux, Tailwind</li>
          <li><strong>Backend:</strong> Node.js, Express.js, REST APIs, Authentication</li>
          <li><strong>Database:</strong> MongoDB – schema design, indexing, aggregations</li>
          <li><strong>Cloud:</strong> AWS (EC2, S3, Lambda), Azure basics</li>
        </ul>
        <p>Thank you for your time and consideration.</p>
        <p>Best regards,<br>${sanitizedName}<br>Phone/WhatsApp: 7666604697<br>
        <a href="https://github.com/Swapnil1296">Github</a><br>
        <a href="https://swapnil-landage-portfolio.netlify.app/">Portfolio</a></p>
      </body>
    </html>
  `;
};

// Follow-up email template
const getFollowUpTemplate = (jobType: 'frontend' | 'mern', name: string): string => {
  const sanitizedName = sanitizeInput(name || 'Swapnil Landage');
  
  return `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #6366f1;">Following Up on My Application</h2>
        <p>Dear Hiring Manager,</p>
        <p>I hope this email finds you well. I wanted to follow up on my application for the <strong>${jobType === 'frontend' ? 'Frontend' : 'MERN Stack'} Developer</strong> position that I submitted recently.</p>
        <p>I remain very interested in this opportunity and would welcome the chance to discuss how my skills and experience align with your team's needs.</p>
        <p>I'm available for a call or interview at your convenience. Please let me know if you need any additional information.</p>
        <p>Thank you for your time and consideration.</p>
        <p>Best regards,<br>${sanitizedName}<br>Phone/WhatsApp: 7666604697<br>
        <a href="https://github.com/Swapnil1296">Github</a><br>
        <a href="https://swapnil-landage-portfolio.netlify.app/">Portfolio</a></p>
      </body>
    </html>
  `;
};

export interface SendEmailOptions {
  email: string;
  jobType: 'frontend' | 'mern';
  subject: string;
  senderName: string;
  resumePath: string;
  isFollowUp?: boolean;
}

export const sendEmail = async (options: SendEmailOptions): Promise<void> => {
  const { email, jobType, subject, senderName, resumePath, isFollowUp = false } = options;

  // Check if resume exists
  try {
    await fs.access(resumePath);
  } catch {
    throw new Error(`Resume file not found: ${resumePath}`);
  }

  const template = isFollowUp 
    ? getFollowUpTemplate(jobType, senderName)
    : getEmailTemplate(jobType, senderName);

  const mailOptions = {
    from: `${sanitizeInput(senderName)} <${process.env.EMAIL_SENDER_ADDRESS}>`,
    to: email.trim(),
    subject: isFollowUp ? `Follow-up: ${subject}` : subject,
    html: template,
    attachments: isFollowUp ? [] : [{
      filename: `${sanitizeInput(senderName)}_${jobType}_Resume.pdf`,
      path: resumePath,
      contentType: 'application/pdf',
    }],
  };

  await transporter.sendMail(mailOptions);
};

// Batch send with rate limiting
export const sendBatchEmails = async (
  emails: string[],
  options: Omit<SendEmailOptions, 'email'>,
  onProgress?: (email: string, status: 'success' | 'failed', error?: string) => void
): Promise<{ success: number; failed: number }> => {
  let success = 0;
  let failed = 0;

  for (const email of emails) {
    try {
      await sendEmail({ ...options, email });
      success++;
      onProgress?.(email, 'success');
      
      // Rate limiting delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      failed++;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      onProgress?.(email, 'failed', errorMessage);
    }
  }

  return { success, failed };
};

export default transporter;
