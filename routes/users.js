const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const express = require("express");
const debug = require("debug")("r:router:users");
const userSchema = require("../schemas/user");
const apartmentSchema = require("../schemas/apartment");

const router = express.Router();
const User = mongoose.model("User", userSchema);

router.get("/", async (req, res) => {
  debug("GET /api/users");
  debug("Searching database...");
  const userlist = await User.find().sort({ username: 1 });
  res.send(userlist);
});

router.post("/", async (req, res) => {
  const schema = {
    username: Joi.string().required()
  };
  debug("POST /api/users");
  debug("Validating request...");
  const result = Joi.validate(req.body, schema, { stripUnknown: true });
  if (result.error) {
    debug("Error 400: " + result.error.details[0].message);
    res.status(400).send(result.error.details[0].message);
    return;
  }
  debug("Request validated");

  debug("Checking for duplicates...");
  const exists =
    (await User.find({ username: result.value.username })).length !== 0;
  if (exists) {
    debug(`Error: User with username ${result.value.username} already exists`);
    res
      .status(400)
      .send(`User with username ${result.value.username} already exists`);
    return;
  } else {
    debug(
      `Username is free. Creating user with username:${result.value.username}`
    );
    let user = new User({ username: result.value.username });
    debug(user);
    user = await user.save();
    res.send(user);
  }
});

router.put("/", async (req, res) => {
  const schema = {
    username: Joi.string().required(),
    id: Joi.string().required(),
    updateApartment: Joi.boolean(),
    apartmentId: Joi.string().when("updateApartment", {
      is: Joi.exists(),
      then: Joi.required()
    })
  };

  debug("Validating request...");
  const result = Joi.validate(req.body, schema, { stripUnknown: true });
  if (result.error) {
    debug("Error 400: " + result.error.details[0].message);
    res.status(400).send(result.error.details[0].message);
    return;
  }
  debug("Request validated");

  debug("Creating update package");
  let updatePackage = {};
  if (updateApartment) {
    updatePackage.apartment = body.result.apartmentId;
  }
  debug(`Update Package: ${updatePackage}`);
  debug("Searching database for user...");
  const user = await User.findByIdAndUpdate(result.value.id, updatePackage);

  if (!user) {
    debug(
      `No user found with the ID: ${result.value.id} and username: ${
        result.value.username
      }.`
    );
    res
      .status(404)
      .send(
        `No user found with the ID: ${result.value.id} and username: ${
          result.value.username
        }.`
      );
    return;
  }
  debug("User updated successfully");
  res.send(customer);
});

module.exports = router;
