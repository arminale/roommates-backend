const Joi = require("@hapi/joi");
const express = require("express");
const router = express.Router();
const apartmentController = require("../controllers/apartmentController");
const transactionController = require("../controllers/transactionController");

router.post("/", async (req, res) => {
  const schema = {
    userId: Joi.string().required(),
    apartmentId: Joi.string().required(),
    date: Joi.string()
      .isoDate()
      .required(),
    amount: Joi.number().required(),
    isDebtSettlement: Joi.boolean(),
    payeeId: Joi.string().when("isDebtSettlement", {
      is: Joi.truthy(),
      then: Joi.required()
    })
  };

  debug("POST /api/transactions");
  debug("Validating request...");
  const result = Joi.validate(req.body, schema, { stripUnknown: true });
  if (result.error) {
    debug("Error 400: " + result.error.details[0].message);
    res.status(400).send(result.error.details[0].message);
    return;
  }
  debug("Request validated");

  let apartment = await apartmentController.getApartment(
    result.value.apartmentId
  );

  transaction = transactionController.createTransaction(
    result.value,
    apartment
  );
});

module.exports = router;
