// Comprehensive diagnostic script
const fs = require('fs');
const path = require('path');

console.log('='.repeat(60));
console.log('  NEXT.JS EMAIL SENDER - DIAGNOSTIC TOOL');
console.log('='.repeat(60));
console.log();

let hasErrors = false;

// Check 1: Environment file
console.log('1. Checking .env.local file...');
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  console.log('   ✓ .env.local exists');
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredVars = [
    'ACTIVE_EMAIL_ADDRESS',
    'EMAIL_PASSWORD',
    'EMAIL_SENDER_ADDRESS',
    'MONGODB_URI',
    'API_KEY',
    'NEXT_PUBLIC_API_KEY'
  ];
  
  requiredVars.forEach(varName => {
    if (envContent.includes(`${varName}=`)) {
      const value = envContent.match(new RegExp(`${varName}=(.+)`))?.[1]?.trim();
      if (value && value !== '') {
        console.log(`   ✓ ${varName} is set`);
      } else {
        console.log(`   ✗ ${varName} is empty`);
        hasErrors = true;
      }
    } else {
      console.log(`   ✗ ${varName} is missing`);
      hasErrors = true;
    }
  });
} else {
  console.log('   ✗ .env.local not found!');
  hasErrors = true;
}
console.log();

// Check 2: Resume files
console.log('2. Checking resume files...');
const resumesDir = path.join(__dirname, 'public', 'resumes');
if (fs.existsSync(resumesDir)) {
  console.log('   ✓ Resumes directory exists');
  
  const resumeFiles = {
    frontend: 'Swapnil-Landage-3YEO-FE.pdf',
    mern: 'Swapnil-Landage-3YOE-MERN.pdf'
  };
  
  Object.entries(resumeFiles).forEach(([jobType, filename]) => {
    const resumePath = path.join(resumesDir, filename);
    if (fs.existsSync(resumePath)) {
      const stats = fs.statSync(resumePath);
      console.log(`   ✓ ${jobType}: ${filename} (${(stats.size / 1024).toFixed(2)} KB)`);
    } else {
      console.log(`   ✗ ${jobType}: ${filename} NOT FOUND`);
      hasErrors = true;
    }
  });
} else {
  console.log('   ✗ Resumes directory not found!');
  hasErrors = true;
}
console.log();

// Check 3: Node modules
console.log('3. Checking dependencies...');
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('   ✓ node_modules exists');
  
  const requiredPackages = [
    'next',
    'react',
    'nodemailer',
    'mongoose',
    'validator'
  ];
  
  requiredPackages.forEach(pkg => {
    const pkgPath = path.join(nodeModulesPath, pkg);
    if (fs.existsSync(pkgPath)) {
      console.log(`   ✓ ${pkg} installed`);
    } else {
      console.log(`   ✗ ${pkg} NOT installed`);
      hasErrors = true;
    }
  });
} else {
  console.log('   ✗ node_modules not found! Run: npm install');
  hasErrors = true;
}
console.log();

// Check 4: Required files
console.log('4. Checking project files...');
const requiredFiles = [
  'package.json',
  'next.config.js',
  'tsconfig.json',
  'pages/api/send-bulk-emails.ts',
  'pages/api/health.ts',
  'lib/emailService.ts',
  'lib/mongodb.ts',
  'models/EmailLog.ts'
];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`   ✓ ${file}`);
  } else {
    console.log(`   ✗ ${file} NOT FOUND`);
    hasErrors = true;
  }
});
console.log();

// Summary
console.log('='.repeat(60));
if (hasErrors) {
  console.log('  ⚠️  ISSUES FOUND - Please fix the errors above');
  console.log('='.repeat(60));
  console.log();
  console.log('Common fixes:');
  console.log('  1. Run: npm install');
  console.log('  2. Check .env.local has all required variables');
  console.log('  3. Ensure resume files are in public/resumes/');
  console.log();
  process.exit(1);
} else {
  console.log('  ✓ ALL CHECKS PASSED!');
  console.log('='.repeat(60));
  console.log();
  console.log('Your setup is ready! Next steps:');
  console.log('  1. Start MongoDB: mongod');
  console.log('  2. Start dev server: npm run dev');
  console.log('  3. Open: http://localhost:3000');
  console.log();
  process.exit(0);
}
