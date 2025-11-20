import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import linksRouter from './src/routes/links.js';
import { errorHandler } from './src/utils/errorHandler.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// healthcheck
app.get('/healthz', (req, res) => {
  res.status(200).json({ ok: true, version: "1.0" });
});

// API routes (must match spec)
app.use('/api/links', linksRouter);

// redirect (/:code) must be last route
import { redirectHandler } from './src/controllers/linksController.js';
app.get('/:code', redirectHandler);

app.use(errorHandler);

// connect DB and start
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('DB connection error', err);
    process.exit(1);
  }
};
start();
