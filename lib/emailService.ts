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

// Follow-up email templates - Different for Frontend and MERN
const getFollowUpTemplate = (jobType: 'frontend' | 'mern', name: string): string => {
  const sanitizedName = sanitizeInput(name || 'Swapnil Landage');
  
  if (jobType === 'frontend') {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="border-left: 4px solid #2563eb; padding-left: 20px; margin-bottom: 20px;">
            <h2 style="color: #2563eb; margin: 0;">Following Up: Frontend Developer Position</h2>
          </div>
          
          <p>Dear Hiring Manager,</p>
          
          <p>I hope this email finds you well. I wanted to follow up on my application for the <strong>Frontend Developer (React.js/Next.js)</strong> position that I submitted recently.</p>
          
          <p>I remain very enthusiastic about the opportunity to contribute to your team with my frontend expertise:</p>
          
          <div style="background-color: #f0f9ff; border-left: 3px solid #2563eb; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #2563eb;">Key Frontend Strengths:</p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>React.js & Next.js with TypeScript</li>
              <li>Modern UI/UX implementation with Tailwind CSS</li>
              <li>Performance optimization & SEO best practices</li>
              <li>Responsive design & cross-browser compatibility</li>
            </ul>
          </div>
          
          <p>I would welcome the opportunity to discuss how my frontend development skills can add value to your projects. I'm available for a call or interview at your earliest convenience.</p>
          
          <p>Please let me know if you need any additional information or would like to schedule a discussion.</p>
          
          <p>Thank you for your time and consideration. I look forward to hearing from you.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
            <p style="margin: 5px 0;"><strong>Best regards,</strong></p>
            <p style="margin: 5px 0; color: #2563eb; font-weight: bold;">${sanitizedName}</p>
            <p style="margin: 5px 0;">📱 Phone/WhatsApp: <a href="tel:7666604697" style="color: #2563eb; text-decoration: none;">7666604697</a></p>
            <p style="margin: 5px 0;">
              💻 <a href="https://github.com/Swapnil1296" style="color: #2563eb; text-decoration: none;">GitHub Profile</a> | 
              🌐 <a href="https://swapnil-landage-portfolio.netlify.app/" style="color: #2563eb; text-decoration: none;">Portfolio</a>
            </p>
          </div>
        </body>
      </html>
    `;
  }
  
  // MERN Stack Follow-up Template
  return `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="border-left: 4px solid #10b981; padding-left: 20px; margin-bottom: 20px;">
          <h2 style="color: #10b981; margin: 0;">Following Up: MERN Stack Developer Position</h2>
        </div>
        
        <p>Dear Hiring Manager,</p>
        
        <p>I hope this email finds you well. I wanted to follow up on my application for the <strong>MERN Stack Developer</strong> position that I submitted recently.</p>
        
        <p>I remain very interested in this opportunity and believe my full-stack development experience would be a great fit for your team:</p>
        
        <div style="background-color: #f0fdf4; border-left: 3px solid #10b981; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-weight: bold; color: #10b981;">Full-Stack Capabilities:</p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li><strong>Frontend:</strong> React.js, Next.js, Redux, TypeScript</li>
            <li><strong>Backend:</strong> Node.js, Express.js, RESTful APIs</li>
            <li><strong>Database:</strong> MongoDB - Schema design & optimization</li>
            <li><strong>DevOps:</strong> AWS deployment, CI/CD pipelines</li>
          </ul>
        </div>
        
        <p>I would be delighted to discuss how my MERN stack expertise can contribute to your development goals. I'm available for a technical discussion or interview at your convenience.</p>
        
        <p>Please feel free to reach out if you need any additional information or code samples.</p>
        
        <p>Thank you for your time and consideration. I look forward to the opportunity to speak with you.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
          <p style="margin: 5px 0;"><strong>Best regards,</strong></p>
          <p style="margin: 5px 0; color: #10b981; font-weight: bold;">${sanitizedName}</p>
          <p style="margin: 5px 0;">📱 Phone/WhatsApp: <a href="tel:7666604697" style="color: #10b981; text-decoration: none;">7666604697</a></p>
          <p style="margin: 5px 0;">
            💻 <a href="https://github.com/Swapnil1296" style="color: #10b981; text-decoration: none;">GitHub Profile</a> | 
            🌐 <a href="https://swapnil-landage-portfolio.netlify.app/" style="color: #10b981; text-decoration: none;">Portfolio</a>
          </p>
        </div>
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
