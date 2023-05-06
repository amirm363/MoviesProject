const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jFile = require("jsonfile");
const path = require("path");
const { authenticateUser } = require("../models/usersBL");

const filePath = path.join(__dirname, "../Users.json");

router.post("/", async (req, res) => {
  res.json(
    await authenticateUser({
      userName: req.body.userName,
      password: req.body.password,
    })
  );
});

module.exports = router;
