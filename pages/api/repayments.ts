import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Repayment from '@/models/Repayment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { lendingId } = req.query;
      
      if (lendingId) {
        // Get repayments for a specific lending
        const repayments = await Repayment.find({ lendingId }).sort({ repaymentDate: -1 }).lean();
        const totalRepaid = repayments.reduce((sum, repayment) => sum + repayment.amount, 0);
        
        return res.status(200).json({ 
          repayments, 
          totalRepaid,
          count: repayments.length 
        });
      } else {
        // Get all repayments
        const repayments = await Repayment.find().sort({ createdAt: -1 }).lean();
        return res.status(200).json({ repayments });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch repayments' });
    }
  }

  if (req.method === 'POST') {
    try {
      const repayment = await Repayment.create(req.body);
      return res.status(201).json(repayment);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create repayment' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, ...updateData } = req.body;
      const repayment = await Repayment.findByIdAndUpdate(id, updateData, { new: true });
      return res.status(200).json(repayment);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update repayment' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await Repayment.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Repayment deleted' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete repayment' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
