const mongoose = require("mongoose");
const debug = require("debug")("r:controller:apartment");
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
  debug(`Creating a new apartment for user: ${user}`);
  const user = await User.find({ _id: user.id, username: user.username });
  if (!user) {
    throw new Error(
      ` No user found with id: ${user.id} and username: ${user.username}`
    );
  } else {
    if (user.apartment) {
      throw new Error(
        `User with id: ${user.id} and username: ${
          user.username
        } already has an apartment`
      );
    } else {
      const newBucket = await createTransactionBucket();
      let apartment = new Apartment({
        name: apartmentConfig.name,
        members: [user._id],
        transactionBucket: newBucket._id,
        debts: []
      });
      apartment = await apartment.save();
      user.apartment = apartment._id;
      return apartment;
    }
  }
}

async function createTransactionBucket() {
  let transactionBucket = new TransactionBucket({
    date: new Date(Date.now.getUTCYFullYear(), Date.now.getUTCYMonth()),
    transactions: []
  });
  transactionBucket = transactionBucket.save();
  return transactionBucket;
}
