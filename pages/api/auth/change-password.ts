import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { requireAuth, verifyPassword, hashPassword, getTokenFromRequest, verifyToken } from '@/lib/auth';
import { validatePassword } from '@/lib/validation';
import { withEncryption } from '@/lib/withEncryption';

async function changePasswordHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = getTokenFromRequest(req);
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  const authUser = verifyToken(token);
  if (!authUser) return res.status(401).json({ error: 'Invalid token' });

  const { currentPassword, newPassword, userId } = req.body ?? {};
  const newPass = typeof newPassword === 'string' ? newPassword : '';
  const currentPass = typeof currentPassword === 'string' ? currentPassword : '';
  const targetUserId = typeof userId === 'string' ? userId : null;

  const pv = validatePassword(newPass);
  if (!pv.valid) return res.status(400).json({ error: pv.error });

  const isAdminChangingOther = authUser.role === 'admin' && targetUserId && targetUserId !== authUser.id;
  if (isAdminChangingOther) {
    if (!currentPass) {
      return res.status(400).json({ error: 'Current password required when admin changes another user password' });
    }
  } else if (!currentPass) {
    return res.status(400).json({ error: 'Current password is required' });
  }

  await dbConnect();

  const targetId = isAdminChangingOther ? targetUserId : authUser.id;
  const user = await User.findById(targetId).exec();
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (!isAdminChangingOther) {
    const valid = await verifyPassword(currentPass, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Current password is incorrect' });
  } else {
    const adminValid = await verifyPassword(currentPass, (await User.findById(authUser.id).exec())!.passwordHash);
    if (!adminValid) return res.status(401).json({ error: 'Your password is incorrect' });
  }

  const passwordHash = await hashPassword(newPass);
  await User.updateOne({ _id: user._id }, { $set: { passwordHash } }).exec();

  return res.status(200).json({ success: true });
}

export default withEncryption(requireAuth(changePasswordHandler));
