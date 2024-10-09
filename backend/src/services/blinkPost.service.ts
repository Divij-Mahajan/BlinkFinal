import mongoose from "mongoose";
import BlinkPost, { BlinkPostDoc } from "../models/BlinkPost.model";
import { BlinkPostType } from "../interfaces/BlinkPost.interface";

/**
 * Create a new BlinkPost
 * @param args - BlinkPost properties
 * @returns The created BlinkPost document
 */
export const createBlinkPost = async (data: {
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
}) => {
  const blinkPost = new BlinkPost(data);
  return blinkPost.save();
};


/**
 * Get all BlinkPosts
 * @returns An array of all BlinkPost documents
 */
export const getAllBlinkPosts = async (): Promise<BlinkPostDoc[]> => {
  return BlinkPost.find({}).sort({ createdAt: -1 });
};

/**
 * Get BlinkPost by ID
 * @param id - BlinkPost ID
 * @returns The BlinkPost document or null if not found
 */
export const getBlinkPostById = async (id: string): Promise<BlinkPostDoc | null> => {
  return BlinkPost.findById(id).populate("creator");
};

/**
 * Get BlinkPosts by creator
 * @param publisher - Publisher name
 * @returns An array of BlinkPost documents for the given publisher
 */
export const getBlinkPostsByCreator = async (creator: string): Promise<BlinkPostDoc[]> => {
  return BlinkPost.find({ creator }).sort({ createdAt: -1 });
};


/**
 * Update a BlinkPost by ID
 * @param id - BlinkPost ID
 * @param data - Updated BlinkPost properties
 * @returns The updated BlinkPost document
 */
export const updateBlinkPost = async (id: string, data: Partial<BlinkPostDoc>): Promise<BlinkPostDoc | null> => {
  return BlinkPost.findByIdAndUpdate(id, { ...data }, { new: true });
};

/**
 * Delete a BlinkPost by ID
 * @param id - BlinkPost ID
 * @returns The deleted BlinkPost document
 */
export const deleteBlinkPost = async (id: string): Promise<BlinkPostDoc | null> => {
  return BlinkPost.findByIdAndDelete(id);
};