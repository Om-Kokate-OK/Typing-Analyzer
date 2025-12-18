const jwt = require("jsonwebtoken");
const JWT_SECRET = "typing_secret";

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
};
