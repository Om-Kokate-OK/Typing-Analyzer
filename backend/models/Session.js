const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  wpm: Number,
  accuracy: Number,
  mistakeMap: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Session", SessionSchema);
