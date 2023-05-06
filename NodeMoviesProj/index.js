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

app.use("/", loginRouter);
app.use("/CreateMovie", createNewMovieRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
