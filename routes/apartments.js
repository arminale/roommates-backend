const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const express = require("express");
const debug = require("debug")("r:router:apartments");
const router = express.Router();
const apartmentSchema = require("../schemas/apartment");

const Apartments = mongoose.model("Apartment", apartmentSchema);

router.get("/", async (req, res) => {
  const apartments = await Apartments.find().sort("name");
  res.send(apartments);
});

router.post("/", async (req, res) => {});
module.exports = router;
