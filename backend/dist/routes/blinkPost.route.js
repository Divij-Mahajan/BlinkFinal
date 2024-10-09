"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blinkPost_service_1 = require("../services/blinkPost.service");
const router = express_1.default.Router();
// Route to create a new BlinkPost
router.post('/create', async (req, res) => {
    try {
        const { title, content, image, premiumTitle, premiumImage, premiumContent, type, price, creator, } = req.body;
        if (!title || !content || !image || !premiumTitle || !premiumContent || !premiumImage || !type || !creator) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newBlinkPost = await (0, blinkPost_service_1.createBlinkPost)({
            title: title,
            content: content,
            image: image,
            price: price,
            premiumTitle: premiumTitle,
            premiumContent: premiumContent,
            premiumImage: premiumImage,
            type: type,
            revenue: 0,
            creator: creator,
            impressionCount: 0,
            engagementCount: 0,
            paymentCount: 0,
        });
        return res.status(201).json(newBlinkPost);
    }
    catch (err) {
        console.error('Error creating Blink Post:', err);
        res.status(500).json(err);
    }
});
// Route to get all BlinkPosts
router.get('/all', async (req, res) => {
    try {
        const blinkPosts = await (0, blinkPost_service_1.getAllBlinkPosts)();
        return res.status(200).json(blinkPosts);
    }
    catch (err) {
        console.error('Error fetching BlinkPost:', err);
        res.status(500).json(err);
    }
});
// Route to get a BlinkPost by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blinkPost = await (0, blinkPost_service_1.getBlinkPostById)(id);
        if (!blinkPost) {
            return res.status(404).json({ message: 'BlinkPost not found' });
        }
        return res.status(200).json(blinkPost);
    }
    catch (err) {
        console.error('Error fetching BlinkPost by ID:', err);
        res.status(500).json(err);
    }
});
// Route to get all BlinkPosts by creator
router.get('/creator/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blinkPost = await (0, blinkPost_service_1.getBlinkPostsByCreator)(id);
        if (!blinkPost) {
            return res.status(404).json({ message: 'BlinkPost not found' });
        }
        return res.status(200).json(blinkPost);
    }
    catch (err) {
        console.error('Error fetching BlinkPost by ID:', err);
        res.status(500).json(err);
    }
});
// Route to update a BlinkPost
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBlinkPost = await (0, blinkPost_service_1.updateBlinkPost)(id, req.body);
        if (!updatedBlinkPost) {
            return res.status(404).json({ message: 'BlinkPost not found' });
        }
        return res.status(200).json(updatedBlinkPost);
    }
    catch (err) {
        console.error('Error updating BlinkPost:', err);
        res.status(500).json(err);
    }
});
// Route to delete a BlinkPost
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await (0, blinkPost_service_1.deleteBlinkPost)(id);
        return res.status(204).send();
    }
    catch (err) {
        console.error('Error deleting BlinkPost:', err);
        res.status(500).json(err);
    }
});
exports.default = router;
