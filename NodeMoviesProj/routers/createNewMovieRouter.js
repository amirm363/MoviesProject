const express = require("express");
const router = express.Router();
const { addMoviesToJSONFile } = require("../models/moviesBL");
const { authenticateAccessToken } = require("../middlewares/authentication");
const { decreaseTransaction } = require("../middlewares/transactions");

router.post(
  "/",
  [authenticateAccessToken, decreaseTransaction],
  async (req, res) => {
    console.log(req.body);
    res.json(await addMoviesToJSONFile(req.body));
  }
);

module.exports = router;
