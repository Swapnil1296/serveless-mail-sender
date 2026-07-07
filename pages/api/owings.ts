import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Owing from '@/models/Owing';
import Payment from '@/models/Payment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const owings = await Owing.find().sort({ createdAt: -1 }).lean();
      
      // Get all payments
      const payments = await Payment.find().lean();
      
      // Calculate payments for each owing
      const owingsWithPayments = await Promise.all(
        owings.map(async (owing: any) => {
          const owingPayments = payments.filter(
            (p: any) => p.owingId.toString() === owing._id.toString()
          );
          const totalPaid = owingPayments.reduce((sum: number, p: any) => sum + p.amount, 0);
          const pendingAmount = owing.amount - totalPaid;
          
          return {
            ...owing,
            totalPaid,
            pendingAmount,
          };
        })
      );
      
      const total = owingsWithPayments.reduce((sum, owing) => sum + owing.pendingAmount, 0);
      const totalOwed = owings.reduce((sum: number, owing: any) => sum + owing.amount, 0);
      const totalPaid = owingsWithPayments.reduce((sum, owing) => sum + owing.totalPaid, 0);
      
      return res.status(200).json({ 
        owings: owingsWithPayments, 
        total,
        totalOwed,
        totalPaid,
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
