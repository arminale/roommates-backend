const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const express = require("express");
const userSchema = require("../schemas/user");

const router = express.Router();
const User = mongoose.model("User", userSchema);

router.get("/", async (req, res) => {
  const user = User.find().sort("username");
  res.send(user);
});

module.exports = router;
