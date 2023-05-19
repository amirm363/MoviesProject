const { getUsers, setUsers } = require("../DALs/usersFileDAL");

const decreaseTransaction = async (req, res, next) => {
  try {
    console.log(req.headers);
    const users = await getUsers();
    console.log(
      "🚀 ~ file: transactions.js:6 ~ decreaseTransaction ~ users:",
      users
    );
    let filteredUser = users.filter(
      (user) => user.userName === req.headers.connecteduser
    );
    console.log(
      "🚀 ~ file: transactions.js:8 ~ decreaseTransaction ~ filteredUser:",
      filteredUser
    );
    console.log(filteredUser[0], filteredUser[0]?.numOfTransactions);
    filteredUser[0].numOfTransactions =
      Number(filteredUser[0]?.numOfTransactions) - 1;
    console.log(filteredUser[0], filteredUser[0]?.numOfTransactions);
    users.forEach((user) => {
      if (user.userName === req.headers.connecteduser) {
        user = filteredUser[0];
      }
    });
  } catch (err) {
    throw err;
  }
  next();
};

module.exports = { decreaseTransaction };
