import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import EmailLog from '@/models/EmailLog';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { logId, note, phoneNumber } = req.body;

    if (!logId) {
      return res.status(400).json({ error: 'Log ID is required' });
    }

    await dbConnect();

    console.log('Updating log:', logId, 'with note:', note, 'and phone:', phoneNumber);

    // Update the email log with note and phone number
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (note !== undefined) {
      updateData.note = note;
    }

    if (phoneNumber !== undefined) {
      updateData.phoneNumber = phoneNumber;
    }

    console.log('Update data:', updateData);

    const result = await EmailLog.findByIdAndUpdate(
      logId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    console.log('Update result:', result);

    if (!result) {
      return res.status(404).json({ error: 'Email log not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Email log updated successfully',
      data: result,
    });
  } catch (error) {
    console.error('Update email log error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
