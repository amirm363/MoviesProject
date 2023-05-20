const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./configs/database");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const loginRouter = require("./routers/loginRouter");
const createNewMovieRouter = require("./routers/createNewMovieRouter");
const searchMoviesRouter = require("./routers/searchMoviesRouter");
const editUsersRouter = require("./routers/editUsersRouter");

app.use("/", loginRouter);
app.use("/CreateMovie", createNewMovieRouter);
app.use("/SearchMovies", searchMoviesRouter);
app.use("/EditUsers", editUsersRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
