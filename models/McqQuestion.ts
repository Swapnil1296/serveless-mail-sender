import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMcqQuestion extends Document {
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0-3 index
  topic: string;
  subtopic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  type?: 'mcq' | 'scenario' | 'debugging';
  companyTags?: string[];
  explanation?: string;
  interviewTip?: string;
}

const McqQuestionSchema: Schema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length === 4,
        message: 'Exactly 4 options required',
      },
    },
    correctAnswer: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },
    topic: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    explanation: { type: String, trim: true, default: '' },
    subtopic: { type: String, trim: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    type: { type: String, enum: ['mcq', 'scenario', 'debugging'], default: 'mcq' },
    companyTags: { type: [String], default: [] },
    interviewTip: { type: String, trim: true },
  },
  {
    timestamps: true,
    strict: true,
  }
);

McqQuestionSchema.index({ topic: 1 });
McqQuestionSchema.index({ topic: 1, difficulty: 1 });

if (mongoose.models.McqQuestion) {
  delete mongoose.models.McqQuestion;
}

const McqQuestion: Model<IMcqQuestion> =
  mongoose.model<IMcqQuestion>('McqQuestion', McqQuestionSchema);

export default McqQuestion;
