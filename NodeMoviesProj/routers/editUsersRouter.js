const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jFile = require("jsonfile");
const path = require("path");
const {
  authenticateUser,
  getAllUsers,
  setUsers,
} = require("../models/usersBL");
const { authenticateAccessToken } = require("../middlewares/authentication");

router.get("/", authenticateAccessToken, async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(403).json({ error: err });
  }
});

router.post("/", authenticateAccessToken, async (req, res) => {
  console.log(req.user);
  try {
    await updateUser(req.user);
    res.status(200);
  } catch (err) {
    res.status(400);
  }
});

module.exports = router;
