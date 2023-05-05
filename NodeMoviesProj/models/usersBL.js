const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv");
const { getUsers } = require("../DALs/usersFileDAL");
const { createUserWebToken } = require("./jwtBL");

const authenticateUser = async (user) => {
  const plainPass = user.password;
  const users = await getUsers();
  const filteredUser = users.filter((currentUser) => {
    if (currentUser.userName === user.userName) return currentUser;
  });

  if (filteredUser.length > 0) {
    if (!checkForCredits(filteredUser[0])) {
      return { error: "User is out of transaction credits" };
    }
    try {
      const result = await bcrypt.compare(plainPass, filteredUser[0].password);
      if (result) {
        const authorizedUser = createUserWebToken(filteredUser[0]);

        if (authorizedUser) {
          return {
            accessToken: authorizedUser,
            userName: filteredUser[0].userName,
            numOfTransactions: filteredUser[0].numOfTransactions,
            createdDate: filteredUser[0].createdDate,
            isAdmin: checkIfAdmin(user, users),
          };
        }
      }
    } catch (e) {
      console.log(e);
      return { error: "An error occured while trying to login" };
    }
  }
  return { error: "Wrong user name or password" };
};

const checkForCredits = (user) => {
  console.log(user, user.numOfTransactions > 0);
  return user.numOfTransactions > 0;
};

const checkIfAdmin = (user, users) => {
  return users[0].userName === user.userName;
};

module.exports = { authenticateUser, checkForCredits, checkIfAdmin };
