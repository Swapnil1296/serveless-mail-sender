import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAttempt extends Document {
  username: string;
  questionId: mongoose.Types.ObjectId;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpentMs: number;
  quizSessionId?: mongoose.Types.ObjectId;
  attemptMode: string;
  createdAt: Date;
}

const AttemptSchema = new Schema(
  {
    username: { type: String, required: true, index: true },
    questionId: { type: Schema.Types.ObjectId, ref: 'McqQuestion', required: true },
    selectedAnswer: { type: Number, required: true },
    isCorrect: { type: Boolean, required: true },
    timeSpentMs: { type: Number, default: 0 },
    quizSessionId: { type: Schema.Types.ObjectId, ref: 'QuizSession' },
    attemptMode: {
      type: String,
      enum: ['practice', 'quiz', 'daily', 'wrong_retry', 'random_10', 'random_25', 'random_50', 'timed', 'adaptive', 'topic'],
      default: 'quiz',
    },
  },
  { timestamps: true }
);

AttemptSchema.index({ username: 1, questionId: 1 });
AttemptSchema.index({ username: 1, createdAt: -1 });
AttemptSchema.index({ username: 1, isCorrect: 1 });

const Attempt: Model<IAttempt> =
  mongoose.models.Attempt || mongoose.model<IAttempt>('Attempt', AttemptSchema);

export default Attempt;
