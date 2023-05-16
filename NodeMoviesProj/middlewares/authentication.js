const jwt = require("jsonwebtoken");
require("dotenv");

const authenticateAccessToken = (req, res, next) => {
  try {
    console.log("req.headers.authorization", req.headers.authorization);
    const verified = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.ACCESS_TOKEN_SECRET
    );
    next();
  } catch (err) {
    res.status(403).json({ error: "You are unauthorized" });
  }
};

module.exports = { authenticateAccessToken };
