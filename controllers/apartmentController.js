const mongoose = require("mongoose");
const debug = require("debug")("r:controller:apartment");
const apartmentSchema = require("../schemas/apartment");

const Apartment = mongoose.model("Apartment", apartmentSchema);

function createApartment(user, apartmentConfig) {
  debug(`Creating a new apartment for user: ${user.idString}`);
  let apartment = new Apartment({
    name: apartmentConfig.name,
    members: [mongoose.Types.ObjectId(user.idString)],
    transactionBuckets: [],
    debts: []
  });
  debug(`Creating apartment: ${JSON.stringify(apartment)}`);
  return apartment;
}

async function getApartment(apartmentId) {
  return await Apartment.findById(apartmentId);
}

async function deleteApartment(apartmentIdString) {
  return await Apartment.findByIdAndDelete(
    mongoose.Types.ObjectId(apartmentIdString)
  );
}
module.exports = {
  createApartment: createApartment,
  getApartment: getApartment
};
