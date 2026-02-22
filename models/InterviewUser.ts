import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInterviewUser extends Document {
  username: string;
  name?: string;
  experienceLevel?: string;
  preferredStack: string[];
  targetCompanies: string[];
  xp: number;
  level: number;
  streak: number;
  streakLastDate?: Date;
  totalAttempts: number;
  totalCorrect: number;
  accuracy: number;
  createdAt: Date;
  updatedAt: Date;
}

const InterviewUserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    name: { type: String, trim: true },
    experienceLevel: { type: String, enum: ['3-5', '5-8', '8+'], default: '3-5' },
    preferredStack: { type: [String], default: ['mern'] },
    targetCompanies: { type: [String], default: [] },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    streak: { type: Number, default: 0 },
    streakLastDate: { type: Date },
    totalAttempts: { type: Number, default: 0 },
    totalCorrect: { type: Number, default: 0 },
    accuracy: { type: Number, default: 0 },
  },
  { timestamps: true }
);

InterviewUserSchema.index({ username: 1 }, { unique: true });
InterviewUserSchema.index({ xp: -1 });

const InterviewUser: Model<IInterviewUser> =
  mongoose.models.InterviewUser ||
  mongoose.model<IInterviewUser>('InterviewUser', InterviewUserSchema);

export default InterviewUser;
