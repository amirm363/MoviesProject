const jwt = require("jsonwebtoken");
require("dotenv");

const createUserWebToken = (user) => {
  console.log(user);
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verift(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = { createUserWebToken, authenticateToken };
