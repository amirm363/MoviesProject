const mongoose = require("mongoose");

mongoose
  .connect(process.env.URI)
  .then((resp) => console.log("connection successful"))
  .catch((err) => console.log(err));
