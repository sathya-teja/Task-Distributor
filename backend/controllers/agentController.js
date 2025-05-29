import bcrypt from 'bcryptjs';
import Agent from '../models/Agent.js';


// Add Agent to Database 
export const addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const agent = await Agent.create({ name, email, mobile, password: hashedPassword });
  res.status(201).json(agent);
};

// Fetch Agent Details
export const getAgents = async (req, res) => {
  const agents = await Agent.find();
  res.json(agents);
};


