import mongoose, { Document, Schema } from 'mongoose';
import { BlinkPostType } from '../interfaces/BlinkPost.interface';

export interface BlinkPostDoc extends Document {
  title: string;
  content: string;
  image: string;
  price: number;
  premiumTitle: string;
  premiumContent: string;
  premiumImage: string;
  type: BlinkPostType;
  revenue: number;
  creator: mongoose.Schema.Types.ObjectId;
  impressionCount: number;
  engagementCount: number;
  paymentCount: number;
}

const blinkPostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    premiumTitle: { type: String, required: true },
    premiumContent: { type: String, required: true },
    premiumImage: { type: String, required: true },
    type: {type: String, enum: ['ppv','subscription'], required: true},
    revenue: { type: Number, default: 0 },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Creator', required: true },
    subscribers: { type: [String], required: true, default: [] },
    impressionCount: { type: Number, default: 0 },
    engagementCount: { type: Number, default: 0 },
    paymentCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const BlinkPost = mongoose.model<BlinkPostDoc>('BlinkPost', blinkPostSchema);

export default BlinkPost;