const Joi = require("@hapi/joi");
const express = require("express");
const debug = require("debug")("r:router:apartments");
const router = express.Router();

const apartmentController = require("../controllers/apartmentController");
const userController = require("../controllers/userController");

router.get("/", async (req, res) => {
  res.send("List of apartments");
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
    const userInfo = { idString: result.value.userId };
    const apartmentConfig = { name: result.value.apartmentName };
    debug(
      `Attempting to create apartment with user: ${JSON.stringify(
        userInfo
      )} and apartmentConfig: ${JSON.stringify(apartmentConfig)}`
    );

    let apartment = apartmentController.createApartment(
      userInfo,
      apartmentConfig
    );
    apartment = await apartment.save();
    const { user, error } = await userController.addApartment(
      userInfo.idString,
      apartment._id
    );
    if (error) {
      apartmentController.deleteApartment(apartment._id);
      res.status(405).send(error.message);
      return;
    } else {
      user.save();
      res.send({ apartment: apartment, user: user });
      return;
    }
  }
});
module.exports = router;
