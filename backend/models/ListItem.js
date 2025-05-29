import mongoose from "mongoose";

const listItemSchema = new mongoose.Schema({
  firstName: String,
  phone: String, // ✅ Changed to String
  notes: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
});

const ListItem = mongoose.model("ListItem", listItemSchema);
export default ListItem;
