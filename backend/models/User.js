const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  preferences: {
    difficulty: { type: Number, default: 2 }
  }
});

module.exports = mongoose.model("User", UserSchema);
