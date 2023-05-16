const express = require("express");
const router = express.Router();
const { authenticateAccessToken } = require("../middlewares/authentication");
const { decreaseTransaction } = require("../middlewares/transactions");
const { getMoviesSearchProps } = require("../models/moviesBL");

router.get("/", authenticateAccessToken, async (req, res) => {
  const moviesData = await getMoviesSearchProps();
  res.status(200).json(moviesData);
});

module.exports = router;
