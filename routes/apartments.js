const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const apartmentSchema = require("../schemas/apartment");

const Apartments = mongoose.model("Apartment", apartmentSchema);

router.get("/", async (req, res) => {
  const apartments = await Apartments.find().sort("name");
  res.send(apartments);
});

module.exports = router;
