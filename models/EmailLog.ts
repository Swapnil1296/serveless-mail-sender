import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEmailLog extends Document {
  email: string;
  jobType: 'frontend' | 'mern';
  subject: string;
  senderName: string;
  status: 'success' | 'failed' | 'pending';
  errorMessage?: string;
  sentAt: Date;
  followUpSent: boolean;
  followUpSentAt?: Date;
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
  };
}

const EmailLogSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    jobType: {
      type: String,
      required: true,
      enum: ['frontend', 'mern'],
      index: true,
    },
    subject: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['success', 'failed', 'pending'],
      default: 'pending',
      index: true,
    },
    errorMessage: {
      type: String,
    },
    sentAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    followUpSent: {
      type: Boolean,
      default: false,
      index: true,
    },
    followUpSentAt: {
      type: Date,
    },
    metadata: {
      ipAddress: String,
      userAgent: String,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for efficient queries
EmailLogSchema.index({ email: 1, sentAt: -1 });
EmailLogSchema.index({ status: 1, followUpSent: 1 });
EmailLogSchema.index({ jobType: 1, sentAt: -1 });

const EmailLog: Model<IEmailLog> =
  mongoose.models.EmailLog || mongoose.model<IEmailLog>('EmailLog', EmailLogSchema);

export default EmailLog;
