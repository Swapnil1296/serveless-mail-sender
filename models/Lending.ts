import mongoose from 'mongoose';

const LendingSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  promiseToReturnDate: {
    type: Date,
    required: true,
  },
  returned: {
    type: Boolean,
    default: false,
  },
  returnedDate: {
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

export default mongoose.models.Lending || mongoose.model('Lending', LendingSchema);
