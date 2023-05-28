const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv");
const { getUsers, setUsers } = require("../DALs/usersFileDAL");
const { createUserWebToken } = require("./jwtBL");

const authenticateUser = async (user) => {
  const plainPass = user.password;
  const users = await getUsers();
  const filteredUser = users.filter((currentUser, index) => {
    if (currentUser.userName === user.userName) return currentUser;
  });

  if (!filteredUser.length) throw new Error("Wrong user name or password");

  const filtereUserIndex = users.findIndex(
    (user) => user.userName === filteredUser[0].userName
  );

  if (!checkDate(filteredUser[0])) {
    if (!checkForCredits(filteredUser[0])) {
      throw new Error("Insufficient credits, please come back tomorrow 👋😊");
    }
  }
  filteredUser[0].date = new Date();
  if (!checkIfAdmin(user, users)) {
    filteredUser[0].numOfTransactions = 10;
  }
  try {
    const result = await bcrypt.compare(plainPass, filteredUser[0].password);
    if (result) {
      const authorizedUser = createUserWebToken({
        userName: filteredUser[0].userName,
        createdDate: filteredUser[0].createdDate,
        numOfTransactions: filteredUser[0].numOfTransactions,
        date: filteredUser[0].date,
      });

      if (authorizedUser) {
        users[filtereUserIndex] = filteredUser[0];
        console.log(
          "🚀 ~ file: usersBL.js:39 ~ authenticateUser ~ users:",
          users
        );
        setUsers(users);
        return {
          accessToken: authorizedUser,
          userName: filteredUser[0].userName,
          numOfTransactions: filteredUser[0].numOfTransactions,
          createdDate: filteredUser[0].createdDate,
          isAdmin: checkIfAdmin(user, users),
          date: filteredUser[0].date,
        };
      }
    }
  } catch (e) {
    console.log(e);
    return { error: "An error occured while trying to login" };
  }
  // }
  return { error: "Wrong user name or password" };
};

const checkForCredits = (user) => {
  // console.log(user, user.numOfTransactions > 0);
  return user.numOfTransactions > 0;
};

const checkIfAdmin = (user, users) => {
  return users[0].userName === user.userName;
};

const checkDate = (user) => {
  const todayDate = new Date();
  if (user?.date) {
    if (new Date(user.date).getDate() < todayDate.getDate()) {
      return true;
    }
  }
  return false;
};

const getAllUsers = async () => {
  return await getUsers();
};

const updateUser = async (user) => {
  try {
    const users = await getAllUsers();
    users.forEach((filteredUser) => {
      if (filteredUser.userName === user.userName) {
        filteredUser = user;
      }
    });
    setUsers(users);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  authenticateUser,
  checkForCredits,
  checkIfAdmin,
  checkDate,
  getAllUsers,
  updateUser,
};
