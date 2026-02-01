import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Expense from '@/models/Expense';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { startDate, endDate, groupBy } = req.query;
      
      let query: any = {};
      if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = new Date(startDate as string);
        if (endDate) query.date.$lte = new Date(endDate as string);
      }

      const expenses = await Expense.find(query).sort({ date: -1 }).lean();
      
      // Calculate total
      const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      
      // Group by date if requested
      let groupedData = null;
      if (groupBy === 'date') {
        const grouped = expenses.reduce((acc: any, exp) => {
          const dateKey = new Date(exp.date).toISOString().split('T')[0];
          if (!acc[dateKey]) {
            acc[dateKey] = { date: dateKey, total: 0, expenses: [] };
          }
          acc[dateKey].total += exp.amount;
          acc[dateKey].expenses.push(exp);
          return acc;
        }, {});
        groupedData = Object.values(grouped);
      }

      return res.status(200).json({ 
        expenses, 
        total,
        count: expenses.length,
        groupedData 
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch expenses' });
    }
  }

  if (req.method === 'POST') {
    try {
      const expense = await Expense.create(req.body);
      return res.status(201).json(expense);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create expense' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, ...updateData } = req.body;
      const expense = await Expense.findByIdAndUpdate(id, updateData, { new: true });
      return res.status(200).json(expense);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update expense' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await Expense.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Expense deleted' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete expense' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
