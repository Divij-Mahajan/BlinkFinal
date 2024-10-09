"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const creator_route_1 = __importDefault(require("./routes/creator.route"));
const blinkPost_route_1 = __importDefault(require("./routes/blinkPost.route"));
const config_1 = __importDefault(require("./config"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Connect to MongoDB
mongoose_1.default.connect(config_1.default.mongoURI);
app.use('/creator', creator_route_1.default);
app.use('/blinks', blinkPost_route_1.default);
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(401).send('Unauthenticated!');
});
// Start the server
app.listen(8080, () => {
    console.log(`Server running on port 8080`);
});
