import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Lending from '@/models/Lending';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const lendings = await Lending.find().sort({ createdAt: -1 }).lean();
      const total = lendings.reduce((sum, lending) => sum + (lending.returned ? 0 : lending.amount), 0);
      const totalLent = lendings.reduce((sum, lending) => sum + lending.amount, 0);
      
      return res.status(200).json({ 
        lendings, 
        total,
        totalLent,
        count: lendings.length 
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch lendings' });
    }
  }

  if (req.method === 'POST') {
    try {
      const lending = await Lending.create(req.body);
      return res.status(201).json(lending);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create lending' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, ...updateData } = req.body;
      const lending = await Lending.findByIdAndUpdate(id, updateData, { new: true });
      return res.status(200).json(lending);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update lending' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await Lending.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Lending deleted' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete lending' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
