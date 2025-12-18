const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const sessionRoutes = require("./routes/sessions");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/typing-analyzer");

app.use("/auth", authRoutes);
app.use("/sessions", sessionRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
