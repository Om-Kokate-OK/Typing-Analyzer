const express = require("express");
const Session = require("../models/Session");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const session = await Session.create({
    userId: req.user.id,
    ...req.body
  });
  res.json(session);
});

router.get("/last", auth, async (req, res) => {
  const sessions = await Session.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .limit(2);
  res.json(sessions);
});

module.exports = router;
