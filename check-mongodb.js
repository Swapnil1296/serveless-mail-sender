// Check if MongoDB is accessible
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/email-sender';

console.log('Checking MongoDB connection...\n');
console.log('URI:', MONGODB_URI.replace(/\/\/.*@/, '//<credentials>@'));

const client = new MongoClient(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
});

async function checkConnection() {
  try {
    await client.connect();
    console.log('✓ MongoDB connection successful!');
    
    const db = client.db();
    const collections = await db.listCollections().toArray();
    console.log(`✓ Database accessible (${collections.length} collections)`);
    
    await client.close();
    console.log('\n✓ MongoDB is ready to use!');
    process.exit(0);
  } catch (error) {
    console.error('✗ MongoDB connection failed!');
    console.error('Error:', error.message);
    console.log('\n⚠️  Solutions:');
    console.log('  1. Start MongoDB: mongod');
    console.log('  2. Or use MongoDB Atlas (cloud)');
    console.log('  3. Update MONGODB_URI in .env.local');
    process.exit(1);
  }
}

checkConnection();
