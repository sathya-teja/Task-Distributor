import csv from "csv-parser";
import fs from "fs";
import ListItem from "../models/ListItem.js";
import Agent from "../models/Agent.js";

// CSV or XLSX Data Upload and Distribution Controller
export const uploadCSV = async (req, res) => {
  const agents = await Agent.find();
  if (agents.length < 5)
    return res.status(400).json({ message: "Minimum 5 agents required" });

  let items = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => {
      items.push(data);
    })
    .on("end", async () => {
      let distributed = [];
      for (let i = 0; i < items.length; i++) {
        const agent = agents[i % 5];
        const newItem = await ListItem.create({
          firstName: items[i].FirstName,
          phone: items[i].Phone,
          notes: items[i].Notes,
          assignedTo: agent._id,
        });
        distributed.push(newItem);
      }

      res.json({ message: "List distributed successfully", distributed });
    });
};

export const getDistributedList = async (req, res) => {
  const lists = await ListItem.find().populate("assignedTo");
  res.json(lists);
};
