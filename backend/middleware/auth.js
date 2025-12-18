const jwt = require("jsonwebtoken");
const JWT_SECRET = "typing_secret";

module.exports = function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id: userId }
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};
