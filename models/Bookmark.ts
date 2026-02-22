import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBookmark extends Document {
  username: string;
  questionId: mongoose.Types.ObjectId;
  collectionName?: string;
  createdAt: Date;
}

const BookmarkSchema = new Schema(
  {
    username: { type: String, required: true, index: true },
    questionId: { type: Schema.Types.ObjectId, ref: 'McqQuestion', required: true },
    collectionName: { type: String, default: 'default' },
  },
  { timestamps: true }
);

BookmarkSchema.index({ username: 1, questionId: 1 }, { unique: true });

const Bookmark: Model<IBookmark> =
  mongoose.models.Bookmark || mongoose.model<IBookmark>('Bookmark', BookmarkSchema);

export default Bookmark;
