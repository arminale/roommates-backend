const mongoose = require("mongoose");
const debug = require("debug")("r:controller:apartment");
const apartmentSchema = require("../schemas/apartment");

const Apartment = mongoose.model("Apartment", apartmentSchema);

async function createApartment(user, apartmentConfig) {
  debug(`Creating a new apartment for user: ${user.id}`);
  let apartment = new Apartment({
    name: apartmentConfig.name,
    members: [user.id],
    transactionBuckets: [],
    debts: []
  });
  debug(`Creating apartment: ${JSON.stringify(apartment)}`);
  apartmentDoc = await apartment.save();
  debug(`Apartment saved as ${JSON.stringify(apartmentDoc)}`);
  return apartmentDoc;
}

async function addUserToApartment(userId, apartmentId) {
  let apartment = await Apartment.findById(apartmentId);
  if (_.find(apartment.members)) {
    return apartment;
  } else {
    apartment.members.push(userId);
  }
  return await apartment.save();
}

module.exports = {
  createApartment: createApartment,
  addUserToApartment: addUserToApartment
};
