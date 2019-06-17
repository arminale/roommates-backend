const mongoose = require("mongoose");
const debug = require("debug")("r:controller:apartment");
const _ = require("lodash");
const apartmentSchema = require("../schemas/apartment");
const userSchema = require("../schemas/user");
const transactionBucketSchema = require("../schemas/transactionBucket");

const Apartment = mongoose.model("Apartment", apartmentSchema);
const User = mongoose.model("User", userSchema);
const TransactionBucket = mongoose.model(
  "TransactionBucket",
  transactionBucketSchema
);

async function createApartment(user, apartmentConfig) {
  debug(`Creating a new apartment for user: ${user.id}`);
  const userDoc = await User.findOne({ _id: user.id });
  if (!userDoc) {
    debug(`No user found with id: ${user.id}`);
    throw new Error(`No user found with id: ${user.id}`);
  } else {
    if (userDoc.apartment) {
      debug(`User with id: ${user.id}  already has an apartment`);
      throw new Error(`User with id: ${user.id}  already has an apartment`);
    } else {
      debug(`User with id:${user.id} found and has no apartment`);
      const newBucket = await createTransactionBucket();
      debug(`Created transaction bucket: ${JSON.stringify(newBucket)}`);
      let apartment = new Apartment({
        name: apartmentConfig.name,
        members: [userDoc._id],
        transactionBuckets: [newBucket._id],
        debts: []
      });
      debug(`Creating apartment: ${JSON.stringify(apartment)}`);
      apartmentDoc = await apartment.save();
      debug(`Apartment saved as ${JSON.stringify(apartmentDoc)}`);
      userDoc.apartment = apartmentDoc._id;
      await userDoc.save();
      return apartmentDoc;
    }
  }
}

async function createTransactionBucket() {
  let beginBucketDate = new Date();
  beginBucketDate.setUTCDate(1);
  beginBucketDate.setHours(0, 0, 0, 0);
  let transactionBucket = new TransactionBucket({
    date: beginBucketDate,
    transactions: []
  });
  transactionBucketDoc = await transactionBucket.save();
  return transactionBucketDoc;
}

async function addUserToApartment(userId, apartmentIdString) {
  let apartment = await Apartment.findById(
    mongoose.Types.ObjectId(apartmentIdString)
  );
  if (_.find(apartment.members)) {
    return apartment;
  } else {
    apartment.members.push(mongoose.Types.ObjectId(userId));
  }
  return await apartment.save();
}

module.exports = {
  createApartment: createApartment,
  addUserToApartment: addUserToApartment
};
