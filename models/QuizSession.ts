import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuizAnswer {
  questionId: mongoose.Types.ObjectId;
  selectedAnswer: number;
  timeSpentMs: number;
}

export interface IQuizSession extends Document {
  username: string;
  mode: string;
  questionIds: mongoose.Types.ObjectId[];
  answers: IQuizAnswer[];
  totalQuestions: number;
  correctCount: number;
  timeLimitMs: number;
  timeSpentMs: number;
  completedAt?: Date;
  topic?: string;
  createdAt: Date;
}

const QuizAnswerSchema = new Schema(
  {
    questionId: { type: Schema.Types.ObjectId, ref: 'McqQuestion', required: true },
    selectedAnswer: { type: Number, required: true },
    timeSpentMs: { type: Number, default: 0 },
  },
  { _id: false }
);

const QuizSessionSchema = new Schema(
  {
    username: { type: String, required: true, index: true },
    mode: {
      type: String,
      enum: ['random_10', 'random_25', 'random_50', 'timed', 'adaptive', 'wrong_retry', 'daily', 'topic'],
      required: true,
    },
    questionIds: [{ type: Schema.Types.ObjectId, ref: 'McqQuestion' }],
    answers: [QuizAnswerSchema],
    totalQuestions: { type: Number, required: true },
    correctCount: { type: Number, default: 0 },
    timeLimitMs: { type: Number, default: 0 },
    timeSpentMs: { type: Number, default: 0 },
    completedAt: { type: Date },
    topic: { type: String },
  },
  { timestamps: true }
);

QuizSessionSchema.index({ username: 1, createdAt: -1 });

const QuizSession: Model<IQuizSession> =
  mongoose.models.QuizSession || mongoose.model<IQuizSession>('QuizSession', QuizSessionSchema);

export default QuizSession;
