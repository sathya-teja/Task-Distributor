// models/DistributedTask.js
import mongoose from 'mongoose';

const distributedTaskSchema = new mongoose.Schema({
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent', // assumes Agent model
    required: true,
  },
  FirstName: String,
  Phone: String,
  Notes: String,
});

const DistributedTask = mongoose.model('DistributedTask', distributedTaskSchema);
export default DistributedTask;
