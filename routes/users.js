const Joi = require("@hapi/joi");
const express = require("express");
const debug = require("debug")("r:router:users");
const userController = require("../controllers/userController");
const apartmentController = require("../controllers/apartmentController");

const router = express.Router();

router.get("/", async (req, res) => {
  debug("GET /api/users");
  debug("Searching database...");
  res.send("List all users");
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
  if (await userController.isUserUnique(result.value)) {
    debug(`Error: User already exists`);
    res.status(400).send(`User already exists`);
    return;
  } else {
    debug(
      `Username is free. Creating user with username:${result.value.username}`
    );
    res.send(await userController.createUser(result.value).save());
  }
});

router.put("/", async (req, res) => {
  const schema = {
    username: Joi.string().required(),
    id: Joi.string().required(),
    updateApartment: Joi.boolean(),
    apartmentId: Joi.string().when("updateApartment", {
      is: Joi.exist(),
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
  let externalUpdatedDoc;
  if (result.value.updateApartment) {
    updatePackage.apartment = result.value.apartmentId;
    externalUpdatedDoc = await apartmentController.getApartment(
      result.value.apartmentId
    );
    externalUpdatedDoc.addMember(result.value.id);
  }
  debug(`Update Package: ${updatePackage}`);
  debug("Searching database for user...");
  const user = await userController.updateUser(result.value.id, updatePackage);
  debug(user);
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
  if (externalUpdatedDoc) {
    externalUpdatedDoc.save();
  }
  debug("User updated successfully");
  res.send(user);
});

module.exports = router;
