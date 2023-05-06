const jFile = require("jsonfile");
const path = require("path");
const axios = require("axios");

const filePath = path.join(__dirname, "../NewMovies.json");

const getMovies = () => {
  return axios.get("https://api.tvmaze.com/shows");
};

const getFileMovies = () => {
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

const addFileMovie = (movie) => {
  return new Promise((resolve, reject) => {
    jFile.writeFile(filePath, movie, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = { getMovies, getFileMovies, addFileMovie };
