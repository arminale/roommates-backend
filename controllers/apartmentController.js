const mongoose = require("mongoose");
const debug = require("debug")("r:controller:apartment");
const apartmentSchema = require("../schemas/apartment");
const userSchema = require("../schemas/user");

const Apartment = mongoose.model("Apartment", apartmentSchema);
const User = mongoose.model("User", userSchema);

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
      // TODO: add transactionBucket creation
      // TODO: add debt array creation
      const apartment = new Apartment({
        name: apartmentConfig.name,
        members: [user._id]
      });
    }
  }
}
