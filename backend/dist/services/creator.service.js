"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCreator = exports.addSubscriberToCreator = exports.updateCreatorRevenue = exports.addBlinkPostToCreator = exports.getCreatorByEmail = exports.getCreatorById = exports.getAllCreators = exports.updateCreator = exports.createCreator = void 0;
const Creator_model_1 = __importDefault(require("../models/Creator.model"));
/**
 * Create a new creator
 * @param args - Creator properties
 * @returns The created creator document
 */
const createCreator = async (data) => {
    const creator = new Creator_model_1.default({
        name: data.name,
        email: data.email,
        blinkPosts: [],
        totalRevenue: 0,
        walletAddress: data.walletAddress,
    });
    return creator.save();
};
exports.createCreator = createCreator;
/**
 * Create a new creator
 * @param args - Creator properties
 * @returns The created creator document
 */
const updateCreator = async (id, data) => {
    return Creator_model_1.default.findByIdAndUpdate(id, { ...data }, { new: true });
};
exports.updateCreator = updateCreator;
/**
 * Get all creators
 * @returns An array of all creator documents
 */
const getAllCreators = async () => {
    return Creator_model_1.default.find({}).sort({ createdAt: -1 });
};
exports.getAllCreators = getAllCreators;
/**
 * Get creator by ID
 * @param id - Creator ID
 * @returns The creator document or null if not found
 */
const getCreatorById = async (id) => {
    return Creator_model_1.default.findById(id).populate("blinkPosts");
};
exports.getCreatorById = getCreatorById;
/**
 * Get creator by email
 * @param email - Creator email
 * @returns The creator document or null if not found
 */
const getCreatorByEmail = async (email) => {
    return Creator_model_1.default.findOne({ email }).populate("blinkPosts");
};
exports.getCreatorByEmail = getCreatorByEmail;
/**
 * Add a BlinkPost to a creator's blinkPosts list
 * @param creatorId - Creator ID
 * @param blinkPostId - BlinkPost ID
 * @returns The updated creator document
 */
const addBlinkPostToCreator = async (creatorId, blinkPostId) => {
    const creator = await Creator_model_1.default.findById(creatorId);
    if (!creator) {
        throw new Error("Creator not found");
    }
    creator.blinkPostsIDs.push(blinkPostId);
    return creator.save();
};
exports.addBlinkPostToCreator = addBlinkPostToCreator;
/**
 * Update a creator's total revenue
 * @param creatorId - Creator ID
 * @param additionalRevenue - Revenue to add
 * @returns The updated creator document
 */
const updateCreatorRevenue = async (creatorId, additionalRevenue) => {
    const creator = await Creator_model_1.default.findById(creatorId);
    if (!creator) {
        throw new Error("Creator not found");
    }
    creator.totalRevenue += additionalRevenue;
    return creator.save();
};
exports.updateCreatorRevenue = updateCreatorRevenue;
const addSubscriberToCreator = async (creatorId, subscriber) => {
    const creator = await Creator_model_1.default.findById(creatorId);
    if (!creator) {
        throw new Error("Creator not found");
    }
    const newSubscriber = {
        walletAddress: subscriber,
    };
    creator.subscribers.push(newSubscriber);
    return creator.save();
};
exports.addSubscriberToCreator = addSubscriberToCreator;
/**
 * Delete a creator by ID
 * @param id - Creator ID
 * @returns The deleted creator document
 */
const deleteCreator = async (id) => {
    return Creator_model_1.default.findByIdAndDelete(id);
};
exports.deleteCreator = deleteCreator;
