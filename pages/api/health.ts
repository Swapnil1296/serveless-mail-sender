import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import dbConnect from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check database connection
    let dbStatus = 'disconnected';
    let dbDetails = {};
    
    try {
      const db = await dbConnect();
      dbStatus = 'connected';
      dbDetails = {
        name: db.connection.name,
        host: db.connection.host,
        readyState: db.connection.readyState === 1 ? 'connected' : 'connecting',
      };
      console.log('✅ Health check: Database connected');
    } catch (error) {
      dbStatus = 'error';
      dbDetails = {
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      console.log('⚠️  Health check: Database disconnected');
    }

    // Check resume files
    const resumesDir = path.join(process.cwd(), 'public', 'resumes');
    const resumes: Record<string, { exists: boolean; path: string }> = {};

    // Map of job types to actual filenames
    const resumeFiles = {
      frontend: 'Swapnil-Landage-3YEO-FE.pdf',
      mern: 'Swapnil-Landage-3YOE-MERN.pdf'
    };

    for (const [jobType, filename] of Object.entries(resumeFiles)) {
      const resumePath = path.join(resumesDir, filename);
      try {
        await fs.access(resumePath);
        resumes[jobType] = { exists: true, path: filename };
      } catch {
        resumes[jobType] = { exists: false, path: 'Not found' };
      }
    }

    return res.status(200).json({
      status: 'running',
      timestamp: new Date().toISOString(),
      database: {
        status: dbStatus,
        ...dbDetails,
      },
      resumes,
      environment: process.env.NODE_ENV || 'development',
    });
  } catch (error) {
    return res.status(500).json({ 
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
