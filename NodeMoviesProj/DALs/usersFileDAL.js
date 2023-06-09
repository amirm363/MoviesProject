const jFile = require("jsonfile");
const path = require("path");

const filePath = path.join(__dirname, "../Users.json");

const getUsers = () => {
  return new Promise((resolve, reject) => {
    jFile.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
const setUsers = (user) => {
  return new Promise((resolve, reject) => {
    jFile.writeFile(filePath, user, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = { getUsers, setUsers };
