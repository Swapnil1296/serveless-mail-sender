import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  owingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owing',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentDate: {
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

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
