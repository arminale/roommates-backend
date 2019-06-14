const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");
const debug = require("debug")("r:index.js");

const app = express();

mongoose
  .connect("mongodb://localhost/roommates", { useNewUrlParser: true })
  .then(() => debug("Connected to database"))
  .catch(err =>
    debug("Could not connect to database with error: " + err.message)
  );
app.use(helmet());
app.use(express.json());

const port = process.env.PORT | 3000;
app.listen(port, () => debug(`Listening on port ${port}`));
