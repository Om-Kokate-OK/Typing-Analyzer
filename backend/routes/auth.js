const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
const JWT_SECRET = "typing_secret";

// REGISTER
router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashed
  });

  res.json({ message: "User created" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.status(400).json({ error: "Wrong password" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.json({ token });
});

// ✅ GET LOGGED-IN USER PROFILE
router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

router.put("/preferences", authMiddleware, async (req, res) => {
  const { difficulty } = req.body;

  await User.findByIdAndUpdate(req.user.id, {
    "preferences.difficulty": difficulty
  });

  res.json({ message: "Preferences updated" });
});

module.exports = router;
