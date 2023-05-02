const bcrypt = require("bcrypt");
const { getUsers } = require("../DALs/usersFileDAL");

const authenticateUser = async (user) => {
  const plainPass = user.password;
  const users = await getUsers();
  const filteredUser = users.filter((currentUser) => {
    if (currentUser.userName === user.userName) return currentUser;
  });

  if (filteredUser.length > 0) {
    try {
      const result = await bcrypt.compare(plainPass, filteredUser[0].password);
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  return false;
};

const checkIfAdmin = (user, users) => {
  return users[0].userName === user.userName;
};

const checkForCredits = (user, users) => {
  const filteredUser = users.filter((currentUser) => {
    if (currentUser.userName === user.userName) return currentUser;
  });
};

module.exports = { authenticateUser, checkIfAdmin, checkForCredits };
