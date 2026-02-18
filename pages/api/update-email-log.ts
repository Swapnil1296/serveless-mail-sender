import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import EmailLog from '@/models/EmailLog';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { logId, note, phoneNumber, interviewScheduledStatus } = req.body;

    if (!logId) {
      return res.status(400).json({ error: 'Log ID is required' });
    }

    await dbConnect();

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (note !== undefined) updateData.note = note;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (interviewScheduledStatus !== undefined) {
      const valid = ['scheduled', 'not_scheduled', 'rejected', 'waiting_for_response'];
      if (valid.includes(interviewScheduledStatus)) {
        updateData.interviewScheduledStatus = interviewScheduledStatus;
      }
    }

    const result = await EmailLog.findByIdAndUpdate(
      logId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

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
