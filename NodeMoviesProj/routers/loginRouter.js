const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jFile = require("jsonfile");
const path = require("path");
const { authenticateUser } = require("../models/usersBL");
const { decreaseTransaction } = require("../middlewares/transactions");
const filePath = path.join(__dirname, "../Users.json");

router.post("/", decreaseTransaction, async (req, res) => {
  try {
    res.json(
      await authenticateUser({
        userName: req.body.userName,
        password: req.body.password,
        date: req.body.date,
      })
    );
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
});

module.exports = router;
