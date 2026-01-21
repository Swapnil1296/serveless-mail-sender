import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect() {
  if (cached.conn) {
    console.log('✓ Using existing MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    console.log('🔄 Connecting to MongoDB...');
    console.log('   URI:', MONGODB_URI.replace(/\/\/.*@/, '//<credentials>@'));
    
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
    console.log('✅ MongoDB connected successfully!');
    console.log('   Database:', cached.conn.connection.name);
    console.log('   Host:', cached.conn.connection.host);
  } catch (e) {
    cached.promise = null;
    console.error('❌ MongoDB connection failed!');
    console.error('   Error:', e instanceof Error ? e.message : 'Unknown error');
    console.error('   URI:', MONGODB_URI.replace(/\/\/.*@/, '//<credentials>@'));
    console.log('');
    console.log('💡 Solutions:');
    console.log('   1. Start MongoDB: mongod');
    console.log('   2. Or use MongoDB Atlas (cloud)');
    console.log('   3. Update MONGODB_URI in .env.local');
    console.log('');
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
