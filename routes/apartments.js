const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const express = require("express");
const debug = require("debug")("r:router:apartments");
const router = express.Router();
const apartmentSchema = require("../schemas/apartment");
const apartmentController = require("../controllers/apartmentController");
const Apartments = mongoose.model("Apartment", apartmentSchema);

router.get("/", async (req, res) => {
  const apartments = await Apartments.find().sort("name");
  res.send(apartments);
});

router.post("/", async (req, res) => {
  const schema = {
    userId: Joi.string().required(),
    apartmentName: Joi.string().required()
  };
  debug("POST /api/apartments");
  debug("Validating request...");
  const result = Joi.validate(req.body, schema, { stripUnknown: true });
  if (result.error) {
    debug("Error 400: " + result.error.details[0].message);
    res.status(400).send(result.error.details[0].message);
    return;
  } else {
    debug("Request validated");
    const user = { id: result.value.userId };
    const apartmentConfig = { name: result.value.apartmentName };
    debug(
      `Attempting to create apartment with user: ${JSON.stringify(
        user
      )} and apartmentConfig: ${JSON.stringify(apartmentConfig)}`
    );
    try {
      res.send(
        await apartmentController.createApartment(user, apartmentConfig)
      );
    } catch {
      res.status(409).send("Error creating apartment");
    }
    return;
  }
});
module.exports = router;
