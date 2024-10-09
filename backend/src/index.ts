import express, { Application, NextFunction, Request, Response, } from 'express';
import mongoose from 'mongoose';
import creatorRoutes from './routes/creator.route';
import blinkRoutes from './routes/blinkPost.route';
import config from './config';
import "dotenv/config";
import cors from 'cors'; 

const app: Application = express();

// Middleware
app.use(express.json());

app.use(cors());

// Connect to MongoDB
mongoose.connect(config.mongoURI);

app.use('/creator', creatorRoutes);
app.use('/blinks', blinkRoutes);


app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(401).send('Unauthenticated!');
});

// Start the server
app.listen(8080, () => {
  console.log(`Server running on port 8080`);
});