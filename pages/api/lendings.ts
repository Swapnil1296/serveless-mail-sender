import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Lending from '@/models/Lending';
import Repayment from '@/models/Repayment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const lendings = await Lending.find().sort({ createdAt: -1 }).lean();
      
      // Get all repayments
      const repayments = await Repayment.find().lean();
      
      // Calculate repayments for each lending
      const lendingsWithRepayments = await Promise.all(
        lendings.map(async (lending) => {
          const lendingRepayments = repayments.filter(
            (r: any) => r.lendingId.toString() === lending._id.toString()
          );
          const totalRepaid = lendingRepayments.reduce((sum: number, r: any) => sum + r.amount, 0);
          const pendingAmount = lending.amount - totalRepaid;
          
          return {
            ...lending,
            totalRepaid,
            pendingAmount,
          };
        })
      );
      
      const total = lendingsWithRepayments.reduce((sum, lending) => sum + lending.pendingAmount, 0);
      const totalLent = lendings.reduce((sum, lending) => sum + lending.amount, 0);
      const totalRepaid = lendingsWithRepayments.reduce((sum, lending) => sum + lending.totalRepaid, 0);
      
      return res.status(200).json({ 
        lendings: lendingsWithRepayments, 
        total,
        totalLent,
        totalRepaid,
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
