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

const getMoviesSearchProps = async () => {
  const allMovies = await getFileMovies();
  const neededProperties = allMovies.map((movie) => {
    return {
      id: movie.id,
      name: movie.name,
      genres: [...movie.genres],
      language: movie.language,
      image: movie.image,
    };
  });
  return neededProperties;
};

module.exports = { addMoviesToJSONFile, getMoviesSearchProps };
