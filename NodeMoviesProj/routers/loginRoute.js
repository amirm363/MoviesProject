const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jFile = require("jsonfile");
const path = require("path");

const filePath = path.join(__dirname, "../Users.json");

router.post("/", async (req, res, next) => {
  //   const users = await jFile.readFile(filePath, (err, data) => {
  //     if (err) {
  //       return err;
  //     } else {
  //       return data;
  //     }
  //   });

  const users = new Promise((resolve, reject) => {
    jFile.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  bcrypt.hash(req.body.password, 10, (err, data) => {
    console.log(data);
  });
  const user = await users.then((res) =>
    res.filter((user) => {
      if (user.userName === req.body.userName) return user;
    })
  );
  const plainPass = req.body.password;
  console.log(user);
  if (user.length > 0) {
    bcrypt.compare(plainPass, user[0].password, (err, result) => {
      console.log(user[0].password, result);
      res.send(result);
    });
  } else {
    res.send(false);
  }
});

module.exports = router;
