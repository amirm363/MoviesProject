const { getUsers, setUsers } = require("../DALs/usersFileDAL");

const decreaseTransaction = async (req, res, next) => {
  const users = await getUsers();
  let filteredUser = users.filter(
    (user) => user.userName === req.headers.connecteduser
  );
  console.log(req.headers.connecteduser);
  console.log(filteredUser[0], filteredUser[0].numOfTransactions);
  filteredUser[0].numOfTransactions =
    Number(filteredUser[0].numOfTransactions) - 1;
  console.log(filteredUser[0], filteredUser[0].numOfTransactions);
  users.forEach((user) => {
    if (user.userName === req.headers.connecteduser) {
      user = filteredUser[0];
    }
  });
  next();
};

module.exports = { decreaseTransaction };
