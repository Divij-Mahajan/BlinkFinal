"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const creator_service_1 = require("../services/creator.service");
const router = express_1.default.Router();
// Route to create a new creator
router.post('/create', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'Creator data is required' });
        }
        if (!req.body.name || !req.body.email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const creatorData = req.body;
        const newCreator = await (0, creator_service_1.createCreator)(creatorData);
        return res.status(201).json(newCreator);
    }
    catch (err) {
        console.error('Error creating creator:', err);
        res.status(500).json(err);
    }
});
// Route to update a BlinkPost
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCreator = await (0, creator_service_1.updateCreator)(id, req.body);
        if (!updatedCreator) {
            return res.status(404).json({ message: 'Creator not found' });
        }
        return res.status(200).json(updatedCreator);
    }
    catch (err) {
        console.error('Error updating Creator:', err);
        res.status(500).json(err);
    }
});
// Route to get all creators
router.get('/all', async (req, res) => {
    try {
        const creators = await (0, creator_service_1.getAllCreators)();
        return res.status(200).json(creators);
    }
    catch (err) {
        console.error('Error fetching creators:', err);
        res.status(500).json(err);
    }
});
// Route to get a creator by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const creator = await (0, creator_service_1.getCreatorById)(id);
        if (!creator) {
            return res.status(400).json({ message: 'Creator not found' });
        }
        return res.status(200).json(creator);
    }
    catch (err) {
        console.error('Error fetching creator by ID:', err);
        res.status(500).json(err);
    }
});
// Route to get a creator by email
router.get('/email/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const creator = await (0, creator_service_1.getCreatorByEmail)(email);
        if (!creator) {
            return res.status(400).json({ message: 'Creator not found' });
        }
        return res.status(200).json(creator);
    }
    catch (err) {
        console.error('Error fetching creator by email:', err);
        res.status(500).json(err);
    }
});
// Route to add a BlinkPost to a creator
router.put('/:id/blinkpost/:blinkPostId', async (req, res) => {
    try {
        const { id, blinkPostId } = req.params;
        const updatedCreator = await (0, creator_service_1.addBlinkPostToCreator)(id, blinkPostId);
        if (!updatedCreator) {
            return res.status(400).json({ message: 'Creator or BlinkPost not found' });
        }
        return res.status(200).json(updatedCreator);
    }
    catch (err) {
        console.error('Error adding BlinkPost to creator:', err);
        res.status(500).json(err);
    }
});
// Route to update a creator's total revenue
router.put('/:id/revenue', async (req, res) => {
    try {
        const { id } = req.params;
        const { additionalRevenue } = req.body;
        const updatedCreator = await (0, creator_service_1.updateCreatorRevenue)(id, additionalRevenue);
        if (!updatedCreator) {
            return res.status(400).json({ message: 'Creator not found' });
        }
        return res.status(200).json(updatedCreator);
    }
    catch (err) {
        console.error('Error updating creator revenue:', err);
        res.status(500).json(err);
    }
});
router.put('/:id/subscriber/:address', async (req, res) => {
    try {
        const { id, address } = req.params;
        const updatedCreator = await (0, creator_service_1.addSubscriberToCreator)(id, address);
        if (!updatedCreator) {
            return res.status(404).json({ message: 'Creator not found' });
        }
        return res.status(200).json(updatedCreator);
    }
    catch (err) {
        console.error('Error updating Creator:', err);
        res.status(500).json(err);
    }
});
// Route to delete a creator by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCreator = await (0, creator_service_1.deleteCreator)(id);
        if (!deletedCreator) {
            return res.status(400).json({ message: 'Creator not found' });
        }
        return res.status(200).json(deletedCreator);
    }
    catch (err) {
        console.error('Error deleting creator:', err);
        res.status(500).json(err);
    }
});
exports.default = router;
