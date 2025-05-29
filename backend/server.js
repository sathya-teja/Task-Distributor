import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import agentRoutes from './routes/agentRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import ListItem from './models/ListItem.js'; // ✅ Import the ListItem model

const app = express(); // Create the express app

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/lists', uploadRoutes);

// ✅ Corrected endpoint to get distributed tasks with agent info
app.get('/api/lists/distributed-tasks', async (req, res) => {
  try {
    const distributedLists = await ListItem.find().populate('assignedTo', 'name email');
    res.json(distributedLists);
  } catch (error) {
    console.error('Error fetching distributed lists:', error);
    res.status(500).json({ message: 'Error fetching distributed lists' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

