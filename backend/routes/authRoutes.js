import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; // ensure this file uses ES module exports
import { login } from "../controllers/authController.js";

const router = express.Router();

// Route for POST /api/auth/login
router.post("/login", login);

// Route for POST /api/auth/register-admin
router.post("/register-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const admin = new User({ name, email, password: hashed, role: "admin" });
    await admin.save();

    res.json({ msg: "Admin registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error registering admin" });
  }
});

export default router;
