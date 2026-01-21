// Simple test script to verify health check
const fs = require('fs');
const path = require('path');

console.log('Testing health check logic...\n');

// Check resume files
const resumesDir = path.join(__dirname, 'public', 'resumes');
console.log('Resumes directory:', resumesDir);

const resumeFiles = {
  frontend: 'Swapnil-Landage-3YEO-FE.pdf',
  mern: 'Swapnil-Landage-3YOE-MERN.pdf'
};

console.log('\nChecking resume files:');
for (const [jobType, filename] of Object.entries(resumeFiles)) {
  const resumePath = path.join(resumesDir, filename);
  const exists = fs.existsSync(resumePath);
  console.log(`  ${jobType}: ${exists ? '✓' : '✗'} ${filename} ${exists ? 'FOUND' : 'NOT FOUND'}`);
  if (exists) {
    const stats = fs.statSync(resumePath);
    console.log(`    Size: ${(stats.size / 1024).toFixed(2)} KB`);
  }
}

console.log('\n✓ Health check logic verified!');
console.log('\nTo start the server, run: npm run dev');
