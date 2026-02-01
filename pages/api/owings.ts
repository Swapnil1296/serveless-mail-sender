import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Owing from '@/models/Owing';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const owings = await Owing.find().sort({ createdAt: -1 }).lean();
      const total = owings.reduce((sum, owing) => sum + (owing.paid ? 0 : owing.amount), 0);
      const totalOwed = owings.reduce((sum, owing) => sum + owing.amount, 0);
      
      return res.status(200).json({ 
        owings, 
        total,
        totalOwed,
        count: owings.length 
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch owings' });
    }
  }

  if (req.method === 'POST') {
    try {
      const owing = await Owing.create(req.body);
      return res.status(201).json(owing);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create owing' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, ...updateData } = req.body;
      const owing = await Owing.findByIdAndUpdate(id, updateData, { new: true });
      return res.status(200).json(owing);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update owing' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await Owing.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Owing deleted' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete owing' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
