import mongoose from "mongoose";
import Creator, { CreatorDoc, SubscriberDoc } from "../models/Creator.model";
import BlinkPost from "../models/BlinkPost.model";

/**
 * Create a new creator
 * @param args - Creator properties
 * @returns The created creator document
 */
export const createCreator = async (data: CreatorDoc): Promise<CreatorDoc> => {
  const creator = new Creator({
    name: data.name,
    email: data.email,
    blinkPosts: [],
    totalRevenue: 0,
    walletAddress: data.walletAddress,
  });

  return creator.save();
};

/**
 * Create a new creator
 * @param args - Creator properties
 * @returns The created creator document
 */
export const updateCreator = async (id: string, data: Partial<CreatorDoc>): Promise<CreatorDoc | null> => {
  return Creator.findByIdAndUpdate(id, { ...data }, { new: true });
};

/**
 * Get all creators
 * @returns An array of all creator documents
 */
export const getAllCreators = async (): Promise<CreatorDoc[]> => {
  return Creator.find({}).sort({ createdAt: -1 });
};

/**
 * Get creator by ID
 * @param id - Creator ID
 * @returns The creator document or null if not found
 */
export const getCreatorById = async (id: string): Promise<CreatorDoc | null> => {
  return Creator.findById(id).populate("blinkPosts");
};

/**
 * Get creator by email
 * @param email - Creator email
 * @returns The creator document or null if not found
 */
export const getCreatorByEmail = async (email: string): Promise<CreatorDoc | null> => {
  return Creator.findOne({ email }).populate("blinkPosts");
};

/**
 * Add a BlinkPost to a creator's blinkPosts list
 * @param creatorId - Creator ID
 * @param blinkPostId - BlinkPost ID
 * @returns The updated creator document
 */
export const addBlinkPostToCreator = async (creatorId: string, blinkPostId: string): Promise<CreatorDoc | null> => {
  const creator = await Creator.findById(creatorId);

  if (!creator) {
    throw new Error("Creator not found");
  }

  creator.blinkPostsIDs.push(blinkPostId as unknown as mongoose.Schema.Types.ObjectId);
  return creator.save();
};

/**
 * Update a creator's total revenue
 * @param creatorId - Creator ID
 * @param additionalRevenue - Revenue to add
 * @returns The updated creator document
 */
export const updateCreatorRevenue = async (creatorId: string, additionalRevenue: number): Promise<CreatorDoc | null> => {
  const creator = await Creator.findById(creatorId);

  if (!creator) {
    throw new Error("Creator not found");
  }

  creator.totalRevenue += additionalRevenue;
  return creator.save();
};

export const addSubscriberToCreator = async (creatorId: string, subscriber: string): Promise<CreatorDoc | null> => {
  const creator = await Creator.findById(creatorId);

  if (!creator) {
    throw new Error("Creator not found");
  }

  const newSubscriber : Partial<SubscriberDoc> = {
    walletAddress: subscriber,
  }

  creator.subscribers.push(newSubscriber as unknown as SubscriberDoc);
  return creator.save();
}

/**
 * Delete a creator by ID
 * @param id - Creator ID
 * @returns The deleted creator document
 */
export const deleteCreator = async (id: string): Promise<CreatorDoc | null> => {
  return Creator.findByIdAndDelete(id);
};