import mongoose, { Document, Schema } from 'mongoose';
import { BlinkPostDoc } from './BlinkPost.model';

export interface CreatorDoc extends Document {
  name: string;
  email: string;
  blinkPostsIDs: mongoose.Schema.Types.ObjectId[];
  totalRevenue: number;
  walletAddress: string | null;
  subscriptionPrice: number;
  subscribers: SubscriberDoc[];
}
export interface SubscriberDoc{
  walletAddress: string;
  date: Date;
}

const subscriberSchema: Schema = new Schema(
  {
    walletAddress: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const creatorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    blinkPosts: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'BlinkPost' }
    ],
    totalRevenue: { type: Number, default: 0 },
    walletAddress: { type: String },
    subscribers: [ subscriberSchema ],
    subscriptionPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Creator = mongoose.model<CreatorDoc>('Creator', creatorSchema);

export default Creator;