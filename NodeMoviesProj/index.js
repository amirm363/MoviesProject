const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./configs/database");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var loginRouter = require("./routers/loginRoute");

app.use("/", loginRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
