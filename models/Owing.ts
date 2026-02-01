import mongoose from 'mongoose';

const OwingSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  paidDate: {
    type: Date,
  },
  note: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Owing || mongoose.model('Owing', OwingSchema);
