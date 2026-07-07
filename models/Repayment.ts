import mongoose from 'mongoose';

const RepaymentSchema = new mongoose.Schema({
  lendingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lending',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  repaymentDate: {
    type: Date,
    required: true,
  },
  note: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Repayment || mongoose.model('Repayment', RepaymentSchema);
