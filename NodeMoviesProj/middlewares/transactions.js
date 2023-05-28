const { getUsers, setUsers } = require("../DALs/usersFileDAL");
const { checkForCredits, checkDate } = require("../models/usersBL");

const decreaseTransaction = async (req, res, next) => {
  loggedUser = req.body.userName
    ? req.body.userName
    : req.headers.connecteduser;
  try {
    const users = await getUsers();
    let filteredUser = users.filter((user) => user.userName === loggedUser);
    if (!filteredUser.length) {
      return res.status(403).send("Wrong username or password");
    }
    if (checkDate(filteredUser[0])) {
      return next();
    }
    if (!checkForCredits(filteredUser[0]))
      return res
        .status(400)
        .send("Insufficient credits, please come back tomorrow 👋😊");
    let filteredUserIndex = users.findIndex(
      (user) => user.userName === loggedUser
    );
    filteredUser[0].numOfTransactions =
      Number(filteredUser[0]?.numOfTransactions) - 1;
    users[filteredUserIndex] = filteredUser[0];
    setUsers(users);
  } catch (err) {
    throw err;
  }
  next();
};

module.exports = { decreaseTransaction };
