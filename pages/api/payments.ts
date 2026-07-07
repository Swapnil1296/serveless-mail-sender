import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Payment from '@/models/Payment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { owingId } = req.query;
      
      if (owingId) {
        // Get payments for a specific owing
        const payments = await Payment.find({ owingId }).sort({ paymentDate: -1 }).lean();
        const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
        
        return res.status(200).json({ 
          payments, 
          totalPaid,
          count: payments.length 
        });
      } else {
        // Get all payments
        const payments = await Payment.find().sort({ createdAt: -1 }).lean();
        return res.status(200).json({ payments });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch payments' });
    }
  }

  if (req.method === 'POST') {
    try {
      const payment = await Payment.create(req.body);
      return res.status(201).json(payment);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create payment' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, ...updateData } = req.body;
      const payment = await Payment.findByIdAndUpdate(id, updateData, { new: true });
      return res.status(200).json(payment);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update payment' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await Payment.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Payment deleted' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete payment' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
