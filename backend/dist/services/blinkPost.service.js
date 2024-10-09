"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlinkPost = exports.updateBlinkPost = exports.getBlinkPostsByCreator = exports.getBlinkPostById = exports.getAllBlinkPosts = exports.createBlinkPost = void 0;
const BlinkPost_model_1 = __importDefault(require("../models/BlinkPost.model"));
/**
 * Create a new BlinkPost
 * @param args - BlinkPost properties
 * @returns The created BlinkPost document
 */
const createBlinkPost = async (data) => {
    const blinkPost = new BlinkPost_model_1.default(data);
    return blinkPost.save();
};
exports.createBlinkPost = createBlinkPost;
/**
 * Get all BlinkPosts
 * @returns An array of all BlinkPost documents
 */
const getAllBlinkPosts = async () => {
    return BlinkPost_model_1.default.find({}).sort({ createdAt: -1 });
};
exports.getAllBlinkPosts = getAllBlinkPosts;
/**
 * Get BlinkPost by ID
 * @param id - BlinkPost ID
 * @returns The BlinkPost document or null if not found
 */
const getBlinkPostById = async (id) => {
    return BlinkPost_model_1.default.findById(id).populate("creator");
};
exports.getBlinkPostById = getBlinkPostById;
/**
 * Get BlinkPosts by creator
 * @param publisher - Publisher name
 * @returns An array of BlinkPost documents for the given publisher
 */
const getBlinkPostsByCreator = async (creator) => {
    return BlinkPost_model_1.default.find({ creator }).sort({ createdAt: -1 });
};
exports.getBlinkPostsByCreator = getBlinkPostsByCreator;
/**
 * Update a BlinkPost by ID
 * @param id - BlinkPost ID
 * @param data - Updated BlinkPost properties
 * @returns The updated BlinkPost document
 */
const updateBlinkPost = async (id, data) => {
    return BlinkPost_model_1.default.findByIdAndUpdate(id, { ...data }, { new: true });
};
exports.updateBlinkPost = updateBlinkPost;
/**
 * Delete a BlinkPost by ID
 * @param id - BlinkPost ID
 * @returns The deleted BlinkPost document
 */
const deleteBlinkPost = async (id) => {
    return BlinkPost_model_1.default.findByIdAndDelete(id);
};
exports.deleteBlinkPost = deleteBlinkPost;
