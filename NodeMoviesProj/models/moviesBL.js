const { getFileMovies, addFileMovie } = require("../DALs/moviesWsDAL");

const addMoviesToJSONFile = async (movie) => {
  try {
    console.log(movie);
    const fileMovies = await getFileMovies();
    const newMovieId = fileMovies.at(-1).id + 1;
    const newMovie = { ...movie, id: newMovieId };
    await addFileMovie([...fileMovies, { ...newMovie }]);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = { addMoviesToJSONFile };
